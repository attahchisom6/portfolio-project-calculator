const { log } = require('console');

class ElemMaths {
  constructor() {
    this.precision = 10;
  }

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
    };
    return num / div
  }

  static mod(num, modulo) {
    if (modulo === 0) {
      return undefined;
    }
    return num % modulo;
  }

}

log(ElemMaths.sum(4, 5, 6));
log(ElemMaths.sub(3, 4, -1));
log(ElemMaths.mul(3, 5, 4.2, 5.8));
log(ElemMaths.div(55.1, 4));
log(ElemMaths.mod(33, 0))
