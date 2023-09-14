import ElemMaths from '../utils/elementaryMaths';
import router from '../routes';

class ElemMathsController {
  static async getSum(req, res) {
    const params = req.query.params.split('+').map(Number);
    const result = ElemMaths.sum(...params);
    res.json({ result });
  }

  static async getSub(req, res) {
    const params = req.query.params.split('-').map(Number);
    const result = ElemMaths.sub(...params);
    res.json({ result });
  }

  static async getMul(req, res) {
    const params = req.query.params.split('x').map(Number);
    const result = ElemMaths.mul(...params);
    res.json({ result });
  }

  static async getDiv(req, res) {
    const num = Number(req.query.num);
    const div = Number(req.query.div);

    const result = ElemMaths.div(num, div);
    if (result === undefined) {
      res.send('Division By Zero');
    } else {
      res.json({ result });
    }
  }

  static async getMod(req, res) {
    const num = Number(req.query.num);
    const modulo = Number(req.query.modulo);

    const result = ElemMaths.mod(num, modulo);

    if (result === undefined) {
      res.send("Division By Zero");
    } else {
      res.json({ result });
    }
  }
}
