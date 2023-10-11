/* import evaluateMathExpression from './elementaryMaths';
import Trig from './trig';
import Logarithms from './logarithms';*/

const { evaluateMathExpression } = require('./elementaryMaths');
const Trig = require('./trig');
const Logarithms = require('./logarithms');

const loga = Logarithms;

class complexMaths {
  static async squareX(x) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const num = parseFloat(x);
        resolve(num * num);
      }, 0);
    });
  }

  static async cubeX(x) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const num = parseFloat(x);
        resolve(num * num * num);
      }, 0);
    });
  }

  static async exponent(num, exp) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.pow(num, exp));
      }, 0);
    });
  }

  static async squareRootX(x) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const num = parseFloat(x);
        if (num < 0) {
          reject(new Error('Input cannot be negative'));
        }
        resolve(Math.sqrt(num));
      }, 0);
    });
  }

  static async cubeRootX(x) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.cbrt(x));
      }, 0);
    });
  }

  static async nRoot(num, nroot) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (num < 0 && nroot % 2 === 0) {
          reject(new Error(`${num} has no ${nroot}th root in R`));
        }

        if (num === 0 && nroot < 0) {
          reject(new Error('Division By Zero'));
        }

        if (num < 0 && nroot % 2 !== 0) {
          resolve(-Math.pow(-num, 1 / nroot));
        }

        resolve(Math.pow(num, 1 / nroot));
      }, 0);
    });
  }

  static async absX(x) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.abs(x));
      }, 0);
    });
  }

  static async π() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.PI);
      }, 0);
    });
  }

  static async factorial(num) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let result = 1;
        if (num <= 0) {
          result = 1;
        }
        let k = num;
        while (k > 0) {
          result *= k;
          k--;
        }
        resolve(result);
      }, 0);
    });
  }
}

const trigFuncs = {
  'sin': Trig.sine,
  'cos': Trig.cos,
  'tan': Trig.tan,
  'cosec': Trig.cosec,
  'sec': Trig.sec,
  'cot': Trig.cot,
  'asin': Trig.asin,
  'acos': Trig.acos,
  'atan': Trig.atan,
};

const logFuncs = {
  'In': Logarithms.In,
  'log': Logarithms.log,
  'logb': Logarithms.logb,
  'e': Logarithms.antilogIn,
  '10': Logarithms.antilog,
  'b': Logarithms.antilogb,
};

const powerFuncs = {
  'sq': complexMaths.squareX,
  'cb': complexMaths.cubeX,
  'exp': complexMaths.exponent,
  'sqrt': complexMaths.squareRootX,
  'cbrt': complexMaths.cubeRootX,
  'nRoot': complexMaths.nRoot,
};

const otherFuncs = {
  'abs': complexMaths.absX,
  'PI': complexMaths.π,
  'F': complexMaths.factorial,
}


