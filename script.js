let currentInput = '';
let previousInput = '';
let operation = null;

const display = document.getElementById('display');

function clear() {
    currentInput = '';
    previousInput = '';
    operation = null;
    updateDisplay('0');
}

function appendNumber(number) {
    if (number === '0' && currentInput === '0') return;
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    updateDisplay(currentInput);
}

function chooseOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Division par zéro !");
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operation = undefined;
    previousInput = '';
    updateDisplay(currentInput);
}

function updateDisplay(value) {
    display.innerText = value;
}

document.querySelectorAll('button').forEach(button => {
    if (button.id === 'clear') {
        button.addEventListener('click', () => clear());
    } else if (button.id === 'equals') {
        button.addEventListener('click', () => calculate());
    } else if (button.id === 'add' || button.id === 'subtract' || button.id === 'multiply' || button.id === 'divide') {
        button.addEventListener('click', () => chooseOperation(button.textContent));
    } else {
        button.addEventListener('click', () => appendNumber(button.textContent));
    }
});

clear(); // Initialize calculator
