// import evalateMathExpression from './utils/elementaryMaths'
// import Trig from './utils/elementaryMaths';
// import { Logarithms as loga } from './utils/elementaryMaths';
const { evaluateMathExpression } =  require('./elementaryMaths');
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
        // negative numbers with even nroot have no root in R (real numbers)
        if (num < 0 && nroot % 2 === 0) {
          reject(new Error(`${num} has no ${nroot}th root in R`));
        }

        // Division by zero
        if (num === 0 && nroot < 0) {
          reject(new Error('Division By Zero'));
        }

        if (num < 0 && nroot % 2 !== 0) {
          resolve(-Math.pow(-num, 1 / nroot));
        }

        // handle other cases
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
  'In': loga.In,
  'log10': loga.log10,
  'log': loga.log,
  'antilogIn': loga.antilogIn,
  'antilog10': loga.antilog10,
  'antilog': loga.antilog,
};

const powerFuncs = {
  'squareX': complexMaths.squareX,
  'cubeX': complexMaths.cubeX,
  'exponent': complexMaths.exponent,
  'squareRootX': complexMaths.squareRootX,
  'cubeRootX': complexMaths.cubeRootX,
  'nRoot': complexMaths.nRoot,
};

const otherFuncs = { 'absX': complexMaths.absX };

async function refineExpression(expression) {
  const funcRegex = /(\w+)\s*\(([^)]+)\)/g;

  async function evaluateTerm(match) {
    console.log("Matching:", match);

    const funcName = match.split('(')[0];
    const args = match.split('(')[1].slice(0, -1);

    console.log("Function Name:", funcName);
    console.log("Arguments:", args);

    let recursiveResult = args; // Initialize with the argument string

    // Recursive loop to evaluate nested expressions
    while (funcRegex.test(recursiveResult)) {
      recursiveResult = await recursiveResult.replaceAsync(funcRegex, async (match) => {
        console.log(match);
        return await evaluateTerm(match); // Recursively evaluate nested expressions
      });
    }
    console.log("These are the recursive result:", recursiveResult);
    
    // function to handle wen the subexpression contains only number
    async isSubExprNum(recursiveResult) {
        const splitField = recursiveResult.split(/([-+*/()%])/).map((term) => term.trim()).filter(Boolean);
        console.log(splitField);
        let expr = "";
        for (k = 0; k < splitField.length; k += 2) {
        const numList = [];

        const operand = splitField[k];
        const operator = splitField[k + 1];
        if (!parseFloat(operand)) {
          continue;
      } else {
        numList.push(operand);
      }
      expr = numlist.join(operator);
    }

    co

    if (funcName in trigFuncs) {
      try {
        const result = await trigFuncs[funcName](...recursiveResult.split(',').map(arg => parseFloat(arg.trim())));
        console.log("Result:", result);
        return result;
      } catch (error) {
        console.log("Error in trigFuncs:", error);
        throw new Error(`${funcName}(${args})`);
      }
    } else if (funcName in logFuncs) {
      try {
        const result = await logFuncs[funcName](parseFloat(await recursiveResult));
        console.log(`logFuncs[funcName](parseFloat(await ${recursiveResult}))`);
        console.log("Result:", result);
        return result.toString();
      } catch (error) {
        console.log("Error in logFuncs:", error);
        return `${funcName}(${await recursiveResult})`;
      }
    } else if (funcName in powerFuncs) {
      try {
        const result = await powerFuncs[funcName](parseFloat(await recursiveResult));
        console.log("Result:", result);
        return result.toString();
      } catch (error) {
        console.log("Error in powerFuncsFuncs:", error);
        return `${funcName}(${await recursiveResult})`;
      }
    } else if (funcName in otherFuncs) {
      try {
        const result = await otherFuncs[funcName](parseFloat(await recursiveResult));
        console.log("Result:", result);
        return result.toString();
      } catch (error) {
        console.log("Error in othetFuncs:", error);
        return `${funcName}(${await recursiveResult})`;
      }
    }
  }

  // Use regex with 'g' flag to find and replace all function calls with their results
  while (funcRegex.test(expression)) {
    expression = await expression.replaceAsync(funcRegex, async (match) => {
      const result = await evaluateTerm(match);
      return result.toString(); // Convert the result back to a string
    });
  }

  return expression;
}

// This polyfill enables replaceAsync for older Node.js versions
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
