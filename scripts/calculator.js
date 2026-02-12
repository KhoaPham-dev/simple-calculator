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
        if (this.shouldResetDisplay) {
            this.currentInput = '0';
            this.shouldResetDisplay = false;
        }

        if (number === '.' && this.currentInput.includes('.')) {
            return; // Prevent multiple decimal points
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

        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);

        if (isNaN(prev) || isNaN(current)) {
            return;
        }

        let result;
        switch (this.operation) {
            case 'add':
                result = prev + current;
                break;
            case 'subtract':
                result = prev - current;
                break;
            case 'multiply':
                result = prev * current;
                break;
            case 'divide':
                if (current === 0) {
                    this.displayError('Error');
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }

        // Format result to avoid floating point precision issues
        this.currentInput = this.formatResult(result);
        this.operation = null;
        this.previousInput = null;
        this.shouldResetDisplay = true;
        this.updateDisplay();
    }

    /**
     * Format calculation result
     * @param {number} result - Calculation result
     * @returns {string} - Formatted result
     */
    formatResult(result) {
        // Handle decimal precision
        const strResult = result.toString();
        if (strResult.includes('.') && strResult.split('.')[1].length > 10) {
            return result.toFixed(10);
        }
        return strResult;
    }

    /**
     * Clear calculator
     */
    clear() {
        this.currentInput = '0';
        this.previousInput = null;
        this.operation = null;
        this.shouldResetDisplay = false;
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
     * Calculate percentage
     */
    calculatePercentage() {
        const current = parseFloat(this.currentInput);
        if (!isNaN(current)) {
            this.currentInput = (current / 100).toString();
            this.updateDisplay();
        }
    }

    /**
     * Display error message
     * @param {string} message - Error message to display
     */
    displayError(message) {
        this.currentInput = message;
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