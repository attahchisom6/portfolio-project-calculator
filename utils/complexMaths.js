/* import evaluateMathExpression from './elementaryMaths';
import Trig from './trig';
import Logarithms from './logarithms';*/

const { evaluateMathExpression } = require('./elementaryMaths');
const Trig = require('./trig');
const Logarithms = require('./logarithms');

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

String.prototype.replaceAsync = async function (regex, asyncFn) {
  const promises = [];
  this.replace(regex, (match, ...args) => {
    const promise = asyncFn(match, ...args);
    promises.push(promise);
  });
  const results = await Promise.all(promises);
  return this.replace(regex, () => results.shift());
};

async function evaluateTerm(match) {
  console.log("Matching:", match);

  const funcRegex = /(\w+)\s*\((.*)\)/g;
  const matchRegex = /(\w+)\(([\s\S]*)\)/g;
;
  let [, funcName, args] = match.match(/(\w+)\(([\s\S]*)\)/);

  console.log("Function Name:", funcName);
  console.log("Arguments:", args);

  let recursiveResult = args;
  console.log("initial recursiveResult", recursiveResult);

  // Recursive loop to evaluate nested expressions
  while (funcRegex.test(recursiveResult)) {
    recursiveResult = await recursiveResult.replaceAsync(funcRegex, async (nestedMatch) => {
      console.log("nested match", nestedMatch);
      return await evaluateTerm(nestedMatch);
      // Recursively evaluate nested expressions
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
        // recursiveResult = recursiveResult;
        continue;
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
  }
}

async function refineExpression(expression) {
  const funcRegex = /(\w+)\s*\((.*)\)/g;
  const RESULT = [];
  let result, expr = '';
  const matchRegex = /(\w+)\(([^()]+)\)/g;
  const matchArray = expression.match(matchRegex);
  console.log('Match Array:', matchArray);
  let matchResult, k = 0;

  while (funcRegex.test(expression)) {
    expression = expression.replaceAsync(funcRegex, async (match) => {
      result = await evaluateTerm(match);
      RESULT.push(result);
      return result.toString();
    });
  }
  console.log(RESULT);
  return expression;
}

function isFloatParsable(num) {
  if (num === '') {
    return false;
  }
  return !isNaN(parseFloat(num));
}

function completeBracket(expr) {
  let count = 0;
  if (!expr) {
    return count;
  }
  for (const char of expr) {
    if (char === '(') {
      count++;
    } else if (char === ')') {
      count--;
    }
  }
  return Math.abs(count);
}

async function reviewedExpression(input) {
  // Regular expression to match function calls at the beginning of the input
  const functionRegex = /^([a-z]+)\(([^)]+)\)/i;
  let arg;
  if (isFloatParsable(input) || isFloatParsable(input.slice(1))) {
    arg = input;
    return arg;
  }
  // Regular expression to match numbers at the beginning of the input
  const numberRegex = /^-?\d+(\.\d+)?/;

  let remainingInput = input.trim();
  let result = '';
  let nestedCount = 0;

  // Loop until there is no remaining input
  while (remainingInput.length > 0) {
    let match;
    // Check if the remaining input starts with a function call
    if ((match = remainingInput.match(functionRegex)) !== null) {
      // Extract the function and its arguments
      const functionName = match[1];
      let argumentsStr = match[2];

      nestedCount = completeBracket(argumentsStr);
      console.log('nested count:', nestedCount);
      argumentsStr += ')'.repeat(nestedCount);
      // arg = argumentsStr;
      console.log('functionName:', functionName);
      console.log('argumements:', argumentsStr);
      // Evaluate the function and append it to the result
      const  argExpr = `${functionName}(${argumentsStr})`;
      try {
        result += await refineExpression(argExpr);
      } catch (error) {
        console.error('An error here:', error);
        result = argExpr;
      }
    } else if ((match = remainingInput.match(numberRegex)) !== null) {
      // Extract the number and append it to the result
      result += match[0];
    } else {
      // if neither function or number, break the loop
      break;
    }

    // Remove the processed part from the input
    remainingInput = remainingInput.slice(match[0].length).trim();
    // If there is more input, append the operator to the result
    if (remainingInput.length > 0) {
      result += remainingInput[0];
      // Remove the operator from the input
      remainingInput = remainingInput.slice(1).trim();
    }

    result = result.split(/([-+*/%])/).map((arg) => arg.trim()).join(' ')
    input = input.split(/([-+*/%])/).map((arg) => arg.trim()).join(' ')
    if (input.length === result.length) {
      console.log('input and result has the same length');
      console.log(`input: ${input}, inputLength: ${input.length}`);
      console.log(`result: ${result}, resultLength: ${result.length}`);
    } else if (input.length - result.length > 0) {
      console.log("uneven length of result and input");
      /*nestedCount = completeBracket(result);
      console.log('another nestedCount:', nestedCount);
      let rem = result;
      const len = rem.length;
      if (nestedCount > 0) {
        result = result.slice(0, len - nestedCount);
        console.log('another modified result:', result);
      }*/
      console.log(`input: ${input}, inputLength: ${input.length}`);
      console.log(`result: ${result}, resultLength: ${result.length}`);
      remainingInput = input.toString().slice(result.length);
      let remainingResult = evaluateTerm(remainingInput);
      arg = await reviewedExpression(remainingResult);
      console.log('new result:', arg);
    }
  }
  result = result + arg;
  return result;
}

async function evaluateComplexMathExpression(expression) {
  expression = await reviewedExpression(expression);
  return await evaluateMathExpression(expression);
}

module.exports = { evaluateComplexMathExpression };

// export default evaluateComplexMathExpression;
