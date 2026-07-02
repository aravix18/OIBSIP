const screen = document.getElementById("calc-screen");
let expression = "";

function addNumber(num) {
    if (screen.value === "0" && num !== ".") {
        expression = num;
    } else {
        expression = expression + num;
    }
    screen.value = expression;
}

function addOperator(op) {
    if (expression === "") {
        return; 
    }
    
    const lastCharacter = expression.substring(expression.length - 1);
    if (lastCharacter === "+" || lastCharacter === "-" || lastCharacter === "*" || lastCharacter === "/") {
        expression = expression.slice(0, -1) + op;
    } else {
        expression = expression + op;
    }
    screen.value = expression;
}

function clearScreen() {
    expression = "";
    screen.value = "0";
}

function backspace() {
    expression = expression.slice(0, -1);
    if (expression === "") {
        screen.value = "0";
    } else {
        screen.value = expression;
    }
}

function runCalculation() {
    if (expression === "") {
        return;
    }

    try {
        let calculationResult = eval(expression);

        if (calculationResult === Infinity || calculationResult === -Infinity) {
            screen.value = "Error";
            expression = "";
        } else {
            screen.value = calculationResult;
            expression = calculationResult.toString();
        }
    } catch (err) {
        screen.value = "Error";
        expression = "";
    }
}