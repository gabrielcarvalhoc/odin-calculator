let display = document.querySelector('.display');
let buttons = document.querySelectorAll('.buttons>button');

let numberInput = null;
let operator = '';
let firstNumber = null;
let secondNumber = null;

function add(num1, num2) {
    return Math.round((num1 + num2) * 100) / 100;
}

function subtract(num1, num2) {
    return Math.round((num1 - num2) * 100) / 100;
}

function multiply(num1, num2) {
    return Math.round((num1 * num2) * 100) / 100;
}

function divide(num1, num2) {
    if (num2 === 0) {
        return 'Error';
    }
    return Math.round((num1 / num2) * 100) / 100;
}

function operate(operator, num1, num2) {
    if (operator === '+') {
        return add(num1, num2);
    } else if (operator === '-') {
        return subtract(num1, num2);
    } else if (operator === '*') {
        return multiply(num1, num2);
    } else if (operator === '/') {
        return divide(num1, num2);
    }
}

// Add keyboard support
window.addEventListener('keydown', (e) => {
    const key = document.querySelector(`button[data-key="${e.key}"]`);
    key.click();
});

buttons.forEach((button) => {

    // Numbers
    button.addEventListener('click', () => {
        if (button.classList.contains('number')) {
            if (!numberInput) {
                numberInput = button.value;
                display.textContent = button.value;
            } else {
                numberInput += button.value;
                display.textContent += button.value;
            }
        }
    });

    // Operators
    button.addEventListener('click', () => {
        if (button.classList.contains('operator')) {
            if (!firstNumber) {
                operator = button.value;
                firstNumber = Number(numberInput);
                numberInput = null;
            } else if (firstNumber) {
                secondNumber = Number(numberInput);
                display.textContent = operate(operator, firstNumber, secondNumber);
                firstNumber = Number(display.textContent);
                numberInput = null;
                secondNumber = null;
                operator = button.value;
            }
        }
    });

    // Equals
    button.addEventListener('click', () => {
        if (button.id === 'equals') {
            if (operator === '+' || operator === '-') {
                secondNumber = Number(numberInput);
                display.textContent = operate(operator, firstNumber, secondNumber);
                firstNumber = Number(display.textContent);
                numberInput = null;
                secondNumber = null;
            } else if (operator === '*' || operator === '/') {
                secondNumber = Number(numberInput);
                display.textContent = operate(operator, firstNumber, secondNumber);
                firstNumber = Number(display.textContent);
                numberInput = 1;
                secondNumber = null;
            }
        }
    });

    // Clear
    button.addEventListener('click', () => {
        if (button.id === 'clear') {
            numberInput = null;
            firstNumber = null;
            secondNumber = null;
            display.textContent = '';
            operator = '';
        }
    });

    // Delete
    button.addEventListener('click', () => {
        if (button.id === 'delete') {
            numberInput = numberInput.slice(0, -1);
            display.textContent = numberInput;
        }
    });

    // Enable decimal inputs
    button.addEventListener('click', () => {
        if (button.id === 'dot') {
            if (!numberInput) {
                numberInput = '0' + button.value;
                display.textContent = '0' + button.value;
            } else if (!numberInput.includes(button.value)) {
                numberInput += button.value;
                display.textContent += button.value;
            }
        }
    });
});