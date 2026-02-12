/**
 * Calculator App Logic
 * Handles all calculator operations and UI interactions
 */

class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.currentInput = '0';
        this.previousInput = null;
        this.operation = null;
        this.shouldResetDisplay = false;
        this.isErrorState = false;
        
        this.init();
    }

    /**
     * Initialize calculator
     */
    init() {
        this.updateDisplay();
        this.setupEventListeners();
    }

    /**
     * Set up event listeners for calculator buttons
     */
    setupEventListeners() {
        // Number buttons
        document.querySelectorAll('[data-number]').forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleNumberInput(e.target.dataset.number);
            });
        });

        // Operation buttons
        document.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.handleAction(action);
            });
        });
    }

    /**
     * Handle number input
     * @param {string} number - Number pressed
     */
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

    /**
     * Handle action buttons
     * @param {string} action - Action to perform
     */
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

    /**
     * Handle operation input
     * @param {string} op - Operation to perform
     */
    handleOperation(op) {
        if (this.previousInput === null) {
            this.previousInput = this.currentInput;
        } else if (this.operation) {
            this.calculate();
        }

        this.operation = op;
        this.shouldResetDisplay = true;
    }

    /**
     * Perform calculation
     */
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

    /**
     * Add two integers
     * @param {number} a - First integer
     * @param {number} b - Second integer
     * @returns {number} - Sum of a and b
     */
    static add(a, b) {
        return a + b;
    }

    /**
     * Subtract two integers
     * @param {number} a - First integer
     * @param {number} b - Second integer
     * @returns {number} - Difference of a and b
     */
    static subtract(a, b) {
        return a - b;
    }

    /**
     * Multiply two integers
     * @param {number} a - First integer
     * @param {number} b - Second integer
     * @returns {number} - Product of a and b
     */
    static multiply(a, b) {
        return a * b;
    }

    /**
     * Divide two integers (integer division)
     * @param {number} a - Dividend
     * @param {number} b - Divisor
     * @returns {number} - Quotient of a and b (floored)
     */
    static divide(a, b) {
        if (b === 0) {
            throw new Error('Division by zero');
        }
        return Math.floor(a / b);
    }

    /**
     * Format calculation result for integer display
     * @param {number} result - Calculation result
     * @returns {string} - Formatted result
     */
    formatResult(result) {
        // For integer calculator, just convert to string
        return result.toString();
    }

    /**
     * Clear calculator
     */
    clear() {
        this.currentInput = '0';
        this.previousInput = null;
        this.operation = null;
        this.shouldResetDisplay = false;
        this.isErrorState = false;
        this.updateDisplay();
    }

    /**
     * Toggle sign of current input
     */
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

    /**
     * Calculate percentage (integer mode)
     */
    calculatePercentage() {
        const current = parseInt(this.currentInput, 10);
        if (!isNaN(current)) {
            // For integer mode, we'll do integer division by 100
            this.currentInput = Math.floor(current / 100).toString();
            this.updateDisplay();
        }
    }

    /**
     * Display error message
     * @param {string} message - Error message to display
     */
    displayError(message) {
        this.currentInput = message;
        this.isErrorState = true;
        this.updateDisplay();
        setTimeout(() => {
            this.clear();
        }, 2000);
    }

    /**
     * Update display with current input
     */
    updateDisplay() {
        // Limit display length to prevent overflow
        let displayValue = this.currentInput;
        if (displayValue.length > 12) {
            displayValue = displayValue.substring(0, 12);
        }
        this.display.textContent = displayValue;
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.calculator = new Calculator();
});

// Export for module usage (if needed in future)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Calculator;
}