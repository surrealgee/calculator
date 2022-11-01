// Variables

let operator = "";
let numA = "";
let numB = "";
let result = "";

const displayEl = document.getElementById("display-el");
const operandsEl = document.getElementById("operands-el");
const operatorsEl = document.getElementById("operators-el");
const equalBtn = document.getElementById("equal-btn");
const clearBtn = document.getElementById("clear-btn");

// Event Listeners

operandsEl.addEventListener('click', (e) => {
    addDigit(e.target.textContent);
});

operatorsEl.addEventListener('click', (e) => {
    addOperator(e.target.textContent);
});

equalBtn.addEventListener('click', () => {
    operate(operator, numA, numB)
}
);

clearBtn.addEventListener('click', () => clearAllData());





// Functions

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, numA, numB) {
    switch (operator) {
        case "+":
            result = add(+numA, +numB);
            break;
        case "-":
            result = subtract(+numA, +numB);
            break;
        case "*":
            result = multiply(+numA, +numB);
            break;
        case "/":
            result = divide(+numA, +numB);
            break;
    }
    renderResult();
    clearData();
    chainOperation();
}

function chainOperation() {
    numA = result;
}

function clearData() {
    operator = "";
    numA = "";
    numB = "";
}

function clearAllData() {
    operator = "";
    numA = "";
    numB = "";
    result = "";
    displayEl.textContent = 0;
}

function addDigit(input) {
    if (operator == "") {
        numA += input;
    } else {
        numB += input;
    }
    renderInput();
}

function addOperator(input) {
    if (input == "=") {
        return
    } else {
        operator = input;
        renderInput();
    }
}

function renderInput() {
    if (result != "") {
        displayEl.textContent = `${result} ${operator} ${numB}`;
    } else {
        displayEl.textContent = `${numA} ${operator} ${numB}`;
    }

}

function renderResult() {
    displayEl.textContent = result;
}