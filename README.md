# Simple Calculator

A clean, responsive calculator web application with dark/light mode toggle built with vanilla JavaScript.

## Features

- Basic arithmetic operations (addition, subtraction, multiplication, division)
- Dark mode as default with light mode toggle
- Responsive design for desktop and mobile devices
- Percentage and sign toggle functions
- Error handling for invalid operations (e.g., division by zero)
- Keyboard support (planned)

## Technologies

- HTML5
- CSS3 (with CSS Custom Properties for theming)
- Vanilla JavaScript (ES6+)

## File Structure

```
simple-calculator/
├── index.html              # Main HTML file
├── styles/
│   ├── main.css           # Main stylesheet
│   └── themes.css         # Theme definitions
├── scripts/
│   ├── calculator.js      # Main calculator logic
│   ├── theme-manager.js   # Theme switching
│   └── input-validator.js # Input validation
└── README.md              # Project documentation
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/KhoaPham-dev/simple-calculator.git
   ```

2. Open `index.html` in your browser

3. Start calculating!

## Usage

- Click the number buttons to enter values
- Use operation buttons (+, -, ×, ÷) to perform calculations
- Press "=" to see the result
- Press "C" to clear the current calculation
- Toggle between dark and light mode using the theme button in the header

## Development

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)

### Running Locally

Simply open `index.html` in your browser. No build process required.

## Testing

### Unit Tests

Run the unit tests to verify arithmetic functions:

```bash
node tests/calculator.test.js
```

### Integration Tests

Run the integration tests to verify UI-logic interaction:

```bash
node tests/integration.test.js
```

### Test Coverage

The tests cover:
- All arithmetic operations (add, subtract, multiply, divide)
- Edge cases (negative numbers, zero, large numbers)
- Error handling (division by zero)
- UI interactions (button clicks, display updates)
- Special functions (percentage, sign toggle, clear)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by native calculator applications
- Built as part of the AS-534 task for the Calculator App project