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
  if (b === 0) {
    return "Error";
  }
  return a / b;
}

let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetScreen = false;

const screen = document.querySelector(".screen");
const numberButtons = document.querySelectorAll(".btn.number");
const operatorButtons = document.querySelectorAll(".btn.operator");
const clearButton = document.querySelector(".btn.clear");
const equalButton = document.querySelector(".btn.equal");
const decimalButton = document.querySelector(".btn.decimal");

function updateScreen(value) {
  if (screen.textContent === "0" || shouldResetScreen) {
    screen.textContent = value;
    shouldResetScreen = false;
  } else {
    screen.textContent += value;
  }
}

function clearScreen() {
  screen.textContent = "0";
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
}

function setOperator(operator) {
  if (currentOperator !== null) evaluate();
  firstNumber = screen.textContent;
  currentOperator = operator;
  shouldResetScreen = true;
}

function evaluate() {
  if (currentOperator === null || shouldResetScreen) return;
  secondNumber = screen.textContent;
  screen.textContent = operate(currentOperator, firstNumber, secondNumber);
  currentOperator = null;
}

function appendDecimal() {
  if (shouldResetScreen) resetScreen();
  if (!screen.textContent.includes(".")) {
    screen.textContent += ".";
  }
}

function operate(operator, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "x":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return null;
  }
}

numberButtons.forEach((button) =>
  button.addEventListener("click", () => updateScreen(button.textContent))
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperator(button.textContent))
);

equalButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clearScreen);
decimalButton.addEventListener("click", appendDecimal);

clearScreen();
