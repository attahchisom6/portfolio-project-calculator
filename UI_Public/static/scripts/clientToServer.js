const inputField = document.querySelector('#display');
let footerMode = document.querySelector('#calc-mode');
let footerShiftMode = document.querySelector('#shift-btn');
let currentExpression = '';
let displayedExpression = '';
let lastStackedExpression = '';
let lastStackedValue = '';
let isShifted = false;

function addToDisplay(value) {
  let backendValue = value;

  if (value === "÷") {
    backendValue = "/";
  } else if (value === "×") {
    backendValue = "*";
  } else if (value[0] === "√") {
    // // const args = value.slice(1).split(' ')[0];
    backendValue = 'squareRootX';
  } /*else if (isShiftMode) {
    backendValue = getShiftedValue(value);
    console.log(backendValue);
  }*/

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

// Your existing code...

function toggleShiftMode() {
  const buttonsToModify = document.querySelectorAll('.comp-operator');

  const defaultButtonsLabel = {
    'sin': 'asin',
    'cos': 'acos',
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

  const styles = {
    color: "white",
    backgroundColor: "#0F52BA",
   }

  const shiftedButtons = Array.from(modifyButtons).map((button) {
    const hmtl = button.innerHTML;
    if (defaultButtonsLabel.hasOwnProperty(html)) {
      button.innerHTML = defaultButtonsLabel[html];
      Object.assign(button.style, styles);
      footerShiftMode.textContent = "shift";
      return {
        button: button,
        originalButtonLabel: html,
        shiftedButtonLabel: defaultButtonsLabel[html],
        isShifted: true;
      }
    } else if (customButtonsLabel.hasOwnProperty(html)) {
      button.innerHTML = customButtonsLabel[html];
      button.style.backgroundColor = "";
      footerShiftMode.textContent = "";
      return {
        button: button,
        originalButtonLabel: html,
        shiftedButtonLabel: customButtonsLabel[html],
        isShifted: true,
      }
    }
    return {
      button: button,
      originalButtonsLabel; html,
      shiftedButtonsLabel: html,
      isShifted: false,
    }
  });
  return shiftedButtons;
}

// Add an event listener to the shift button
document.querySelector('#shift-btn').addEventListener('click', toggleShiftMode);
