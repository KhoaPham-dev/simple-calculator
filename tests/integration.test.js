/**
 * Integration tests for Calculator App UI-Logic Interaction
 */

// Mock DOM elements for testing
const mockDisplay = {
  textContent: '0'
};

// Mock button elements
const mockButtons = {
  '1': { dataset: { number: '1' }, addEventListener: function(event, handler) {} },
  '2': { dataset: { number: '2' }, addEventListener: function(event, handler) {} },
  '3': { dataset: { number: '3' }, addEventListener: function(event, handler) {} },
  '4': { dataset: { number: '4' }, addEventListener: function(event, handler) {} },
  '5': { dataset: { number: '5' }, addEventListener: function(event, handler) {} },
  '6': { dataset: { number: '6' }, addEventListener: function(event, handler) {} },
  '7': { dataset: { number: '7' }, addEventListener: function(event, handler) {} },
  '8': { dataset: { number: '8' }, addEventListener: function(event, handler) {} },
  '9': { dataset: { number: '9' }, addEventListener: function(event, handler) {} },
  '0': { dataset: { number: '0' }, addEventListener: function(event, handler) {} },
  '.': { dataset: { number: '.' }, addEventListener: function(event, handler) {} },
  'add': { dataset: { action: 'add' }, addEventListener: function(event, handler) {} },
  'subtract': { dataset: { action: 'subtract' }, addEventListener: function(event, handler) {} },
  'multiply': { dataset: { action: 'multiply' }, addEventListener: function(event, handler) {} },
  'divide': { dataset: { action: 'divide' }, addEventListener: function(event, handler) {} },
  'equals': { dataset: { action: 'equals' }, addEventListener: function(event, handler) {} },
  'clear': { dataset: { action: 'clear' }, addEventListener: function(event, handler) {} },
  'sign': { dataset: { action: 'sign' }, addEventListener: function(event, handler) {} },
  'percent': { dataset: { action: 'percent' }, addEventListener: function(event, handler) {} }
};

// Calculator class (simplified for testing)
class Calculator {
  constructor() {
    this.display = mockDisplay;
    this.currentInput = '0';
    this.previousInput = null;
    this.operation = null;
    this.shouldResetDisplay = false;
    this.isErrorState = false;
  }

  handleNumberInput(number) {
    // Reset error state when user starts entering new input
    if (this.isErrorState) {
      this.isErrorState = false;
      this.currentInput = '0';
    }

    if (this.shouldResetDisplay) {
      this.currentInput = '0';
      this.shouldResetDisplay = false;
    }

    // Prevent decimal point input for integer-only calculator
    if (number === '.') {
      return;
    }

    if (this.currentInput === '0' && number !== '.') {
      this.currentInput = number;
    } else {
      this.currentInput += number;
    }

    this.updateDisplay();
  }

  handleAction(action) {
    switch (action) {
      case 'clear':
        this.clear();
        break;
      case 'sign':
        this.toggleSign();
        break;
      case 'percent':
        this.calculatePercentage();
        break;
      case 'add':
      case 'subtract':
      case 'multiply':
      case 'divide':
        this.handleOperation(action);
        break;
      case 'equals':
        this.calculate();
        break;
    }
  }

  handleOperation(op) {
    if (this.previousInput === null) {
      this.previousInput = this.currentInput;
    } else if (this.operation) {
      this.calculate();
    }

    this.operation = op;
    this.shouldResetDisplay = true;
  }

  calculate() {
    if (this.operation === null || this.previousInput === null) {
      return;
    }

    const prev = parseInt(this.previousInput, 10);
    const current = parseInt(this.currentInput, 10);

    if (isNaN(prev) || isNaN(current)) {
      this.displayError('Error');
      return;
    }

    let result;
    switch (this.operation) {
      case 'add':
        result = Calculator.add(prev, current);
        break;
      case 'subtract':
        result = Calculator.subtract(prev, current);
        break;
      case 'multiply':
        result = Calculator.multiply(prev, current);
        break;
      case 'divide':
        if (current === 0) {
          this.displayError('Cannot divide by zero');
          return;
        }
        result = Calculator.divide(prev, current);
        break;
      default:
        this.displayError('Error');
        return;
    }

    // Ensure result is an integer
    this.currentInput = result.toString();
    this.operation = null;
    this.previousInput = null;
    this.shouldResetDisplay = true;
    this.updateDisplay();
  }

  static add(a, b) {
    return a + b;
  }

  static subtract(a, b) {
    return a - b;
  }

  static multiply(a, b) {
    return a * b;
  }

  static divide(a, b) {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return Math.floor(a / b);
  }

  toggleSign() {
    if (this.currentInput !== '0') {
      if (this.currentInput.charAt(0) === '-') {
        this.currentInput = this.currentInput.slice(1);
      } else {
        this.currentInput = '-' + this.currentInput;
      }
      this.updateDisplay();
    }
  }

  calculatePercentage() {
    const current = parseInt(this.currentInput, 10);
    if (!isNaN(current)) {
      // For integer mode, we'll do integer division by 100
      this.currentInput = Math.floor(current / 100).toString();
      this.updateDisplay();
    }
  }

  clear() {
    this.currentInput = '0';
    this.previousInput = null;
    this.operation = null;
    this.shouldResetDisplay = false;
    this.isErrorState = false;
    this.updateDisplay();
  }

