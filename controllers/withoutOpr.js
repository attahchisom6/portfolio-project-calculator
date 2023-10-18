const trigFunctions = ["sin", "cos", "tan",  "cosec", "sec", "cot", "asin", "acos", "atan", "PI(anyArg)", 'log', 'In'];

function isFloatParsable(num) {
  if (num === '') {
    return false;
  }
  return !isNaN(parseFloat(num));
}

function getFloatPrev(arg) {
  if (!trigFunctions.some((func) => arg.includes(func))) {
    return arg;
  }

  let expr = arg
  const piRegex = /(\d*)PI\(([^)]+)\)/g;
  expr = expr.replace(piRegex, (match, coeff, argument) => {
    coeff = coeff ? `${coeff}*` : "";
    return `${coeff}PI(${argument})`;
  });

  for (const func of trigFunctions) {
    const regex = new RegExp('(\\d+)' + func, 'g');
    expr = expr.replace(regex, `$1*${func}`);
  }
  return expr;
}

function getFloatNext(arg) {
  // Check if the input argument contains any trigonometric functions, and just return the arg if does not
  if (!trigFunctions.some((func) => arg.includes(func))) {
    return arg;
  }

  let expr = arg;
  for (const func of trigFunctions) {
    const regex = new RegExp(func + '(\\d+)', 'g');
    expr = expr.replace(regex, `${func}($1)`);
  }
  return expr;
}

function handleOperationWithoutOperator(expression) {
  let expr;
  expr = getFloatPrev(expression);
  if (expr) {
    expr = getFloatNext(expr);
  }
  return expr;
}

// module.exports = handleOperationWithoutOperator;
export default handleOperationWithoutOperator;
