const inputField = document.querySelector('#display');
let footerMode = document.querySelector('#calc-mode');
let footerShiftMode = document.querySelector('#shift-btn');
let currentExpression = '';
let displayedExpression = '';
let lastStackedExpression = '';
let lastStackedValue = '';
let isShiftMode = false;

function addToDisplay(value) {
  let backendValue = value;

  if (value === "÷") {
    backendValue = "/";
  } else if (value === "×") {
    backendValue = "*";
  }

  currentExpression += backendValue;
  displayedExpression += value;
  inputField.value = displayedExpression;
}

function deleteLastCharacter() {
  currentExpression = currentExpression.slice(0, -1);
  displayedExpression = displayedExpression.slice(0, -1);
  inputField.value = displayedExpression;
}

function clearScreen() {
  currentExpression = '';
  displayedExpression = '';
  inputField.value = '0';
}

function calculate() {
  const mode = footerMode.textContent;
  lastStackedExpression = currentExpression;
  console.log(lastStackedExpression);
  const expression = encodeURIComponent(currentExpression);

  const headers = {
    expression: expression,
    mode: mode === "Rad" ? "Radians" : "Degree",
  };

  fetch('/complexCalc', { headers: headers })
    .then((response) => response.json())
    .then((data) => {
      try {
        inputField.value = data.result;
        lastStackedValue = data.result;
      } catch (error) {
        console.error(error);
        inputField.value = `Division By Zero: ${error}`;
      }

    })
    .catch((error) => {
      console.error("Error:", error);
      throw Error("Division By Zero:", error);
    });
  clearScreen();
}

function lastOperatedExpression() {
  if (currentExpression === '') {
    currentExpression = lastStackedExpression;
  } else {
    currentExpression += lastStackedExpression;
  }
  inputField.value = currentExpression;
}

function lastOperationValue() {
  if (currentExpression === '') {
    currentExpression = lastStackedValue;
  } else {
    currentExpression += lastStackedValue;
  }
  inputField.value = currentExpression;
}

/*function toggleMode() {
  const defaultt = "Rad";
  if (footerMode.textContent === defaultt) {
    footerMode.textContent = "Deg";
  } else {
    footerMode.textContent = defaultt;
  }
}*/


// document.querySelector('#calc-modee').addEventListener('click', toggleMode);

function toggleShiftMode() {
  isShiftMode = !isShiftMode;
  footerShiftMode.textContent = "shft";

  const buttonsToModify = document.querySelectorAll('.comp-operator');

  buttonsToModify.forEach((button) => {
    const text = button.textContent;
    switch (text) {
      case 'sin':
        button.textContent = isShiftMode ? 'asin' : 'sin';
        break;
      case 'cos':
        button.textContent = isShiftMode ? 'acos' : 'cos';
        break;
      case 'tan':
        button.textContent = isShiftMode ? 'atan' : 'tan';
        break;
      case 'log':
        button.innerHTML = isShiftMode ? '10<sup>x</sup>' : 'log';
        break;
      case 'In':
        button.innerHTML = isShiftMode ? 'e<sup>x</sup>' : 'In';
        break;
      case 'logb':
        button.innerHTML = isShiftMode ? 'x<sup>y</sup>' : 'logb';
        break;
      case 'x²':
        button.innerHTML = isShiftMode ? 'x<sup>3</sup>' : 'x²';
        break;
      default:
        isShiftMode = false;
        break;
    }
  });
}

document.querySelector('#shift-btn').addEventListener('click', toggleShiftMode());

footerShiftMode.addEventListener('click', () => {
  if (isShiftMode) {
    footerShiftMode.style.color = "pink";
  } else {
    footerShiftMode.style.color = "orage";
  }
});
