// Global Variables

let firstOperand;
let secondOperand;
let operator;
let displayValue = 0;
let result;
let currentTheme;

// Nodes

const numPad = document.querySelector('.main_pad');
const display = document.querySelector('.main_display');
const resultBtn = document.querySelector('#result_btn');
const resetBtn = document.querySelector('#reset_btn');
const themeSelector = document.querySelector('.selector_toggle');
const undoBtn = document.querySelector('#undo');


// Handlers

numPad.addEventListener('click', (e) => {
    const { id, textContent } = e.target;

    if (!id) {
        updateValues(textContent);
        updateDisplay();
    }
});

resultBtn.addEventListener('click', () => {
    if (firstOperand && secondOperand) {
        getResult();
    }
});

resetBtn.addEventListener('click', reset);

themeSelector.addEventListener('click', (e) => {
    updateCurrentTheme()

    const isNotCurrentTheme = e.target.textContent != currentTheme;
    const isNumberSelectorOrToggleButton = e.target.localName === 'span' || e.target.className === 'theme_picker';

    if (isNotCurrentTheme) {
        if (isNumberSelectorOrToggleButton) {
            setTheme();
        }
    }
});

undoBtn.addEventListener('click', undo);

// Functions

function undo() {
    // Prevents deleting "ERROR" char by chat after dividing by 0.
    if (!isFinite(result)) result = "0";

    if (result) {
        result = result.slice(0, result.length - 1);
    } else if (secondOperand) {
        secondOperand = secondOperand.slice(0, secondOperand.length - 1);
    } else if (operator) {
        operator = '';
    } else {
        firstOperand = firstOperand.slice(0, firstOperand.length - 1);
    }

    updateDisplay();
}

function updateCurrentTheme() {
    const root = document.documentElement

    if (root.className === 'dark') {
        currentTheme = 1;
    } else {
        currentTheme = 2;
    }
}

function setTheme() {
    const root = document.documentElement;
    const newTheme = getNewTheme(root);

    root.className = newTheme;
    updateThemePickerDisplay(root);
}

function getNewTheme(root) {
    return root.className === 'light' ? 'dark' : 'light';
}

function updateThemePickerDisplay(root) {
    const themePicker = document.querySelector('.theme_picker');

    if (root.className === 'light') {
        themePicker.style.justifyContent = 'flex-end';
    } else {
        themePicker.style.justifyContent = 'flex-start';
    }
}

function getResult() {
    const operationResult = operate(firstOperand, secondOperand, operator);
    result = operationResult;

    if (!isFinite(result)) {
        result = "ERROR";
    }

    showResult(result);
    clearOps();

    return result;
}

function clearOps() {
    firstOperand = null;
    secondOperand = null;
    operator = null;
}

function reset() {
    clearOps();
    displayValue = 0;
    result = null;

    display.textContent = displayValue;
}

function updateValues(value) {
    const isOperand = isFinite(value) || value == "." || !isNaN(value);
    const isOperator = !isFinite(value);

    if (isOperand && operator) {
        setSecondOperand(value);
    } else if (isOperand) {
        setFirstOperand(value);
    } else if (isOperator && firstOperand && !operator
        || isOperator && firstOperand
        && !secondOperand) {
        setOperator(value);
    } else if (isOperator && firstOperand && secondOperand) {
        firstOperand = getResult();
        setOperator(value);
    } else if (isOperator && result) {
        firstOperand = result;
        result = null;
        setOperator(value);
    }
};

function setFirstOperand(inputNumber) {
    if (!firstOperand) {
        firstOperand = inputNumber;
    } else {
        firstOperand += inputNumber;
    }
};

function setSecondOperand(inputNumber) {
    if (!secondOperand) {
        secondOperand = inputNumber;
    } else {
        secondOperand += inputNumber;
    }
};

function setOperator(inputOp) {
    operator = inputOp;
};

function updateDisplay() {
    if (secondOperand) {
        displayValue = `${firstOperand} ${operator} ${secondOperand}`;
    } else if (operator) {
        displayValue = `${firstOperand} ${operator}`;
    } else if (firstOperand) {
        displayValue = `${firstOperand}`;
    } else if (result) {
        displayValue = result;
    } else {
        displayValue = 0;
    }

    display.textContent = displayValue;
};

function showResult(resultValue) {
    displayValue = resultValue

    display.textContent = displayValue;
}

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
};

function operate(firstOperand, secondOperand, operator) {
    firstOperand = +firstOperand;
    secondOperand = +secondOperand;

    let result;

    switch (operator) {
        case "+":
            result = add(firstOperand, secondOperand);
            break;
        case "-":
            result = subtract(firstOperand, secondOperand);
            break;
        case "x":
            result = multiply(firstOperand, secondOperand);
            break;
        case "/":
            result = divide(firstOperand, secondOperand);
            break;
    }
    // Returns result as a string so the del button can be used on it.
    return String(result);
};