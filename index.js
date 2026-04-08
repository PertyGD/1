const resultDisplay = document.querySelector('#result');
const buttons = document.querySelector('.button-grid');

let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetScreen = false;

buttons.addEventListener('click', (e) => {
  const button = e.target;
  if (!button.matches('button')) return;

  const action = button.dataset.action;
  const content = button.textContent;

  switch (action) {
    case 'number':
      appendNumber(content);
      break;
    case 'decimal':
      appendDecimal();
      break;
    case 'operator':
      handleOperator(content);
      break;
    case 'clear':
      clear();
      break;
    case 'calculate':
      calculate();
      break;
  }
  updateDisplay();
});

function appendNumber(number) {
  if (currentInput === '0' || shouldResetScreen) {
    currentInput = number;
    shouldResetScreen = false;
  } else {
    currentInput += number;
  }
}

function appendDecimal() {
  if (shouldResetScreen) {
    currentInput = '0.';
    shouldResetScreen = false;
    return;
  }
  if (!currentInput.includes('.')) {
    currentInput += '.';
  }
}

function handleOperator(nextOperator) {
  if (operator !== null && !shouldResetScreen) {
    calculate();
  }
  previousInput = currentInput;
  operator = nextOperator;
  shouldResetScreen = true;
}

function clear() {
  currentInput = '0';
  previousInput = '';
  operator = null;
  shouldResetScreen = false;
}

function calculate() {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
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
        alert("Cannot divide by zero");
        clear();
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  // Handle floating point precision issues (e.g., 0.1 + 0.2)
  result = Math.round(result * 100000000) / 100000000;

  currentInput = result.toString();
  operator = null;
  shouldResetScreen = true;
}

function updateDisplay() {
  resultDisplay.value = currentInput;
}

// Initialize display
updateDisplay();
