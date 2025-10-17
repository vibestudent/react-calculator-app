<div align="center">
  
# React Calculator

### A Modern Calculator with Operation Precedence and Full Keyboard Support

**A production-ready calculator built with Next.js 15, TypeScript, and Tailwind CSS 4, featuring proper mathematical operation precedence, keyboard navigation, and comprehensive testing.**

<img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
<img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
<img src="https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwind-css" alt="Tailwind" />
<img src="https://img.shields.io/badge/Built_with-v0-000000?style=for-the-badge&logo=vercel" alt="Built with v0" />
<img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />

[Live Demo](#) • [Report Bug](https://github.com/florian-ariasu/react-calculator-app/issues) • [Request Feature](https://github.com/florian-ariasu/react-calculator-app/issues)

</div>

---

## GenAI Prototype Warning

> [!CAUTION]
> **AI-Generated Code Notice:**
- This project was generated using v0 by Vercel as an experimental prototype.
- While functional, the code may contain unexpected bugs or edge cases typical of AI-generated code.
- This is for educational purposes only and not intended for production-critical applications.
- **Use with caution !**

---

## About The Project

**React Calculator** is a modern, fully-featured calculator built with [v0 by Vercel](https://v0.dev) to demonstrate proper mathematical operation precedence and advanced user interactions. The project highlights AI-assisted coding to produce a sophisticated calculator with keyboard support and comprehensive testing.

### Key Features

- Proper operation precedence: multiplication and division are evaluated before addition and subtraction.
- Full keyboard support: type numbers, operators, and use shortcuts (Backspace for DEL, Escape for Clear).
- Arrow key navigation for button selection.
- Thousands separator formatting for large numbers (e.g., 1,234,567).
- Basic operations: addition, subtraction, multiplication, division.
- Advanced functions: Clear (C), Delete (DEL), Toggle Sign (±), Percent (%).
- Error handling: division by zero detection.
- Modern user interface with gradient buttons and focus indicators.
- Accessibility support with keyboard navigation and focus rings.
- Fully tested with a suite of 10 test cases (easy, medium, hard).
- Built with TypeScript for type safety and IntelliSense support.

---

## Getting Started

Follow these steps to run the calculator locally.

### Prerequisites

- **Node.js** v18 or higher - [Download Node.js](https://nodejs.org/)
- **npm**, **yarn**, or **pnpm**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/florian-ariasu/react-calculator-app.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd react-calculator-app
   ```

3. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000) to view the calculator.

### Building for Production

```bash
# Create an optimized production build
npm run build

# Start the production server
npm start
```

---

## Usage

### Basic Operations

- Addition: `7 + 3 = 10`
- Subtraction: `10 - 4 = 6`
- Multiplication: `6 * 7 = 42`
- Division: `20 / 4 = 5`

### Operation Precedence

- Multiplication and division are evaluated first.
- Example: `7 + 6 * 2 = 19`
- Complex expressions: `10 + 20 * 3 - 5 / 5 = 69`

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `0-9` | Enter digits |
| `+` `-` `*` `/` | Operators |
| `=` or `Enter` | Calculate result |
| `.` | Decimal point |
| `%` | Percent |
| `Backspace` | Delete last digit (DEL) |
| `Escape` or `C` | Clear all (C) |
| `Arrow Keys` | Navigate buttons |
| `Enter` (with arrow selection) | Activate selected button |

### Special Features

- **Starting with Negative Numbers**: Press `-` first, then digits (e.g., `-999`).
- **Toggle Sign**: Enter a number, press `±` to change its sign.
- **Delete Function**: Press `DEL` or `Backspace` to remove the last digit.

---

## Testing

The project contains a comprehensive test suite with 10 test cases covering easy, medium, and hard scenarios.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Cases

**Easy Tests**
1. Simple addition: `5 + 3 = 8`
2. Simple subtraction: `10 - 4 = 6`
3. Simple multiplication: `6 * 7 = 42`

**Medium Tests**
4. Order of operations: `7 + 6 * 2 = 19`
5. Multiple operations: `10 + 5 - 3 = 12`
6. Negative number start: `-5 * 3 = -15`
7. Toggle sign then multiply: `56 ± 987 = -55,272`

**Hard Tests**
8. Complex precedence: `10 + 20 * 3 - 5 / 5 = 69`
9. Division by zero: `5 / 0 = Error`
10. Decimal and precedence: `2.5 + 3 * 4 = 14.5`

### Adding Your Own Tests

1. Open the file `__tests__/calculator.test.tsx`.
2. Copy an existing test block and modify it with your new sequence of button presses.
3. Use the `clickButtons` helper function to simulate button clicks.
4. Update the `expect(getDisplay()).toBe("EXPECTED_RESULT")` line with the expected outcome.
5. Save the file and run tests using `npm test` to verify correctness.
6. Commit your changes and open a pull request if contributing.

---

## Project Structure

```text
calculator/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── favicon.ico
├── components/
│   ├── calculator.tsx
│   └── ui/
├── __tests__/
│   └── calculator.test.tsx
├── .github/
│   └── workflows/
│       └── test.yml
├── lib/
│   └── utils.ts
├── jest.config.js
├── jest.setup.js
├── LICENSE
├── README.md
├── package.json
├── tsconfig.json
└── next.config.mjs
```

---

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- Jest
- React Testing Library
- GitHub Actions

---

## Deployment

### Deploy to Vercel

1. Push code to GitHub.
2. Import repository on [Vercel](https://vercel.com/new).
3. Click "Deploy".

### Deploy to Other Platforms

- Netlify, Railway, AWS Amplify, DigitalOcean (standard Next.js deployment guides).

---

## How It Works

### Operation Precedence

1. First, evaluate all multiplication (`*`) and division (`/`) from left to right.
2. Then, evaluate addition (`+`) and subtraction (`-`) from left to right.

Example: `7 + 6 * 2` → First `6 * 2 = 12`, then `7 + 12 = 19`.

### Expression Building

- Operands and operators stored in an array.
- Sub-display shows the current expression.
- Evaluated only on pressing `=`.

---

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/YourFeature`.
3. Commit your changes: `git commit -m "Add feature description"`.
4. Push the branch: `git push origin feature/YourFeature`.
5. Open a pull request.

---

## License

This project is licensed under **MIT License**. See [LICENSE](LICENSE) for details.

---

<div align="center">

### Star this repository if you find it useful.

**Built using v0 by Vercel for educational purposes only.**

[⬆ Back to Top](#react-calculator)

</div>

> [!IMPORTANT]
> Make sure to read [GenAI Prototype Warning](#genai-prototype-warning) carefully before proceeding with any of this code !

