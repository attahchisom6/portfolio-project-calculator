const inputField = document.querySelector('#display');
let footerMode = document.querySelector('#calc-mode');
let footerShiftMode = document.querySelector('#shift-btn');
let currentExpression = '';
let displayedExpression = '';
let lastStackedExpression = '';
let lastStackedValue = '';

/*function addToDisplay(value) {
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
  inputField.value = displayedExpression;
}

function deleteLastCharacter() {
  currentExpression = currentExpression.slice(0, -1);
  displayedExpression = displayedExpression.slice(0, -1);
  inputField.value = displayedExpression;
}*/

function addToDisplay(value) {
    let backendValue = value;

    if (value === "÷") {
        backendValue = "/";
    } else if (value === "×") {
        backendValue = "*";
    } else if (value === "π") {
        backendValue = 'PI(anyArg)';
    }

    // Check if the last character is an operator
    const lastChar = currentExpression.slice(-1);
    const operators = ['+', '-', '*', '/'];

    if (operators.includes(lastChar) && operators.includes(backendValue)) {
        // If the last character and the new value are both operators, replace the last operator
        currentExpression = currentExpression.slice(0, -1) + backendValue;
        displayedExpression = displayedExpression.slice(0, -1) + value;
    } else {
        // If not, simply concatenate the new value
        currentExpression += backendValue;
        displayedExpression += value;
    }

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


// Add event listener for keydown events on the document
document.addEventListener("keydown", function(event) {
    // Get the key code of the pressed key
    const keyCode = event.keyCode;

    // Define key codes for calculator functions
    const keyMappings = {
        "48": "0", "49": "1", "50": "2", "51": "3", "52": "4", "53": "5", "54": "6", "55": "7", "56": "8", "57": "9", // Numbers 0-9
        "67": "c", // "C" for clear
        "13": "Enter", // Enter key for calculation
        "8": "Backspace" // Backspace key for deletion
        // Add more key codes as needed
    };

    // Check if the pressed key is in the keyMappings
    if (keyMappings.hasOwnProperty(keyCode.toString())) {
        const key = keyMappings[keyCode.toString()];

        // Call the corresponding calculator function based on the pressed key
        if (key === "Enter") {
            calculate();
        } else if (key === "Backspace") {
            deleteLastCharacter();
        } else if (key === "c") {
            clearScreen();
        } else {
            // Call the addToDisplay function with the corresponding key value
            addToDisplay(key);
        }

        // Prevent default behavior for the pressed key
        event.preventDefault();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    inputField.focus();
});

