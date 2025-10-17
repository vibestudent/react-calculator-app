import { render, screen, fireEvent } from "@testing-library/react"
import Calculator from "@/components/calculator"

describe("Calculator Tests", () => {
  // Helper function to click buttons in sequence
  const clickButtons = (buttons: string[]) => {
    buttons.forEach((button) => {
      const btn = screen.getByRole("button", { name: button })
      fireEvent.click(btn)
    })
  }

  // Helper to get display value using data-testid
  const getDisplay = () => {
    const display = screen.getByTestId("calculator-display")
    return display.textContent || ""
  }

  beforeEach(() => {
    render(<Calculator />)
  })

  // EASY TESTS
  test("Easy 1: Simple addition - 5 + 3 = 8", () => {
    clickButtons(["5", "+", "3", "="])
    expect(getDisplay()).toBe("8")
  })

  test("Easy 2: Simple subtraction - 10 - 4 = 6", () => {
    clickButtons(["1", "0", "-", "4", "="])
    expect(getDisplay()).toBe("6")
  })

  test("Easy 3: Simple multiplication - 6 * 7 = 42", () => {
    clickButtons(["6", "*", "7", "="])
    expect(getDisplay()).toBe("42")
  })

  // MEDIUM TESTS
  test("Medium 1: Order of operations - 7 + 6 * 2 = 19", () => {
    clickButtons(["7", "+", "6", "*", "2", "="])
    expect(getDisplay()).toBe("19")
  })

  test("Medium 2: Multiple operations - 10 + 5 - 3 = 12", () => {
    clickButtons(["1", "0", "+", "5", "-", "3", "="])
    expect(getDisplay()).toBe("12")
  })

  test("Medium 3: Negative number start - -5 * 3 = -15", () => {
    clickButtons(["-", "5", "*", "3", "="])
    expect(getDisplay()).toBe("-15")
  })

  test("Medium 4: Toggle sign then multiply - 56 ± 987 = -56 * 987 = -55,272", () => {
    clickButtons(["5", "6", "±", "9", "8", "7", "="])
    expect(getDisplay()).toBe("-55,272")
  })

  // HARD TESTS
  test("Hard 1: Complex precedence - 10 + 20 * 3 - 5 / 5 = 69", () => {
    clickButtons(["1", "0", "+", "2", "0", "*", "3", "-", "5", "/", "5", "="])
    expect(getDisplay()).toBe("69")
  })

  test("Hard 2: Division by zero - 5 / 0 = Error", () => {
    clickButtons(["5", "/", "0", "="])
    expect(getDisplay()).toBe("Error")
  })

  test("Hard 3: Decimal and precedence - 2.5 + 3 * 4 = 14.5", () => {
    clickButtons(["2", ".", "5", "+", "3", "*", "4", "="])
    expect(getDisplay()).toBe("14.5")
  })
})
