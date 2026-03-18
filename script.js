const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');

let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetScreen = false;

function appendNumber(number) {
    if (currentInput === '0' && number !== '.') currentInput = '';
    if (number === '.' && currentInput.includes('.')) return;

    if (shouldResetScreen) {
        currentInput = number;
        shouldResetScreen = false;
    } else {
        currentInput += number;
    }

    updateDisplay();
}

function chooseOperation(op) {
    if (operator !== null) calculate();

    previousInput = currentInput;
    operator = op;
    shouldResetScreen = true;

    historyDisplay.innerText = `${previousInput} ${op}`;
}

function calculate() {
    if (!operator) return;

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;

    switch (operator) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': result = current === 0 ? 'Error' : prev / current; break;
        case '%': result = prev % current; break;
    }

    currentInput = result.toString();
    operator = null;
    shouldResetScreen = true;
    updateDisplay();
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    historyDisplay.innerText = '';
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1) || '0';
    updateDisplay();
}

function updateDisplay() {
    display.value = currentInput;
}

/* Keyboard Support */
window.addEventListener('keydown', (e) => {
    const key = e.key;

    if (!isNaN(key)) appendNumber(key);
    else if (['+', '-', '*', '/', '%'].includes(key)) chooseOperation(key);
    else if (key === 'Enter') calculate();
    else if (key === 'Backspace') deleteLast();
    else if (key === 'Escape') clearAll();
    else if (key === '.') appendNumber('.');
});

/* Button Click */
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
        const val = btn.innerText;

        if (!isNaN(val) || val === '.') appendNumber(val);
        else if (['+', '−', '×', '÷', '%'].includes(val)) {
            const map = {'×': '*', '÷': '/', '−': '-'};
            chooseOperation(map[val] || val);
        }
        else if (val === '=') calculate();
        else if (val === 'AC') clearAll();
        else if (val === 'DEL') deleteLast();
    });
});
