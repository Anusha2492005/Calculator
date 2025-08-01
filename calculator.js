const display = document.getElementById('display');
const buttons = document.querySelectorAll('#container button');

let expression = '';
let resetNext = false;

function updateDisplay() {
  display.textContent = expression || '0';
}

function press(value) {
  if (resetNext) {
    expression = '';
    resetNext = false;
  }
  expression += value;
  updateDisplay();
}

function calculate() {
  try {
    const sanitized = expression.replace(/X/g, '*').replace(/÷/g, '/');
    const evalResult = eval(sanitized);
    expression = parseFloat(evalResult.toFixed(4)).toString();
    resetNext = true;
  } catch {
    expression = 'Error';
    resetNext = true;
  }
  updateDisplay();
}

function clearAll() {
  expression = '';
  resetNext = false;
  updateDisplay();
}

function toggleSign() {
  if (expression) {
    if (expression.startsWith('-')) {
      expression = expression.substring(1);
    } else {
      expression = '-' + expression;
    }
    updateDisplay();
  }
}

function percentage() {
  if (expression) {
    expression = (parseFloat(expression) / 100).toString();
    updateDisplay();
  }
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent.trim();

    if (value === '') return;

    switch (value) {
      case 'AC':
        clearAll();
        break;
      case '+/-':
        toggleSign();
        break;
      case '%':
        percentage();
        break;
      case '=':
        calculate();
        break;
      case 'X':
      case '/':
      case '+':
      case '-':
      case '.':
        press(value);
        break;
      default:
        press(value);
    }
  });
});

updateDisplay();
