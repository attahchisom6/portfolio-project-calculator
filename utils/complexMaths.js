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

async function evaluateComplexMathExpression(expression) {
  const funcRegex = /([a-zA-Z]+)\(([^)]+)\)/g;

  const result = expression.replace(funcRegex, (match, funcName, funcArgs) => {
    const parsedArgs = funcArgs.split(',').map(arg => arg.trim());
    const numericArgs = parsedArgs.map(arg => parseFloat(arg));

    if (funcName in trigFuncs) {
      const trigFunction = trigFuncs[funcName];
      return trigFunction(...numericArgs);
    } else if (funcName in logFuncs) {
      const logFunction = logFuncs[funcName];
      return logFunction(...numericArgs);
    } else if (funcName in powerFuncs) {
      const powerFunction = powerFuncs[funcName];
      return powerFunction(...numericArgs);
    } else if (funcName in otherFuncs) {
      const otherFunction = otherFuncs[funcName];
      return otherFunction(...numericArgs);
    }

    return match; // If the function name is not recognized, return the original match
  });

  return evaluateMathExpression(result);
}

console.log("log number:", trigFuncs["sin"](67));

module.exports = { evaluateComplexMathExpression , complexMaths};
