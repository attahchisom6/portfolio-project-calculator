const PI = Math.PI;

class Trig {
  constructor() {
    this.CalcMode = 'Radians';
  }

  set CalcMode(mode) {
    if (mode !== 'Degree' && mode !== 'Radians') {
      console.log("Mode must be in degree or Radians");
      return;
    }
    this.CalcMode = mode;
  }

  static theta(angle) {
    switch (this.CalcMode) {
      case 'Degree':
        angle = (PI * angle) / 180;
        break;
      case 'Radians':
        angle = angle;
        break;
      default:
        return "Type Error: Angle must be in degree or radians"
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
}

module.exports = Trig;
