// Variables

let operator = "";
let numA = "";
let numB = "";
let result = "";
let perc = "";

const displayEl = document.getElementById("display-el");
const operandsEl = document.getElementById("operands-el");
const operatorsEl = document.getElementById("operators-el");
const equalBtn = document.getElementById("equal-btn");
const clearBtn = document.getElementById("clear-btn");
const inversionBtn = document.getElementById("inversion-btn");
const percBtn = document.getElementById("perc-btn");
const dotBtn = document.getElementById("dot-btn");

// Event Listeners

operandsEl.addEventListener('click', (e) => {
    addDigit(e.target.textContent);
});

operatorsEl.addEventListener('click', (e) => {
    addOperator(e.target.textContent);
});

operatorsEl.addEventListener('click', () => {
    if (numA && numB) {
        operate(operator, numA, numB);
    }
});

equalBtn.addEventListener('click', () => {
    operate(operator, numA, numB);
});

clearBtn.addEventListener('click', () => {
    clearAllData();
});

inversionBtn.addEventListener('click', () => {
    invertNumber();
});

percBtn.addEventListener('click', () => {
    calcPercentage();
});





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

function calcPercentage() {
    if (numB) {
        perc += "%"
        renderInput();
        return numB = numA * (numB / 100);
    }
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
    perc = ""
}

function clearAllData() {
    operator = "";
    numA = "";
    numB = "";
    result = "";
    perc = ""
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
    if (input == "=" || numA == '') {
        return
    } else {
        operator = input;
        renderInput();
    }
}

function renderInput() {
    if (result != "") {
        displayEl.textContent = `${result} ${operator} ${numB} ${perc}`;
    } else {
        displayEl.textContent = `${numA} ${operator} ${numB} ${perc}`;
    }

}

function renderResult() {
    if (operator) {
        displayEl.textContent = result;
    }
}

function invertNumber() {
    if (!operator) {
        numA = +numA;
        numA = -numA;
    } else {
        numB = +numB;
        numB = -numB;
    }

    renderInput();
}