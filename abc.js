class ElemMaths {
  static sum(...params) {
    let sum = 0;
    for (let k = 0; k < params.length; k++) {
      sum += params[k];
    }
    return sum;
  }

  static sub(...params) {
    let sub = params[0];
    for (let k = 1; k < params.length; k++) {
      sub -= params[k];
    }
    return sub;
  }

  static mul(...params) {
    let mul = 1;
    for (let k  = 0; k < params.length; k++) {
      mul *= params[k];
    }
    return mul;
  }

  static div(num, div) {
    if (div === 0) {
      return undefined;
    }
    const result =  num / div;
    const precisionFactor = Math.pow(10, 10);
      return Math.round(result * precisionFactor) / precisionFactor;
  }

  static mod(num, modulo) {
    if (modulo === 0) {
      return undefined;
    }
    return num % modulo;
  }

}

function evaluateMathExpression(expression) {
  try {
    const splitCriteria = /([-+*/%])/;

    // get terms by spliting with thevoperator
    const terms = expression.split(splitCriteria);
    // remove any whitespace(tab, space, newline
    const refinedTerm = terms.map((term) => term.trim()).filter(Boolean);

    // initalize result as the first term in the refinedTerm array
    let result = parseFloat(refinedTerm[0]);

    for (let k = 1; k < refinedTerm.length; k += 2) {
      const operator = refinedTerm[k];
      const operand = parseFloat(refinedTerm[k + 1]);

      switch (operator) {
        case "+":
          result = ElemMaths.sum(result, operand);
          break;
        case "-":
          result = ElemMaths.sub(result, operand);
          break;
        case "*":
          result = ElemMaths.mul(result, operand);
          break;
        case "/":
          result = ElemMaths.div(result, operand);
          break;
        case "%":
          result = ElemMaths.mod(result, operand);
          break;
        default:
          throw new Error( "Error: Invalid operand");
          break;
      }
    }
    return result;
  } catch (error) {
    throw new Error("Error:", error);
  }
}

module.exports = { ElemMaths, evaluateMathExpression }
