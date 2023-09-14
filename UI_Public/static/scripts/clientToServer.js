const inputField = document.querySelector('#input-expression');
inputField.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const expression = inputField.value;
    // pass the expression to the server for evaluation
    // then handle the response from the server
    fetch(`/sum?expression=${ encodeURIComponent(expession) }`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.result);
    })
    .catch((error) => {
      console.error({ 'Error': error })
    })
  }
}
