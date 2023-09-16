const inputField = document.querySelector('#display');
let footerMode = document.querySelector('#calc-mode'); // Fix variable selection
let currentExpression = '';
let addValue = '';

function addToDisplay(value) {
  if (value === "÷") {
    value = "/";
  } else if (value === "×") {
    value = "*";
  } else if (value === "Ans") {
    currentExpression += addValue;
  } else {
    currentExpression += value;
  }
  inputField.value = currentExpression;
}

function deleteLastCharacter() {
  currentExpression = currentExpression.slice(0, -1);
  inputField.value = currentExpression;
}

function clearScreen() {
  currentExpression = '';
  inputField.value = currentExpression;
}

function lastOperationValue() {
  const expression = encodeURIComponent(currentExpression);
  fetch(`/basicCalc?expression=${expression}`)
    .then((response) => response.json())
    .then((data) => {
      if (data !== undefined) {
        addValue += data.result;
      } else {
        addValue += "Error: Division by zero";
      }
      inputField.value = addValue;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function calculate() {
  // Remove event listener from here
  const expression = encodeURIComponent(currentExpression);
  fetch(`/basic-calc?expression=${expression}`)
    .then((response) => response.json())
    .then((data) => {
      if (data !== undefined) {
        inputField.value = data.result;
      } else {
        inputField.value = "Error: Division by zero";
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });  
}

function toggleMode() { // Fix syntax error here
  const defaultt = "Mode: Radians";
  if (footerMode.textContent === defaultt) {
    footerMode.textContent = "Mode: Degree";
  } else {
    footerMode.textContent = defaultt;
  }
}
