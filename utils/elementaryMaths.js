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
    const terms = expression.split(splitCriteria);
    const refinedTerms = terms.map((term) => term.trim()).filter(Boolean);

    let result = parseFloat(refinedTerms[0]);
    let hasParentheses = false;

    for (let k = 1; k < refinedTerms.length; k += 2) {
      const operator = refinedTerms[k];
      const operand = parseFloat(refinedTerms[k + 1]);

      switch (operator) {
        case "(":
          hasParentheses = true;
          break;
        case ")":
          hasParentheses = false;
          break;
        case "/":
          if (hasParentheses) {
            const endIndex = refinedTerms.indexOf(")", k + 1);
            if (endIndex === -1) {
              throw new Error("Error: Unmatched parentheses");
            }
            const subExpression = refinedTerms.slice(k + 2, endIndex).join("");
            const subResult = evaluateMathExpression(subExpression);
            result = ElemMaths.div(result, subResult);
            k = endIndex;
          } else {
            result = ElemMaths.div(result, operand);
          }
          break;
        case "*":
          if (hasParentheses) {
            const endIndex = refinedTerms.indexOf(")", k + 1);
            if (endIndex === -1) {
              throw new Error("Error: Unmatched parentheses");
            }
            const subExpression = refinedTerms.slice(k + 2, endIndex).join("");
            const subResult = evaluateMathExpression(subExpression);
            result = ElemMaths.mul(result, subResult);
            k = endIndex;
          } else {
            result = ElemMaths.mul(result, operand);
          }
          break;
        case "+":
          result = ElemMaths.sum(result, operand);
          break;
        case "-":
          result = ElemMaths.sub(result, operand);
          break;
        default:
          throw new Error("Error: Invalid operand");
          break;
      }
    }

    return result;
  } catch (error) {
    throw new Error("Error: " + error.message);
  }
}

module.exports = { ElemMaths, evaluateMathExpression };
