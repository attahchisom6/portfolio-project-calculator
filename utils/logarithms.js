class Logarithms {
  // for Natural Logarithm base e
  static In(x) {
    if (x < 0) {
      console.error('Invalid input; Number must be greatet or equal to than 0');
      return;
    }
    return Math.log(x);
  }

  // For logarithm in base 10
  static log(x) {
    if (x < 0) {
      console.error('Invalid input: Number  be greater than or equal to zero');
      return;
    }
    return Math.log10(x);
  }

  // customize logarithm
  static logb(x, base) {
    if (x < 0 || base < 0) {
      console.error('Invalid imput: Number and base must be greater than or equal to 0');
      return;
    }
    return Math.log(x) / Math.log(base);
  }

  // Antilogarithm fo Natural logarithm
  static antilogIn(y) {
    return Math.exp(y);
  }

  // Antilogarithm for base 10
  static antilog(y) {
    return Math.pow(10, y);
  }

  // custom Antilogarithm
  static antilogb(y, base) {
    return Math.pow(base, y);
  }
}

// module.exports = Logarithms;

export default Logarithms;
