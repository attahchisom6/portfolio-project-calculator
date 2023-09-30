function handleOperationWithoutOperator(expression) {
  const funcs = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'sec', 'cot', 'coSec'];
  const splitCriteria = /([-+*/%])/;
  let refinedExpression = expression;
  const PREVS = [];
  const NEXTS = [];
  const OPERATORS = [];
  const ITEMS = [];
  const OTHERS = [];
  const OTHERS_OPERATORS = [];

  for (const item of funcs) {
    while (refinedExpression.includes(item)) {
      ITEMS.push(item);
      const itemIndex = refinedExpression.indexOf(item);
      let prevItem = refinedExpression.slice(0, itemIndex).split(splitCriteria);
      prevItem = prevItem[prevItem.length - 1].trim();

      if (isFloatParsable(prevItem)) {
        prevItem = prevItem + '*';
        PREVS.push(prevItem);
      } else {
        PREVS.push(prevItem);
      }

      let nextItem = refinedExpression.slice(itemIndex + item.length).split(splitCriteria)[0].trim();
      if (!/\((\w+)\)/.test(nextItem)) {
        nextItem = '(' + nextItem + ')';
        NEXTS.push(nextItem);
      } else {
        NEXTS.push(nextItem);
      }

      break;
    }
  }

  let p = 0;
  while (p < expression.length) {
    for (let k = 0; k < expression.length; k++) {
      if (splitCriteria.test(expression[k])) {
        OPERATORS.push(expression[k]);
      }
    }
    p += 1;
    break;
  }

  const expressionParts = refinedExpression.split(splitCriteria);
  for (let i = 0; i < expressionParts.length; i++) {
    const currentItem = expressionParts[i].trim();
    const prevItem = i > 0 ? expressionParts[i - 1].trim() : '';
    const nextItem = i < expressionParts.length - 1 ? expressionParts[i + 1].trim() : '';

    if (isFloatParsable(currentItem) &&
        (prevItem === '' || OPERATORS.includes(prevItem)) &&
        (nextItem === '' || OPERATORS.includes(nextItem))) {
      OTHERS.push(currentItem);
      if (OPERATORS.includes(nextItem)) {
        OTHERS_OPERATORS.push(nextItem);
      } else {
        OTHERS_OPERATORS.push('');
      }
    }
  }

  let newExpression = '';
  for (let i = 0; i < OPERATORS.length; i++) {
    if (PREVS[i]) newExpression += PREVS[i];
    if (ITEMS[i]) newExpression += ITEMS[i];
    if (NEXTS[i]) newExpression += NEXTS[i];
    newExpression += OPERATORS[i];
    if (OTHERS[i]) newExpression += OTHERS[i];
    if (OTHERS_OPERATORS[i]) newExpression += OTHERS_OPERATORS[i];
  }

  if (PREVS[PREVS.length - 1]) newExpression += PREVS[PREVS.length - 1];
  if (ITEMS[ITEMS.length - 1]) newExpression += ITEMS[ITEMS.length - 1];
  if (NEXTS[NEXTS.length - 1]) newExpression += NEXTS[NEXTS.length - 1];

  newExpression += OTHERS.slice(OPERATORS.length).join('');

  refinedExpression = refinedExpression.replace(/([+\-*/%])/g, ' $1 ').trim();
  return refinedExpression;
}

function isFloatParsable(num) {
  if (num === '') {
    return false;
  }
  return !isNaN(num);
}

module.exports = handleOperationWithoutOperator;
