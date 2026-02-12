/**
 * Unit tests for Calculator App Logic
 */

// Mock DOM elements for testing
const mockDisplay = {
  textContent: '0'
};

// Calculator class (simplified for testing)
class Calculator {
  constructor() {
    this.display = mockDisplay;
    this.currentInput = '0';
    this.previousInput = null;
    this.operation = null;
    this.shouldResetDisplay = false;
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

  displayError(message) {
    this.currentInput = message;
    this.updateDisplay();
  }

  updateDisplay() {
    // Limit display length to prevent overflow
    let displayValue = this.currentInput;
    if (displayValue.length > 12) {
      displayValue = displayValue.substring(0, 12);
    }
    this.display.textContent = displayValue;
  }

  calculatePercentage() {
    const current = parseInt(this.currentInput, 10);
    if (!isNaN(current)) {
      // For integer mode, we'll do integer division by 100
      this.currentInput = Math.floor(current / 100).toString();
      this.updateDisplay();
    }
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

  clear() {
    this.currentInput = '0';
    this.previousInput = null;
    this.operation = null;
    this.shouldResetDisplay = false;
    this.updateDisplay();
  }

  // Static methods for arithmetic operations
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
}

// InputValidator class (simplified for testing)
class InputValidator {
  static isValidNumber(input) {
    // Allow only integers (positive, negative, or zero)
    return /^-?\d+$/.test(input);
  }

  static isValidNumberWithDecimals(input) {
    // Allow numbers, decimal points, and negative signs
    return /^-?\d*\.?\d*$/.test(input);
  }

  static isValidOperation(operation) {
    const validOperations = ['add', 'subtract', 'multiply', 'divide'];
    return validOperations.includes(operation);
  }

  static validateDivisionByZero(operand) {
    return operand === 0;
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
    console.log('Running tests...\n');
    
    for (const test of this.tests) {
      try {
        test.fn();
      } catch (e) {
        this.failed++;
        console.log(`❌ FAIL: ${test.description} - ${e.message}`);
      }
    }
    
    console.log(`\nTest Results: ${this.passed} passed, ${this.failed} failed`);
    return this.failed === 0;
  }
}

// Test suite
const runner = new TestRunner();

// Test InputValidator
runner.test('InputValidator - Valid integer', () => {
  runner.assertEqual(InputValidator.isValidNumber('123'), true, 'Should accept positive integer');
  runner.assertEqual(InputValidator.isValidNumber('-456'), true, 'Should accept negative integer');
  runner.assertEqual(InputValidator.isValidNumber('0'), true, 'Should accept zero');
  runner.assertEqual(InputValidator.isValidNumber('12.34'), false, 'Should reject decimal number');
  runner.assertEqual(InputValidator.isValidNumber('abc'), false, 'Should reject non-numeric string');
});

// Test Calculator operations
runner.test('Calculator - Addition', () => {
  const calc = new Calculator();
  calc.previousInput = '5';
  calc.currentInput = '3';
  calc.operation = 'add';
  calc.calculate();
  runner.assertEqual(calc.currentInput, '8', 'Should add two integers correctly');
});

runner.test('Calculator - Addition with Negative Numbers', () => {
  const calc = new Calculator();
  calc.previousInput = '-5';
  calc.currentInput = '3';
  calc.operation = 'add';
  calc.calculate();
  runner.assertEqual(calc.currentInput, '-2', 'Should add negative and positive integers correctly');
});

runner.test('Calculator - Addition with Two Negative Numbers', () => {
  const calc = new Calculator();
  calc.previousInput = '-5';
  calc.currentInput = '-3';
  calc.operation = 'add';
  calc.calculate();
  runner.assertEqual(calc.currentInput, '-8', 'Should add two negative integers correctly');
});

runner.test('Calculator - Addition with Zero', () => {
  const calc = new Calculator();
  calc.previousInput = '5';
  calc.currentInput = '0';
  calc.operation = 'add';
  calc.calculate();
  runner.assertEqual(calc.currentInput, '5', 'Should add zero correctly');
});

runner.test('Calculator - Subtraction', () => {
  const calc = new Calculator();
  calc.previousInput = '10';
  calc.currentInput = '4';
  calc.operation = 'subtract';
  calc.calculate();
  runner.assertEqual(calc.currentInput, '6', 'Should subtract two integers correctly');
});

runner.test('Calculator - Subtraction with Negative Result', () => {
  const calc = new Calculator();
  calc.previousInput = '4';
  calc.currentInput = '10';
  calc.operation = 'subtract';
  calc.calculate();
  runner.assertEqual(calc.currentInput, '-6', 'Should subtract to negative result correctly');
});

runner.test('Calculator - Subtraction with Negative Numbers', () => {
  const calc = new Calculator();
  calc.previousInput = '-10';
  calc.currentInput = '4';
  calc.operation = 'subtract';
  calc.calculate();
  runner.assertEqual(calc.currentInput, '-14', 'Should subtract with negative numbers correctly');
});

runner.test('Calculator - Subtraction of Negative Numbers', () => {
  const calc = new Calculator();
  calc.previousInput = '10';
  calc.currentInput = '-4';
  calc.operation = 'subtract';
  calc.calculate();
  runner.assertEqual(calc.currentInput, '14', 'Should subtract negative numbers correctly');
});

runner.test('Calculator - Multiplication', () => {
  const calc = new Calculator();
  calc.previousInput = '7';
  calc.currentInput = '6';
  calc.operation = 'multiply';
  calc.calculate();
  runner.assertEqual(calc.currentInput, '42', 'Should multiply two integers correctly');
});

runner.test('Calculator - Multiplication with Negative Numbers', () => {
  const calc = new Calculator();
  calc.previousInput = '-7';
  calc.currentInput = '6';
  calc.operation = 'multiply';
  calc.calculate();
  runner.assertEqual(calc.currentInput, '-42', 'Should multiply negative and positive integers correctly');
});

runner.test('Calculator - Multiplication with Two Negative Numbers', () => {
  const calc = new Calculator();
  calc.previousInput = '-7';
  calc.currentInput = '-6';
  calc.operation = 'multiply';
  calc.calculate();
  runner.assertEqual(calc.currentInput, '42', 'Should multiply two negative integers correctly');
});

runner.test('Calculator - Multiplication by Zero', () => {
  const calc = new Calculator();
  calc.previousInput = '7';
  calc.currentInput = '0';
  calc.operation = 'multiply';
  calc.calculate();
  runner.assertEqual(calc.currentInput, '0', 'Should multiply by zero correctly');
});

runner.test('Calculator - Multiplication by One', () => {
  const calc = new Calculator();
  calc.previousInput = '7';
  calc.currentInput = '1';
  calc.operation = 'multiply';
  calc.calculate();
  runner.assertEqual(calc.currentInput, '7', 'Should multiply by one correctly');
});

runner.test('Calculator - Division', () => {
  const calc = new Calculator();
  calc.previousInput = '15';
  calc.currentInput = '3';
  calc.operation = 'divide';
  calc.calculate();
  runner.assertEqual(calc.currentInput, '5', 'Should divide two integers correctly');
});

runner.test('Calculator - Division with Negative Numbers', () => {
  const calc = new Calculator();
  calc.previousInput = '-15';
  calc.currentInput = '3';
  calc.operation = 'divide';
  calc.calculate();
  runner.assertEqual(calc.currentInput, '-5', 'Should divide with negative dividend correctly');
});

runner.test('Calculator - Division by Negative Numbers', () => {
  const calc = new Calculator();
  calc.previousInput = '15';
  calc.currentInput = '-3';
  calc.operation = 'divide';
  calc.calculate();
  runner.assertEqual(calc.currentInput, '-5', 'Should divide by negative divisor correctly');
});

runner.test('Calculator - Division with Two Negative Numbers', () => {
  const calc = new Calculator();
  calc.previousInput = '-15';
  calc.currentInput = '-3';
  calc.operation = 'divide';
  calc.calculate();
  runner.assertEqual(calc.currentInput, '5', 'Should divide two negative numbers correctly');
});

runner.test('Calculator - Integer Division', () => {
  const calc = new Calculator();
  calc.previousInput = '17';
  calc.currentInput = '5';
  calc.operation = 'divide';
  calc.calculate();
  runner.assertEqual(calc.currentInput, '3', 'Should perform integer division (floor)');
});

runner.test('Calculator - Division by Zero', () => {
  const calc = new Calculator();
  calc.previousInput = '10';
  calc.currentInput = '0';
  calc.operation = 'divide';
  calc.calculate();
  runner.assertEqual(calc.currentInput, 'Cannot divide by zero', 'Should show error for division by zero');
});

// Test static arithmetic methods directly
runner.test('Calculator - Static Addition Method', () => {
  runner.assertEqual(Calculator.add(5, 3), 8, 'Should add two integers correctly');
  runner.assertEqual(Calculator.add(-5, 3), -2, 'Should add negative and positive integers correctly');
  runner.assertEqual(Calculator.add(0, 5), 5, 'Should add zero correctly');
});

runner.test('Calculator - Static Subtraction Method', () => {
  runner.assertEqual(Calculator.subtract(5, 3), 2, 'Should subtract two integers correctly');
  runner.assertEqual(Calculator.subtract(3, 5), -2, 'Should subtract larger from smaller correctly');
  runner.assertEqual(Calculator.subtract(5, 0), 5, 'Should subtract zero correctly');
});

runner.test('Calculator - Static Multiplication Method', () => {
  runner.assertEqual(Calculator.multiply(5, 3), 15, 'Should multiply two integers correctly');
  runner.assertEqual(Calculator.multiply(-5, 3), -15, 'Should multiply negative and positive integers correctly');
  runner.assertEqual(Calculator.multiply(5, 0), 0, 'Should multiply by zero correctly');
});

runner.test('Calculator - Static Division Method', () => {
  runner.assertEqual(Calculator.divide(10, 3), 3, 'Should divide two integers correctly');
  runner.assertEqual(Calculator.divide(10, 2), 5, 'Should perform exact division correctly');
  runner.assertEqual(Calculator.divide(-10, 3), -4, 'Should perform negative division correctly');
});

runner.test('Calculator - Static Division by Zero', () => {
  runner.assertThrows(() => {
    Calculator.divide(10, 0);
  }, 'Should throw error for division by zero');
});

runner.test('Calculator - Percentage Calculation', () => {
  const calc = new Calculator();
  calc.currentInput = '50';
  calc.calculatePercentage();
  runner.assertEqual(calc.currentInput, '0', 'Should calculate percentage correctly for integer mode');
  
  calc.currentInput = '150';
  calc.calculatePercentage();
  runner.assertEqual(calc.currentInput, '1', 'Should calculate percentage correctly for larger numbers');
});

// Test toggleSign method
runner.test('Calculator - Toggle Sign', () => {
  const calc = new Calculator();
  calc.currentInput = '5';
  calc.toggleSign();
  runner.assertEqual(calc.currentInput, '-5', 'Should toggle positive to negative');
  
  calc.toggleSign();
  runner.assertEqual(calc.currentInput, '5', 'Should toggle negative to positive');
  
  calc.currentInput = '0';
  calc.toggleSign();
  runner.assertEqual(calc.currentInput, '0', 'Should not toggle zero');
});

// Test clear method
runner.test('Calculator - Clear', () => {
  const calc = new Calculator();
  calc.currentInput = '123';
  calc.previousInput = '456';
  calc.operation = 'add';
  calc.shouldResetDisplay = true;
  calc.clear();
  runner.assertEqual(calc.currentInput, '0', 'Should reset current input to 0');
  runner.assertEqual(calc.previousInput, null, 'Should reset previous input to null');
  runner.assertEqual(calc.operation, null, 'Should reset operation to null');
  runner.assertEqual(calc.shouldResetDisplay, false, 'Should reset shouldResetDisplay to false');
});

// Run tests
const success = runner.run();
process.exit(success ? 0 : 1);