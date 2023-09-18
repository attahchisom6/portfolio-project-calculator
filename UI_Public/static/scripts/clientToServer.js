const inputField = document.querySelector('#display');
let footerMode = document.querySelector('#calc-mode'); // Fix variable selection
let currentExpression = '';
let displayedExpression = '';
let lastStackedValue = '';

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
  const expression = encodeURIComponent(currentExpression);
  fetch(`/basicCalc?expression=${expression}`)
  .then((response) => response.json())
  .then((data) => {
    try {
      inputField.value = data.result;
      lastStackedValue = data.result;
    } catch(error) {
      console.error(error);
      inputField.value = `Division By Zero: ${ error }`;
    }
  })
  .catch((error) => {
    console.error("Error:", error);
    throw Error("Division By Zero:", error);;
  });
  clearScreen();
}

function lastOperationValue() {
  if (currentExpression === '') {
    currentExpression = lastStackedValue;
  } else {
    currentExpression += lastStackedValue;
  }
  inputField.value = currentExpression;
}

function toggleMode() { // Fix syntax error here
  const defaultt = "Rad";
  if (footerMode.textContent === defaultt) {
    footerMode.textContent = "Deg";
  } else {
    footerMode.textContent = defaultt;
  }
}
