"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Operator = "+" | "-" | "*" | "/" | null

interface ExpressionPart {
  value: string
  operator: Operator
}

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [expression, setExpression] = useState<ExpressionPart[]>([])
  const [currentOperator, setCurrentOperator] = useState<Operator>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [justToggledSign, setJustToggledSign] = useState(false)

  const buttons = [
    ["C", "DEL", "±", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "%", "="],
  ]

  const formatNumber = (num: string): string => {
    if (num === "Error") return num
    const parts = num.split(".")
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return parts.join(".")
  }

  const evaluateExpression = useCallback((expr: ExpressionPart[], finalValue: string): string => {
    if (expr.length === 0) return finalValue
    const fullExpr: (string | Operator)[] = []
    for (const part of expr) {
      fullExpr.push(part.value)
      if (part.operator) fullExpr.push(part.operator)
    }
    fullExpr.push(finalValue)

    try {
      let i = 1
      while (i < fullExpr.length) {
        const op = fullExpr[i]
        if (op === "*" || op === "/") {
          const left = Number.parseFloat((fullExpr[i - 1] as string).replace(/,/g, ""))
          const right = Number.parseFloat((fullExpr[i + 1] as string).replace(/,/g, ""))
          if (isNaN(left) || isNaN(right)) return "Error"
          let result: number
          if (op === "*") result = left * right
          else {
            if (right === 0) return "Error"
            result = left / right
          }
          fullExpr.splice(i - 1, 3, result.toString())
        } else i += 2
      }

      i = 1
      while (i < fullExpr.length) {
        const op = fullExpr[i]
        if (op === "+" || op === "-") {
          const left = Number.parseFloat((fullExpr[i - 1] as string).replace(/,/g, ""))
          const right = Number.parseFloat((fullExpr[i + 1] as string).replace(/,/g, ""))
          if (isNaN(left) || isNaN(right)) return "Error"
          const result = op === "+" ? left + right : left - right
          fullExpr.splice(i - 1, 3, result.toString())
        } else i += 2
      }

      return fullExpr[0] as string
    } catch {
      return "Error"
    }
  }, [])

  const getSubDisplay = useCallback((): string => {
    if (expression.length === 0 && !currentOperator) return ""
    let result = ""
    for (const part of expression) {
      result += formatNumber(part.value)
      if (part.operator) result += ` ${part.operator} `
    }
    if (currentOperator) result += formatNumber(display) + ` ${currentOperator} `
    return result
  }, [expression, currentOperator, display])

  const handleButtonClick = useCallback(
    (value: string) => {
      if (display === "Error" && value !== "C") return

      if (/^[0-9]$/.test(value)) {
        if (justToggledSign) {
          setExpression([...expression, { value: display, operator: "*" }])
          setCurrentOperator(null)
          setDisplay(value)
          setWaitingForOperand(false)
          setJustToggledSign(false)
          return
        }
        if (waitingForOperand) setDisplay(value), setWaitingForOperand(false)
        else setDisplay(display === "0" ? value : display + value)
        return
      }

      if (value === ".") {
        setJustToggledSign(false)
        if (waitingForOperand) setDisplay("0."), setWaitingForOperand(false)
        else if (!display.includes(".")) setDisplay(display + ".")
        return
      }

      if (value === "C") {
        setDisplay("0")
        setExpression([])
        setCurrentOperator(null)
        setWaitingForOperand(false)
        setJustToggledSign(false)
        return
      }

      if (value === "DEL") {
        setJustToggledSign(false)
        const unformatted = display.replace(/,/g, "")
        const newDisplay = unformatted.slice(0, -1)
        setDisplay(newDisplay === "" || newDisplay === "-" ? "0" : newDisplay)
        if (waitingForOperand && (newDisplay === "" || newDisplay === "-")) setWaitingForOperand(false)
        return
      }

      if (value === "±") {
        if (display === "0") return
        setDisplay(display.startsWith("-") ? display.slice(1) : "-" + display)
        setJustToggledSign(true)
        return
      }

      if (value === "%") {
        const num = Number.parseFloat(display.replace(/,/g, ""))
        setDisplay((num / 100).toString())
        setJustToggledSign(false)
        return
      }

      if (["+", "-", "*", "/"].includes(value)) {
        setJustToggledSign(false)
        if (value === "-" && display === "0" && expression.length === 0 && !currentOperator) {
          setDisplay("-")
          return
        }
        if (!waitingForOperand) {
          if (currentOperator) setExpression([...expression, { value: display, operator: currentOperator }])
          else {
            setExpression([...expression, { value: display, operator: value as Operator }])
            setCurrentOperator(null)
            setWaitingForOperand(true)
            return
          }
        }
        setCurrentOperator(value as Operator)
        setWaitingForOperand(true)
        return
      }

      if (value === "=") {
        setJustToggledSign(false)
        if (expression.length > 0 || currentOperator) {
          const result = evaluateExpression(
            currentOperator ? [...expression, { value: display, operator: currentOperator }] : expression,
            waitingForOperand ? display : display,
          )
          setDisplay(result)
          setExpression([])
          setCurrentOperator(null)
          setWaitingForOperand(true)
        }
        return
      }
    },
    [display, expression, currentOperator, waitingForOperand, justToggledSign, evaluateExpression],
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[0-9+\-*/.=%]$/.test(e.key) || e.key === "Enter" || e.key === "Escape" || e.key === "Backspace") {
        e.preventDefault()
      }
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault()
        const totalButtons = buttons.flat().length
        const cols = 4
        if (selectedIndex === null) return setSelectedIndex(0)
        let newIndex = selectedIndex
        const row = Math.floor(selectedIndex / cols)
        const col = selectedIndex % cols
        switch (e.key) {
          case "ArrowUp": if (row > 0) newIndex = selectedIndex - cols; break
          case "ArrowDown": if (row < buttons.length - 1) newIndex = selectedIndex + cols; break
          case "ArrowLeft": if (col > 0) newIndex = selectedIndex - 1; break
          case "ArrowRight": if (col < cols - 1) newIndex = selectedIndex + 1; break
        }
        if (newIndex >= 0 && newIndex < totalButtons) setSelectedIndex(newIndex)
        return
      }
      if (e.key === "Enter" && selectedIndex !== null) {
        const buttonValue = buttons.flat()[selectedIndex]
        handleButtonClick(buttonValue)
        return
      }
      if (/^[0-9]$/.test(e.key)) handleButtonClick(e.key)
      else if (e.key === ".") handleButtonClick(".")
      else if (["+", "-", "*", "/"].includes(e.key)) handleButtonClick(e.key)
      else if (e.key === "=" || (e.key === "Enter" && selectedIndex === null)) handleButtonClick("=")
      else if (e.key === "c" || e.key === "C" || e.key === "Escape") handleButtonClick("C")
      else if (e.key === "Backspace") handleButtonClick("DEL")
      else if (e.key === "%") handleButtonClick("%")
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex, buttons, handleButtonClick])

  const getButtonStyle = (value: string) => {
    const isOperator = ["+", "-", "*", "/"].includes(value)
    const isEquals = value === "="
    const isActive = currentOperator === value && waitingForOperand
    if (isEquals) return "bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold"
    if (isOperator) return cn("bg-gradient-to-br from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold", isActive && "ring-2 ring-cyan-300 ring-offset-2 ring-offset-slate-800")
    if (["C", "DEL", "±", "%"].includes(value)) return "bg-slate-700 hover:bg-slate-600 text-slate-100"
    return "bg-slate-800 hover:bg-slate-700 text-white"
  }

  return (
    <div className="w-full max-w-sm bg-slate-900 rounded-2xl shadow-2xl p-6 border border-slate-700">
      {/* Display */}
      <div className="mb-6 bg-slate-950 rounded-xl p-6 border border-slate-800">
        {getSubDisplay() && <div className="text-right text-sm text-slate-400 mb-2 font-mono">{getSubDisplay()}</div>}
        {/* Main display */}
        <div
          className="text-right text-4xl font-bold text-white font-mono break-all"
          data-testid="calculator-display"
        >
          {formatNumber(display)}
        </div>
      </div>

      {/* Button grid */}
      <div className="grid grid-cols-4 gap-3">
        {buttons.flat().map((value, index) => {
          const isSelected = selectedIndex === index
          const isZero = value === "0"

          return (
            <Button
              key={`${value}-${index}`}
              onClick={() => handleButtonClick(value)}
              className={cn(
                "h-16 text-xl font-medium transition-all",
                getButtonStyle(value),
                isSelected && "ring-4 ring-yellow-400 ring-offset-2 ring-offset-slate-900 scale-105",
                isZero && "col-span-2",
              )}
            >
              {value}
            </Button>
          )
        })}
      </div>

      <div className="mt-4 text-center text-xs text-slate-500">Use keyboard or arrow keys + Enter</div>
    </div>
  )
}