async function refineExpression(expression) {
  const funcRegex = /(\w+)\s*\((.*)\)+/g;

  async function evaluateTerm(match) {
    console.log("Matching:", match);

    const matchRegex = /(\w+)\(([^()]+)\)/g;
    const matchArray = match.match(matchRegex);
    let matchResult, k = 0;
    while (k < matchArray.length) {
    matchResult = matchArray[k];
    console.log('match result:', matchResult);
    let [, funcName, args] = matchResult.match(/(\w+)\(([\s\s]*)\)/);

    console.log("Function Name:", funcName);
    console.log("Arguments:", args);

    let recursiveResult = args;
    console.log("initial recursiveResult", recursiveResult);

    // Recursive loop to evaluate nested expressions
    while (funcRegex.test(recursiveResult)) {
      recursiveResult = await recursiveResult.replaceAsync(funcRegex, async (nestedMatch) => {
        console.log("nested match", nestedMatch);
        return await evaluateTerm(nestedMatch); // Recursively evaluate nested expressions
      });
    }
    console.log("These are the recursive result:", recursiveResult);

    const isFloatParsable = (array) => {
      return array.every((item) => !isNaN(parseFloat(item)));
    }
    const splitField = [];
    let currentTerm = "";
    let parenCount = 0;

    for (const char of recursiveResult) {
      if (char === '(') {
        parenCount++;
      } else if (char === ')') {
        parenCount--;
      }

      if (parenCount === 0 && (char === '+' || char === '-' || char === '*' || char === '/' || char === '%' || char === '(' || char === ')')) {
        splitField.push(currentTerm.trim(), char);
        currentTerm = "";
      } else {
        currentTerm += char;
      }
    }
    splitField.push(currentTerm.trim());
    console.log("This is splitField", splitField);

    let expr = "";
    const exprList = [];
    const operators = [];

    for (let k = 0; k < splitField.length; k += 2) {
      const operand = splitField[k];
      let operator = splitField[k + 1];

      // set operor to seFlag here so we will ths expression does not include an operator
      if (!operator) {
        operator = 'setFlag';
      }
      exprList.push(operand);
      operators.push(operator);
      console.log("expList", exprList);
      console.log("operator List", operators);
    }

    if (isFloatParsable(exprList)) {
      expr = exprList[0];
      for (let k = 0; k < operators.length; k += 1) {
        if (operators[k] === "setFlag") {
          recursiveResult = recursiveResult;
          console.log('In this block one or mutiple float arguments were passed without an operator:', recursiveResult);
        } else {
          expr += operators[k] + exprList[k + 1];
          recursiveResult = await evaluateMathExpression(expr);
          console.log("arguments passed with operator:", recursiveResult);
        }
      }
      console.log('This is expr:', expr);
      console.log('When expr has only numbers, recursiveResult:', recursiveResult);
    } else {
      recursiveResult = recursiveResult;
      console.log("When expr has terms with a function call, recursiveResult are not numbers:", recursiveResult);
    }

    if (funcName in trigFuncs) {
      console.log('recursive result in trigFuncs:', recursiveResult);
      try {
        recursiveResult = recursiveResult.toString();
        const result = await (async () => {
          const argsArray = recursiveResult.split(',').map(arg => parseFloat(arg.trim()));
          if (argsArray.length === 1 && !isNaN(argsArray[0])) {
            return await trigFuncs[funcName](argsArray[0]);
          } else {
            return await trigFuncs[funcName](...argsArray);
          }
        })();

        console.log("Result:", result);
        return result;
      } catch (error) {
        console.log("Error in trigFuncs:", error);
        throw new Error(`${funcName}(${args})`);
      }
    } else if (funcName in logFuncs) {
      console.log('recursive result in logFuncs:', recursiveResult);
      try {
        recursiveResult = recursiveResult.toString();
        const result = await (async () => {
          const argsArray = recursiveResult.split(',').map((arg) => parseFloat(arg.trim()));
          if (argsArray.length === 1 && !isNaN(argsArray[0])) {
            return await logFuncs[funcName](argsArray[0]);
          } else {
            return await logFuncs[funcName](...argsArray);
          }
        })();

        console.log("Result:", result);
        return result;
      } catch (error) {
        console.log("Error in logFuncs:", error);
        throw new Error(`${funcName}(${args})`);
      }
    } else if (funcName in powerFuncs) {
      console.log('recursive result in powerFuncs:', recursiveResult);
      try {
        recursiveResult = recursiveResult.toString();
        const result = await (async () => {
          const argsArray = recursiveResult.split(',').map(arg => parseFloat(arg.trim()));
          if (argsArray.length === 1 && !isNaN(argsArray[0])) {
            return await powerFuncs[funcName](argsArray[0]);
          } else {
            return await powerFuncs[funcName](...argsArray);
          }
        })();

        console.log("Result:", result);
        return result;
      } catch (error) {
        console.log("Error in power Funcs:", error);
        throw new Error(`${funcName}(${args})`);
      }
    } else if (funcName in otherFuncs) {
      console.log(`recursive result in ${funcName}:`, recursiveResult);
      try {
        recursiveResult = recursiveResult.toString();
        const result = await (async () => {
          const argsArray = recursiveResult.split(',').map(arg => parseFloat(arg.trim()));
          if (argsArray.length === 1 && !isNaN(argsArray[0])) {
            return await otherFuncs[funcName](argsArray[0]);
          } else {
            return await otherFuncs[funcName](...argsArray);
          }
        })();

        console.log("Result:", result);
        return result;
      } catch (error) {
        console.log("Error in otherFuncs:", error);
        throw new Error(`${funcName}(${args})`);
      }
    } k++;
    }
  }

  while (funcRegex.test(expression)) {
    expression = await expression.replaceAsync(funcRegex, async (match) => {
      const result = await evaluateTerm(match);
      return result.toString();
    });
  }

  return expression;
}

String.prototype.replaceAsync = async function (regex, asyncFn) {
  const promises = [];
  this.replace(regex, (match, ...args) => {
    const promise = asyncFn(match, ...args);
    promises.push(promise);
  });
  const results = await Promise.all(promises);
  return this.replace(regex, () => results.shift());
};

async function evaluateComplexMathExpression(expression) {
  expression = await refineExpression(expression);
  return await evaluateMathExpression(expression);
}

module.exports = { evaluateComplexMathExpression, refineExpression, complexMaths };

// export default evaluateComplexMathExpression;
