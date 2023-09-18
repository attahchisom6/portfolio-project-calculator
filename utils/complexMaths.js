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

module.exports = complexMaths;
