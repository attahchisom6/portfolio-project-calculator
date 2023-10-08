const inputField = document.querySelector('#display');
let footerMode = document.querySelector('#calc-mode');
let footerShiftMode = document.querySelector('#shift-btn');
let currentExpression = '';
let displayedExpression = '';
let lastStackedExpression = '';
let lastStackedValue = '';
let enabled = true;

function togglePower() {
  const powerButton = document.querySelectorAll('.head-button')[1];
  enabled = !enabled;
  if (!enabled) {
    inputField.value = 'Sleeping... Wake me wen you need me...';
    powerButton.style.backgroundColor = '#DC143C';
    powerButton.textContent = "Wake"
  } else {
    inputField.value = '0';
    powerButton.style.backgroundColor = 'white';
    powerButton.textContent = "Off/On"
  }
}

function addToDisplay(value) {
  if (!enabled) return;
  let backendValue = value;

  if (value === "÷") {
    backendValue = "/";
  } else if (value === "×") {
    backendValue = "*";
  } else if (value === "π") {
    backendValue = 'PI(anyArg)';
  }

  currentExpression += backendValue;
  displayedExpression += value;

  // handle displayedValue for keyboard keys
  if (displayedExpression.includes('*')) {
    displayedExpression = displayedExpression.replace('*', '×');
  } else if (displayedExpression.includes('/')) {
    displayedExpression = displayedExpression.replace('/', '÷');
  }
  inputField.value = displayedExpression;
}

function deleteLastCharacter() {
  if (!enabled) return;

  currentExpression = currentExpression.slice(0, -1);
  displayedExpression = displayedExpression.slice(0, -1);
  inputField.value = displayedExpression;
}

function clearScreen() {
  if (!enabled) return;

  currentExpression = '';
  displayedExpression = '';
  inputField.value = '0';
}

function calculate() {
  if (!enabled) return;

  const mode = footerMode.textContent;
  lastStackedExpression = currentExpression;
  const expression = encodeURIComponent(currentExpression).replace('%5E', '').trim();

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
      throw Error(`Division By Zero: ${error}`);
    });
  clearScreen();
}

function lastOperationExpression() {
  displayedExpression = '';
  if (!enabled) return;

  if (currentExpression === '') {
    currentExpression = lastStackedExpression;
  } else {
    currentExpression += lastStackedExpression;
  }
  displayedExpression = currentExpression;
  if (displayedExpression.includes('PI(anyArg)')) {
    displayedExpression = displayedExpression.replace('PI(anyArg)', 'π');
  }
  inputField.value = displayedExpression;
}

function lastOperationValue() {
  if (!enabled) return;

  if (currentExpression === '') {
    currentExpression = lastStackedValue;
  } else {
    currentExpression += lastStackedValue;
  }
  inputField.value = currentExpression;
}

function toggleMode() {
  if (!enabled) return;

  const defaultt = "Rad";
  if (footerMode.textContent === defaultt) {
    footerMode.textContent = "Deg";
  } else {
    footerMode.textContent = defaultt;
  }
}

function toggleShiftMode() {
  if (!enabled) return;

  const buttonsToModify = document.querySelectorAll('.comp-operator');
  const shiftedButtons = [];
  displayedExpression = "";
  temp = "";

  const defaultButtonsLabel = {
    'sin': 'asin',
    'cos': 'acos',
    'tan': 'atan',
    'sq': 'sqrt',
    'cb': 'cbrt',
    'log': '10^',
    'In': 'e^',
    'logb': 'b^',
  };

  const customButtonsLabel = {
    'asin': 'sin',
    'acos': 'cos',
    'atan': 'tan',
    'sqrt': 'sq',
    'cbrt': 'cb',
    '10^': 'log',
    'e^': 'In',
    'b^': 'logb',
  };

  const styles = {
    color: "white",
    backgroundColor: "#0F52BA",
  };

  buttonsToModify.forEach((button) => {
    const html = button.innerHTML;
    let originalLabel, shiftedLabel;

    if (defaultButtonsLabel.hasOwnProperty(html)) {
      originalLabel = html;
      shiftedLabel = defaultButtonsLabel[html];
      button.innerHTML = shiftedLabel;
      Object.assign(button.style, styles);
      footerShiftMode.textContent = "shift";

      button.addEventListener('click', () => {
        const index = currentExpression.lastIndexOf(originalLabel);
        if (index >= 0) {
          temp = currentExpression.slice(0, index) + shiftedLabel + currentExpression.slice(index + originalLabel.length);
          currentExpression = temp;
          displayedExpression = currentExpression;
        } else {
          currentExpression += shiftedLabel;
          displayedExpression = currentExpression;
        }
        inputField.value = displayedExpression;
      });
    } else if (customButtonsLabel.hasOwnProperty(html)) {
      originalLabel = html;
      shiftedLabel = customButtonsLabel[html];
      button.innerHTML = shiftedLabel;
      button.style.backgroundColor = "";
      footerShiftMode.textContent = "";

      button.addEventListener('click', () => {
        const index = currentExpression.lastIndexOf(originalLabel);
        if (index >= 0) {
          temp = currentExpression.slice(0, index) + shiftedLabel + currentExpression.slice(index + originalLabel.length);
          currentExpression = temp;
          displayedExpression = currentExpression;
        } else {
          currentExpression += shiftedLabel;
          displayedExpression = currentExpression;
        }
        inputField.value = displayedExpression;
      });
    }

    shiftedButtons.push({
      button: button,
      originalLabel: originalLabel,
      shiftedLabel: shiftedLabel,
    });
  });
  return shiftedButtons;
}

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('keydown', (event) => {
    const keyPressed = event.key;
    const excludedKeys = ['Shift', 'Control', 'CapsLock'];

    if (!excludedKeys.includes(keyPressed)) {
      if (keyPressed === "Backspace") {
        deleteLastCharacter();
      } else if (keyPressed === 'C') {
        clearScreen();
      } else if (keyPressed === 'Enter') {
        calculate();
      } else if (keyPressed === 'Escape') {
        togglePower();
      } else if (keyPressed === 'M') {
        toggleMode();
      } else if (keyPressed === 'S') {
        toggleShiftMode();
      } else if (keyPressed === 'H') {
        lastOperationExpression();
      } else if (keyPressed === 'A') {
        lastOperationValue();
      } else {
        addToDisplay(keyPressed);
      }
    }
  });
  inputField.focus();
});
