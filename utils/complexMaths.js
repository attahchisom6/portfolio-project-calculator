import evalateMathExpression from './utils/elementaryMaths'
import Trig from './utils/elementaryMaths';
import { Logarithms as loga } from './utils/elementaryMaths';

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

function evaluateComplexMathExpression(expression) {
  const splitCriteria = /([+-*/()%]/;
  const terms = expression.split(splitCriteria);
  const refinedTerms = terms.map((term) => term.trim()).filter(Boolean);
  let refinedExpression = '';
  let operators = [];

  const trigFuncs = {
    'sin': Trig.sin,
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
    'antilog'; loga.antilog,
  };

  const powerFuncs = {
    'squareX': complexMaths.squarex,
    'cubeX': complex.cubeX,
    'exponent': complexMaths.exponent,
    'squareRootX': complexMaths.squareRootX,
    'cubeRootX': complexMaths.cubeRootX,,
    'nRoot': complexMaths.nRoot,
  };

  const otherFuncs = [ 'absX' ]
  const rex = \\((.*?)\\);

  for (let term of refinedTerms) {
    // check for trigonometric function
    if (trigFuncs.includes(term) || logFuncs.includes(term)
      || powerFuncs.includes(term) || otherFuncs.includes(term)) {
      const regex = new RegExp(`${term}${rex}`, 'g');
      const matches = expression.match(regex);
      if (matches) {
        const subExpression = matches.slice(term.length + 1, -1); // to remove trrig term along with bracket;
        if expr.substring().includes(term) {
          evaluateComplexMathExpression(subExpression);
        }
        const angle = parseFloat(subExpression);
        const result = Trig.term(angle);
        refinedExpression += result;
      } else {
        console.log("No complex math expression to evaluate");
      }
    } else {
      refinedExpression = expression;
    }
  }
  evaluateMathExpression(expression);
}
