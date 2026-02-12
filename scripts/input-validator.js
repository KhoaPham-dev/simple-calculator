/**
 * Input Validator for Calculator App
 * Validates user inputs and handles edge cases
 */

class InputValidator {
    /**
     * Validates if a string represents a valid integer
     * @param {string} input - Input string to validate
     * @returns {boolean} - True if valid integer, false otherwise
     */
    static isValidNumber(input) {
        // Allow only integers (positive, negative, or zero)
        return /^-?\d+$/.test(input);
    }

    /**
     * Validates if a string represents a valid number (including decimals)
     * @param {string} input - Input string to validate
     * @returns {boolean} - True if valid number, false otherwise
     */
    static isValidNumberWithDecimals(input) {
        // Allow numbers, decimal points, and negative signs
        return /^-?\d*\.?\d*$/.test(input);
    }

    /**
     * Validates if an operation is supported
     * @param {string} operation - Operation to validate
     * @returns {boolean} - True if valid operation, false otherwise
     */
    static isValidOperation(operation) {
        const validOperations = ['add', 'subtract', 'multiply', 'divide'];
        return validOperations.includes(operation);
    }

    /**
     * Checks if division by zero is attempted
     * @param {number} operand - Second operand in division
     * @returns {boolean} - True if division by zero, false otherwise
     */
    static validateDivisionByZero(operand) {
        return operand === 0;
    }

    /**
     * Formats a number for display
     * @param {number} num - Number to format
     * @returns {string} - Formatted number string
     */
    static formatNumber(num) {
        // Convert to string and remove trailing zeros after decimal
        const str = num.toString();
        if (str.includes('.')) {
            return parseFloat(str).toString();
        }
        return str;
    }

    /**
     * Limits the length of input to prevent overflow
     * @param {string} input - Input string
     * @param {number} maxLength - Maximum allowed length
     * @returns {string} - Truncated input if necessary
     */
    static limitInputLength(input, maxLength = 12) {
        if (input.length > maxLength) {
            return input.substring(0, maxLength);
        }
        return input;
    }
}

// Export for module usage (if needed in future)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InputValidator;
}