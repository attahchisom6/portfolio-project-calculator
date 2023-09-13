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

module.exports = ElemMaths;
