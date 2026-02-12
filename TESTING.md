# Testing Guide

This document provides guidelines for manual testing of the calculator application, particularly for cross-browser compatibility and responsive design verification.

## Cross-Browser Testing (AS-547)

### Supported Browsers

- Google Chrome (latest version)
- Mozilla Firefox (latest version)
- Apple Safari (latest version)
- Microsoft Edge (latest version)
- Mobile browsers (iOS Safari, Android Chrome)

### Testing Checklist

#### Basic Functionality
- [ ] All number buttons (0-9) work correctly
- [ ] All operation buttons (+, -, ×, ÷) work correctly
- [ ] Equals (=) button calculates properly
- [ ] Clear (C) button resets the calculator
- [ ] Plus/Minus (±) button toggles sign correctly
- [ ] Percent (%) button calculates percentages correctly
- [ ] Decimal point button is handled appropriately (ignored in integer mode)

#### Arithmetic Operations
- [ ] Addition with positive numbers
- [ ] Addition with negative numbers
- [ ] Subtraction with positive numbers
- [ ] Subtraction with negative numbers
- [ ] Multiplication with positive numbers
- [ ] Multiplication with negative numbers
- [ ] Division with positive numbers
- [ ] Division with negative numbers
- [ ] Division by zero shows appropriate error message

#### Error Handling
- [ ] Division by zero displays "Cannot divide by zero" and clears after 2 seconds
- [ ] Large number inputs are truncated at 12 digits
- [ ] Invalid operations show "Error" message

### Browser-Specific Checks

#### Google Chrome
- [ ] All functionality works as expected
- [ ] Theme toggle works correctly
- [ ] No console errors in Developer Tools

#### Mozilla Firefox
- [ ] All functionality works as expected
- [ ] Theme toggle works correctly
- [ ] No console errors in Developer Tools

#### Apple Safari
- [ ] All functionality works as expected
- [ ] Theme toggle works correctly
- [ ] No console errors in Developer Tools

#### Microsoft Edge
- [ ] All functionality works as expected
- [ ] Theme toggle works correctly
- [ ] No console errors in Developer Tools

## Responsive Design Testing (AS-549)

### Device Sizes to Test

- Desktop (1920px and above)
- Laptop (1366px)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

### Testing Checklist

#### Layout Verification
- [ ] Calculator fits within viewport on all screen sizes
- [ ] Buttons are appropriately sized for touch interaction
- [ ] Display text is readable on all devices
- [ ] Theme toggle button is accessible
- [ ] No horizontal scrolling required

#### Touch Interaction
- [ ] All buttons respond to touch events
- [ ] Button press states are visible
- [ ] No accidental button presses due to small hit areas
- [ ] Theme toggle works with touch

#### Orientation Changes
- [ ] Layout adjusts properly when rotating device
- [ ] Content remains readable in landscape mode
- [ ] Buttons remain accessible in all orientations

#### Performance
- [ ] Page loads quickly on mobile devices
- [ ] Interactions feel responsive
- [ ] No visual glitches during orientation changes

## Test Results Documentation

Document any issues found during testing in the format below:

### Issue Template
```
Browser/Device: [Browser name and version / Device model]
Issue Description: [Brief description of the problem]
Steps to Reproduce:
1. [Step 1]
2. [Step 2]
3. [Step 3]
Expected Result: [What should happen]
Actual Result: [What actually happens]
Screenshots: [If applicable]
```

## Automated Testing

For automated testing instructions, refer to the README.md file in the project root.

## Additional Notes

- Test with both dark and light themes
- Verify keyboard accessibility if implemented
- Test with various input combinations
- Pay special attention to edge cases (very large numbers, consecutive operations)