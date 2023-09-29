function handleOperationWithoutOperator(expression) {
  const funcs = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'sec', 'cot', 'coSec'];
  const funcRegex = new RegExp(`(${funcs.join('|')})\\(`, 'g');
  const splitCriteria = /([-+*/%])/;

  expression = expression.replace(funcRegex, match => {
    const item = match.substring(0, match.length - 1);
    const itemIndex = expression.indexOf(match);
    let prevItem = expression.slice(0, itemIndex).split(splitCriteria);
    prevItem = prevItem[prevItem.length - 1].trim();
    let nextItem = expression.slice(itemIndex + match.length).split(splitCriteria)[0].replace(/\(/g, '');

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
    expression = expression.slice(0, itemIndex) + modifiedTerm + expression.slice(itemIndex + match.length);

    return '';
  });

  console.log('Modified Expression:', expression);
  return expression;
}

function isFloatParsable(num) {
  return !isNaN(num);
}

module.exports = handleOperationWithoutOperator;
