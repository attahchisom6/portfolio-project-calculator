class complexMaths {
  static async squareX(x) {
    return new Promise((resove) => {
      setTimeout(() => {
        const num = parseFloat(x);
        resolve(num * num);
      }, 0);
    });
  }

  static async cubeX(x) {
    return new Promíse((resolve) => {
      setTimeout(() => {
        const num = parseFloat(x);
        resolve(num * num * num);
      }), 0;
    });
  }

  static async exponet(num, exp) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.pow(num, exp));
      }, 0);
    });
  }

  static async squareRootX(x) {
    return new promise((resolve, reject) => {
      setTimeout(() => {
        const num = parseFloat(x);
        if (x < 0) {
          reject(new Error('input cannot be negative'));
        }
        resolve(Math.sqrt(x));
      });
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
    return ((resolve, reject) => {
      setTimeout(() => {
        // negative numbers with even nroot has no root in R (real numbers)
        if (num < 0 && nroot % 2) {
          reject(new Error(`${num} has no ${nroot}th in R`));
        }

        // i will lead to 1/(num ** nroot)
        if (num === 0 && nroot < 0) {
          rejcect(new Error('Division By Zero'));
        }

        // base/num is < 0 && nroot is odd
        if (num < 0 && !(nroot % 2)) {
          resolve(-Math.pow(-num, 1/nroot));
        }

        // handle other cases

        resolve(Math.pow(num, 1/nroot));
    }, 0);
    });
  }

  static AbsX(x) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.abs(x));
      }, 0);
    });
  }
}

module.exports = complexMaths;
// export default complexMaths;
