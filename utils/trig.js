const PI = Math.PI;

class Trig {
  constructor() {
    this._calcMode = 'Radians';
  }

  set CalcMode(mode) {
    if (mode !== 'Degree' && mode !== 'Radians') {
      console.log("Mode must be in degree or Radians");
      return;
    }
    this._calcMode = mode;
  }

  get CalcMode() {
    return this._calcMode;
  }

  static theta(angle) {
    switch (this.CalcMode) {
      case 'Degree':
        angle = (PI * angle) / 180;
        break;
      default:
        angle = angle;
        break;
    }
    return angle;
  }

  static sine(angle) {
    angle = Trig.theta(angle);
    return Math.sin(angle);
  }

  static cos(angle) {
    angle = Trig.theta(angle);
    return Math.cos(angle);
  }

  static tan(angle) {
    angle = Trig.theta(angle);
    return Math.tan(angle);
  }

  static cosec(angle) {
    angle = Trig.theta(angle);
    return  1 / Trig.sine(angle);
  }

  static sec(angle) {
    angle = Trig.theta(angle);
    return 1 / Trig.cos(angle);
  }

  static cot(angle) {
    angle = Trig.theta(angle);
    return 1 / Trig.tan(angle);
  }

  static asin(angle) {
    const result = Math.asin(angle);
    console.log("This is the current Mode", this.CalcMode);
    if (this.CalcMode === "Degree") {
      return (result * 180) / PI;
    } else {
      return result;
    }
  }

  static acos(angle) {
    const result = Math.acos(angle);
    if (this.CalcMode === "Degree") {
      return (result * 180) / PI;
    } else {
      return Math.acos(angle);
    }
  }

  static atan(angle) {
    const result = Math.atan(angle);
    if (this.CalcMode === "Degree") {
      return (result * 180) / PI;
    } else {
      return result;
    }
  }
}

// module.exports = Trig;
export default Trig;
