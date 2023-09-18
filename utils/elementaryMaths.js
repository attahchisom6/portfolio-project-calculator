class ElemMaths {
  static async sum(...params) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let sum = 0;
        for (let k = 0; k < params.length; k++) {
          sum += params[k];
        }
        resolve(sum);
      }, 0);
    });
  }

  static async sub(...params) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let sub = params[0];
        for (let k = 1; k < params.length; k++) {
          sub -= params[k];
        }
        resolve(sub);
      }, 0);
    });
  }

  static async mul(...params) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let mul = 1;
        for (let k = 0; k < params.length; k++) {
          mul *= params[k];
        }
        resolve(mul);
      }, 0);
    });
  }

  static async div(num, div) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (div === 0) {
          reject(new Error("Division by zero"));
        } else {
          const result = num / div;
          const precisionFactor = Math.pow(10, 10);
          resolve(Math.round(result * precisionFactor) / precisionFactor);
        }
      }, 0);
    });
  }

  static async mod(num, modulo) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (modulo === 0) {
          reject(new Error("Modulo by zero"));
        } else {
          resolve(num % modulo);
        }
      }, 0);
    });
  }
}

async function evaluateMathExpression(expression) {
  try {
    const splitCriteria = /([-+*()/%])/;
    const terms = expression.split(splitCriteria);
    const refinedTerms = terms.map((term) => term.trim()).filter(Boolean);

    let operators = [];
    let operands = [];

    for (let term of refinedTerms) {
      if (term === "(") {
        operators.push(term);
      } else if (term === ")") {
        while (operators.length && operators[operators.length - 1] !== "(") {
          const operator = operators.pop();
          const operand2 = operands.pop();
          const operand1 = operands.pop();
          operands.push(await applyOperator(operator, operand1, operand2));
        }
        operators.pop(); // Remove the "("
      } else if (["+", "-", "*", "/", "%"].includes(term)) {
        while (
          operators.length &&
          precedence(operators[operators.length - 1]) >= precedence(term)
        ) {
          const operator = operators.pop();
          const operand2 = operands.pop();
          const operand1 = operands.pop();
          operands.push(await applyOperator(operator, operand1, operand2));
        }
        //makes sure operations of lower precedence are handled later
        operators.push(term);
      } else {
        operands.push(parseFloat(term));
      }
    }

    while (operators.length > 0) {
      const operator = operators.pop();
      const operand2 = operands.pop();
      const operand1 = operands.pop();
      operands.push(await applyOperator(operator, operand1, operand2));
    }

    return operands[0];
  } catch (error) {
    throw error;
  }
}

async function applyOperator(operator, operand1, operand2) {
  switch (operator) {
    case "+":
      return await ElemMaths.sum(operand1, operand2);
    case "-":
      return await ElemMaths.sub(operand1, operand2);
    case "*":
      return await ElemMaths.mul(operand1, operand2);
    case "/":
      return await ElemMaths.div(operand1, operand2);
    case "%":
      return await ElemMaths.mod(operand1, operand2);
    default:
      throw new Error("Invalid operator");
  }
}

function precedence(operator) {
  switch (operator) {
    case "+":
    case "-":
      return 1;
    case "*":
    case "/":
    case "%":
      return 2;
    default:
      return 0;
  }
}

module.exports = { ElemMaths, evaluateMathExpression };

// export default evaluateMathExpression;
