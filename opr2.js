function handleOperationWithoutOperator(expression) {
  const funcs = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'sec', 'cot', 'coSec'];
  const funcRegex = new RegExp(`(${funcs.join('|')})\\(`);
  const splitCriteria = /([-+*/%])/;

  while (expression) {
    const match = expression.match(funcRegex);
    if (match) {
      const item = match[1];
      const itemIndex = expression.indexOf(item);
      let prevItem = expression.slice(0, itemIndex).split(splitCriteria);
      prevItem = prevItem[prevItem.length - 1].trim();
      let nextItem = expression.slice(itemIndex + item.length).split(splitCriteria)[0].replace(/\(/g, '');

      // Modify prevItem and nextItem as needed
      if (isFloatParsable(prevItem)) {
        prevItem = prevItem + '*';
      }
      if (!/\((\w+)\)/.test(nextItem)) {
        nextItem = '(' + nextItem + ')';
      }

      // Construct the modified term
      const modifiedTerm = prevItem + item + nextItem;

      // Replace the matched term in the expression with the modified term
      expression = expression.slice(0, itemIndex) + modifiedTerm + expression.slice(itemIndex + item.length);

    } else {
      // If no match is found, break the loop
      break;
    }
  }

  console.log('Modified Expression:', expression);
  return expression;
}

function isFloatParsable(num) {
  return !isNaN(num);
}

module.exports = handleOperationWithoutOperator;
