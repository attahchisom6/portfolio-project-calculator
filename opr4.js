function handleOperationWithoutOperator(expression) {
  const funcs = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'sec', 'cot', 'coSec'];
  const splitCriteria = /([-+*/%])/;
  let refinedExpression = expression;

  for (const item of funcs) {
    while (refinedExpression.includes(item)) {
      const itemIndex = refinedExpression.indexOf(item);
      let prevItem = refinedExpression.slice(0, itemIndex).split(splitCriteria);
      prevItem = prevItem[prevItem.length - 1].trim();
      let nextItem = refinedExpression.slice(itemIndex + item.length).split(splitCriteria)[0];
      let operator = '';

      // Find the original operator between terms
      for (let i = itemIndex + item.length; i < refinedExpression.length; i++) {
        if (splitCriteria.test(refinedExpression[i])) {
          operator = refinedExpression[i];
          break;
        }
      }

      if (isFloatParsable(prevItem)) {
        prevItem = prevItem + '*';
      }

      if (!/\((\w+)\)/.test(nextItem)) {
        nextItem = '(' + nextItem + ')';
      }

      // Update refinedExpression with modified prevItem, item, nextItem, and original operator
      refinedExpression = refinedExpression.slice(0, itemIndex) + prevItem + item + nextItem + operator + refinedExpression.slice(itemIndex + item.length + nextItem.length + 1);
      break;
    }
  }

  // Format the refined expression with proper spacing
  refinedExpression = refinedExpression.replace(/([+\-*/%])/g, ' $1 ').trim();

  console.log('Refined Expression:', refinedExpression);
  return refinedExpression;
}

function isFloatParsable(num) {
  if (num === '') {
    return false;
  }
  return !isNaN(num);
}

module.exports = handleOperationWithoutOperator;
