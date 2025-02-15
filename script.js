const calc = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
}

function inputDigit(digit) { 
    const { displayValue, waitingForSecondOperand } = calc;
    if (waitingForSecondOperand === true) {
        calc.displayValue = digit;
        calc.waitingForSecondOperand = false;
    } else {
        calc.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
 }

function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calc;
    const inputValue = parseFloat(displayValue);
    if (operator && calc.waitingForSecondOperand) {
        calc.operator = nextOperator;
        return;
    }
    if (firstOperand == null && !isNaN(inputValue)) {
        calc.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
        calc.displayValue = `${parseFloat(result.toFixed(5))}`;
        calc.firstOperand = result;
    }
    calc.waitingForSecondOperand = true;
    calc.operator = nextOperator;
}

function inputDecimal(dot) {
    if (calc.waitingForSecondOperand === true) {
        calc.displayValue = "0."
        calc.waitingForSecondOperand = false;
        return
    }
    if (!calc.displayValue.includes(dot)){
        calc.displayValue += dot;
    }
}

function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+'){
        return firstOperand + secondOperand;
    } else if (operator === '-'){
        return firstOperand - secondOperand;
    } else if (operator === 'x') {
        return firstOperand * secondOperand;
    } else if (operator === '/') {
        return firstOperand / secondOperand;
    } else if (operator === "xx") {
        return firstOperand ** secondOperand;
    }

    return secondOperand;
}

function resetCalculator(){
    calc.displayValue = '0';
    calc.firstOperand = null;
    calc.waitingForSecondOperand = false;
    calc.operator = null;
}

function sin() { 
    const result = Math.sin(calc.displayValue);
    calc.displayValue = `${parseFloat(result.toFixed(5))}`;
 }

 function cos() { 
    const result = Math.cos(calc.displayValue);
    calc.displayValue = `${parseFloat(result.toFixed(5))}`;
}

 function tan() { 
    const result = Math.tan(calc.displayValue);
    calc.displayValue = `${parseFloat(result.toFixed(5))}`;
 }

 function updateDisplay(){
    const display = document.querySelector('.calc-screen');
    display.value = calc.displayValue;
 }

 updateDisplay();

 const key = document.querySelector('.calc-keys');
 key.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;
if (!target.matches('button')){
    return;
}
switch (value) {
    case '+':
    case '-':
    case 'x':
    case '/':
    case 'xx':
    case '=':
        handleOperator(value);
    break;

    case 'sin':
        sin(value);
    break;

    case 'tan':
        tan(value);
    break;
    
    case 'cos':
        cos(value);
    break;

    case '.':
        inputDecimal(value);
    break;

    case 'all-clear':
        resetCalculator();
    break;
}
if (Number.isInteger(parseFloat(value))) {
    inputDigit(value);
}
updateDisplay();
 });
