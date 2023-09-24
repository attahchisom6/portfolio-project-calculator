const inputField = document.querySelector('#display');
let footerMode = document.querySelector('#calc-mode');
let footerShiftMode = document.querySelector('#shift-btn');
let currentExpression = '';
let displayedExpression = '';
let lastStackedExpression = '';
let lastStackedValue = '';

function addToDisplay(value) {
  let backendValue = value;

  if (value === "÷") {
    backendValue = "/";
  } else if (value === "×") {
    backendValue = "*";
  } else if (value[0] === "√") {
    backendValue = 'squareRootX';
  }

  const lastChars = currentExpression.slice(-value.length);
  if (lastChars !== value) {
    currentExpression += backendValue;
    displayedExpression += value;
    inputField.value = displayedExpression;
  }
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
      throw Error(`Division By Zero: ${error}`);
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
  const buttonsToModify = document.querySelectorAll('.comp-operator');
  const shiftedButton= [];

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
        addToDisplay(shiftedLabel);
      });

    } else if (customButtonsLabel.hasOwnProperty(html)) {
      originalLabel = html;
      shiftedLabel = customButtonsLabel[html];
      button.innerHTML = shiftedLabel;
      button.style.backgroundColor = "";
      footerShiftMode.textContent = "";

      button.removeEventListener('click');
      button.addEventListener('click', () => {
        addToDisplay(buttonLabel);
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
