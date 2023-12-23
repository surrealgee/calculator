// Global Variables

let firstOperand;
let secondOperand;
let operator;

// Functions

function add(firstOperand, secondOperand) {
    return firstOperand + secondOperand;
};

function subtract(firstOperand, secondOperand) {
    return firstOperand - secondOperand;
};

function multiply(firstOperand, secondOperand) {
    return firstOperand * secondOperand;
};

function divide(firstOperand, secondOperand) {
    return firstOperand / secondOperand;
}

function operate(firstOperand, secondOperand, operator) {
    let result;

    switch (operator) {
        case "+":
            result = add(firstOperand, secondOperand);
            break;
        case "-":
            result = subtract(firstOperand, secondOperand);
            break;
        case "*":
            result = multiply(firstOperand, secondOperand);
            break;
        case "/":
            result = divide(firstOperand, secondOperand);
            break;
    }

    return result;
}

console.log(operate(2, 2, "+"));
console.log(operate(2, 2, "-"));
console.log(operate(2, 2, "*"));
console.log(operate(2, 2, "/"));
