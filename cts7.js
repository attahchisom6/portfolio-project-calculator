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
  const shiftedButtons = [];

  const defaultButtonsLabel = {
    'sin': 'asin',
    'cos': 'acos',
    'tan': 'atan',
    'x<sup>2</sup>': '√',
    'x<sup>3</sup>': '<span class="sqrt3">3</span>√',
    'log': '10<sup>x</sup>',
    'In': 'e<sup>x</sup>',
    'logb': 'b<sup>y</sup>',
  };

  const customButtonsLabel = {
    'asin': 'sin',
    'acos': 'cos',
    'atan': 'tan',
    '√': 'x<sup>2</sup>',
    '<span class="sqrt3">3</span>√': 'x<sup>3</sup>', // Use a class to style the '3'
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
        const index = currentExpression.lastIndexOf(originalLabel);
        if (index >= 0) {
          currentExpression = currentExpression.slice(0, index) + shiftedLabel + currentExpression.slice(index + originalLabel.length);
        } else {
          currentExpression += shiftLabel;
        }
        inputField.value = currentExpression;
      });

    } else if (customButtonsLabel.hasOwnProperty(html)) {
      originalLabel = html;
      shiftedLabel = customButtonsLabel[html];
      button.innerHTML = shiftedLabel;
      button.style.backgroundColor = "";
      footerShiftMode.textContent = "";

      // button.removeEventListener('click');
      button.addEventListener('click', () => {
        const index = currentExpression.lastIndexOf(originalLabel);
        if (index >= 0) {
          currentExpression = currentExpression.slice(0, index) + shiftedLabel + currentExpression.slice(index + originalLabel.length);
        } else {
          currentExpression += shiftedLabel;
        };
        inputField.value = currentExpression;
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

/*function handleOperationWithoutOperator(value) {
  const funcs = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'sec', 'cot'];
  let parsedExpression = '';

  for (const item of funcs) {
    if (value.includes(item)) {
      if (value.lastIndexOf(item) === 0) {
        let L = value.split(item);
        L[1] = L[1].trim();
        if (!L[1].match(/\(.+\)/)) {
          L[1] = '(' + L[1] + ')';
        }
        parsedExpression = item + L[1];
      } else if (value.lastIndexOf(item) > 0) {
        let L = value.split(item);
        L[1] = L[1].trim();
        if (!L[1].match(/\(.+\)/)) {
          L[1] = '(' + L[1] + ')';
        }
        parsedExpression = L[0] + '*' + item + L[1];
      } else {
        parsedExpression = value;
      }
    } else {
      parsedExpression = value;
    }
  }
  return parsedExpression;
}*/
