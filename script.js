let prevNumber = ' ';
let prevNumber2 = ' ';
let calculationOperator = ' ';
let currentNumber = '0';

// button angka
const inputNumber = (number) => {
    if (currentNumber === '0') {
        currentNumber = number;
    }else{
        currentNumber += number;
    }
}

const numbers = document.querySelectorAll('.number');

numbers.forEach((number) => {
    number.addEventListener("click", (event) => {
        inputNumber(event.target.value);
        updateScreen(currentNumber);
    });
});



// button operator
const inputOperator = (operator) => {
    if (calculationOperator === '') {
        prevNumber = currentNumber;
    }
    calculationOperator = operator;
    currentNumber = '0';
}

const operators = document.querySelectorAll('.operator');

operators.forEach((operator) => {
    operator.addEventListener("click", (event) => {
        inputOperator(event.target.value);
        updateScreen(currentNumber);
        printHistory(prevNumber,calculationOperator);
   });
});

// button desimal
const inputDecimal = (dot) => {
    if (currentNumber.includes('.')) {
        return;
    }
    currentNumber += dot;
}

const decimal = document.querySelector('.decimal');

decimal.addEventListener("click", (event) => {
    inputDecimal(event.target.value);
    updateScreen(currentNumber);
});

// layar kalkulator
const calculatorScreen = document.querySelector('.output-value');

const updateScreen = (number) => {
    calculatorScreen.value = number ;
}

// layar history
const historyValue = document.querySelector('.history-value');

const printHistory = (num1,opr1,num2,opr2) => {
    if (num2 != null && opr2 != null) {
        historyValue.value = num1+opr1+num2+opr2;
    } else {
        historyValue.value = num1+opr1;
    }
}

//button plus minus
const PlusMinus = () => {
    let result = '';
    switch (currentNumber) {
        case '0':
            result = currentNumber;
            break;
        case '-'+currentNumber:
            result = parseFloat(currentNumber) * -1;
            break;
        case currentNumber:
            result = parseFloat(currentNumber) * -1;
            break;
        default:
            return;
    }
    currentNumber = result;
}

const plusMinus = document.querySelector('.plusMinus');

plusMinus.addEventListener("click", () => {
    PlusMinus();
    updateScreen(currentNumber);
});

// button menghitung hasil operator dan special operator
const calculate = () => {
    let result = '';
    switch (calculationOperator) {
        case '+':
            result = parseFloat(prevNumber) + parseFloat(currentNumber);
            break;
        case '-':
            result = parseFloat(prevNumber) - parseFloat(currentNumber);
            break;
        case '*':
            result = parseFloat(prevNumber) * parseFloat(currentNumber);
            break;
        case '/':
            result = parseFloat(prevNumber) / parseFloat(currentNumber);
            break;
        case '^y':
            result = Math.pow(parseFloat(prevNumber), parseFloat(currentNumber));
            break;
        case 'mod':
            result = parseFloat(prevNumber) % parseFloat(currentNumber);
            break;
        default:
            return;
    }
    prevNumber2 = currentNumber;
    currentNumber = result;
}

const equalSign = document.querySelector('.equal-sign');

equalSign.addEventListener("click", () => {
    calculate();
    updateScreen(currentNumber);
    printHistory(prevNumber,calculationOperator,prevNumber2,'=');
    calculationOperator = '';
});

// button persen
const percent = document.querySelector('.percentage');

percent.addEventListener("click", () => {
    prevNumber = currentNumber;
    result = parseFloat(currentNumber) * 1 / 100;
    currentNumber = result
    updateScreen(currentNumber);
    printHistory(prevNumber,'%');
});

// button pangkat 2
const square = document.querySelector('.square');

square.addEventListener("click", () => {
    prevNumber = currentNumber;
    result = Math.pow(parseFloat(currentNumber), 2);
    currentNumber = result
    updateScreen(currentNumber);
    printHistory(prevNumber,'^2');
});

// button akar pangkat 2
const squareRoot = document.querySelector('.squareRoot');

squareRoot.addEventListener("click", () => {
    prevNumber = currentNumber;
    printHistory(`sqrt(${currentNumber})`);
    result = Math.sqrt(parseFloat(currentNumber));
    currentNumber = result;
    updateScreen(currentNumber);
    printHistory(prevNumber,'/^2');
});

// button Clear
const backSpace = document.querySelector('.clear');

backSpace.addEventListener("click", () => {
    currentNumber =  calculatorScreen.value.slice(0, calculatorScreen.value.length -1);
    if (currentNumber == ''){
        currentNumber = '0';
        calculationOperator = '';
        printHistory('',calculationOperator);
    } else{
        currentNumber = currentNumber;
    }
    updateScreen(currentNumber);
});

// button All Clear
const clearAllBtn = () => {
    prevNumber = '';
    prevNumber2 = '';
    calculationOperator = '';
    currentNumber = '0';
}

const clearAll = document.querySelector('.all-clear');

clearAll.addEventListener("click", () => {
    clearAllBtn();
    printHistory(prevNumber,calculationOperator,prevNumber2);
    updateScreen(currentNumber);
});