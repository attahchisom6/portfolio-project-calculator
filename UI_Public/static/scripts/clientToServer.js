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

function toggleMode() {
  const defaultt = "Rad";
  if (footerMode.textContent === defaultt) {
    footerMode.textContent = "Deg";
  } else {
    footerMode.textContent = defaultt;
  }
}

function toggleShiftMode() {
  isShiftMode = !isShiftMode;

  const buttonsToModify = document.querySelectorAll('.comp-operator');

  buttonsToModify.forEach((button) => {
    // const text = button.textContent;
    const html = button.innerHTML;

    const defaultButtonsLabel = {
      'sin': 'asin',
      'cos': 'acos' : 'cos',
      'tan': 'atan',
      'x<sup>2</sup>': 'x<sup>3</sup>',
      'log': '10<sup>x</sup>',
      'In': 'e<sup>x</sup>',
      'logb': 'b<sup>y</sup>',
    };

    const customButtonsLabel = {
      'asin': 'sin',
      'acos': 'cos',
      'atan': 'tan',
      'x<sup>3</sup>': 'x<sup>2</sup>',
      '10<sup>x</sup>': 'log',
      'e<sup>x</sup>': 'In',
      'b<sup>y</sup>': 'logb',
    }
    
    if (defaultButtonsLabel.hasOwnProperty(html)) {
      button.innerHTML = defaultButtonsLabel[html];
      footerShiftMode.textContent = 'shft';
    } else if (customButtonsLabel.hasOwnProperty(html)) {
      button,innerHTML = customButtonsLabel[html];
      footerShiftMode.textContent = "";
    } else {
      button.innerHTML = html;
    }
  });
}

document.querySelector('#shift-btn').addEventListener('click', toggleShiftMode);

footerShiftMode.innerHTML = isShiftMode ? 'shift' : "";
footerShiftMode.style.color = isShiftMode ? 'purple' : 'orange';