  displayError(message) {
    this.currentInput = message;
    this.isErrorState = true;
    this.updateDisplay();
    setTimeout(() => {
      this.clear();
    }, 2000);
  }

  updateDisplay() {
    // Limit display length to prevent overflow
    let displayValue = this.currentInput;
    if (displayValue.length > 12) {
      displayValue = displayValue.substring(0, 12);
    }
    this.display.textContent = displayValue;
  }
}

// Test framework
class TestRunner {
  constructor() {
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
  }

  test(description, fn) {
    this.tests.push({ description, fn });
  }

  assertEqual(actual, expected, message = '') {
    if (actual === expected) {
      this.passed++;
      console.log(`✅ PASS: ${message}`);
    } else {
      this.failed++;
      console.log(`❌ FAIL: ${message} - Expected: ${expected}, Actual: ${actual}`);
    }
  }

  assertThrows(fn, message = '') {
    try {
      fn();
      this.failed++;
      console.log(`❌ FAIL: ${message} - Expected exception but none was thrown`);
    } catch (e) {
      this.passed++;
      console.log(`✅ PASS: ${message} - Exception thrown as expected`);
    }
  }

  run() {
    console.log('Running integration tests...\n');
    
    for (const test of this.tests) {
      try {
        test.fn();
      } catch (e) {
        this.failed++;
        console.log(`❌ FAIL: ${test.description} - ${e.message}`);
      }
    }
    
    console.log(`\nIntegration Test Results: ${this.passed} passed, ${this.failed} failed`);
    return this.failed === 0;
  }
}

// Test suite
const runner = new TestRunner();

// Test basic number input integration
runner.test('Integration - Number Input', () => {
  const calc = new Calculator();
  calc.handleNumberInput('1');
  runner.assertEqual(calc.currentInput, '1', 'Should handle single digit input');
  
  calc.handleNumberInput('2');
  runner.assertEqual(calc.currentInput, '12', 'Should append digits correctly');
  
  calc.handleNumberInput('3');
  runner.assertEqual(calc.currentInput, '123', 'Should append multiple digits correctly');
});

// Test operation button integration
runner.test('Integration - Operation Buttons', () => {
  const calc = new Calculator();
  calc.handleNumberInput('5');
  calc.handleAction('add');
  runner.assertEqual(calc.previousInput, '5', 'Should store previous input when operation is selected');
  runner.assertEqual(calc.operation, 'add', 'Should store the operation');
  runner.assertEqual(calc.shouldResetDisplay, true, 'Should set reset flag');
});

// Test calculation integration
runner.test('Integration - Complete Calculation', () => {
  const calc = new Calculator();
  calc.handleNumberInput('1');
  calc.handleNumberInput('0');
  calc.handleAction('add');
  calc.handleNumberInput('5');
  calc.handleAction('equals');
  runner.assertEqual(calc.currentInput, '15', 'Should perform complete addition calculation');
});

// Test clear button integration
runner.test('Integration - Clear Button', () => {
  const calc = new Calculator();
  calc.handleNumberInput('1');
  calc.handleNumberInput('0');
  calc.handleAction('add');
  calc.handleAction('clear');
  runner.assertEqual(calc.currentInput, '0', 'Should reset current input');
  runner.assertEqual(calc.previousInput, null, 'Should reset previous input');
  runner.assertEqual(calc.operation, null, 'Should reset operation');
});

// Test sign toggle integration
runner.test('Integration - Sign Toggle', () => {
  const calc = new Calculator();
  calc.handleNumberInput('5');
  calc.handleAction('sign');
  runner.assertEqual(calc.currentInput, '-5', 'Should toggle sign');
  calc.handleAction('sign');
  runner.assertEqual(calc.currentInput, '5', 'Should toggle sign back');
});

// Test percentage calculation integration
runner.test('Integration - Percentage Calculation', () => {
  const calc = new Calculator();
  calc.handleNumberInput('2');
  calc.handleNumberInput('0');
  calc.handleNumberInput('0');
  calc.handleAction('percent');
  runner.assertEqual(calc.currentInput, '2', 'Should calculate percentage correctly');
});

// Test error handling integration
runner.test('Integration - Error Handling', () => {
  const calc = new Calculator();
  calc.handleNumberInput('1');
  calc.handleNumberInput('0');
  calc.handleAction('divide');
  calc.handleNumberInput('0');
  calc.handleAction('equals');
  runner.assertEqual(calc.currentInput, 'Cannot divide by zero', 'Should display error for division by zero');
});

// Test decimal point handling (should be ignored)
runner.test('Integration - Decimal Point Handling', () => {
  const calc = new Calculator();
  calc.handleNumberInput('1');
  calc.handleNumberInput('.');
  calc.handleNumberInput('5');
  runner.assertEqual(calc.currentInput, '15', 'Should ignore decimal point input');
});

// Test display update integration
runner.test('Integration - Display Updates', () => {
  const calc = new Calculator();
  calc.handleNumberInput('1');
  calc.handleNumberInput('2');
  calc.handleNumberInput('3');
  runner.assertEqual(mockDisplay.textContent, '123', 'Should update display correctly');
});

// Run tests
const success = runner.run();
process.exit(success ? 0 : 1);