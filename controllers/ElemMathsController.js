import evaluateMathExpression from '../utils/elementaryMaths';

class ElemMathsController {
  static async getBasicCalc(req, res) {
    const expression = req.query.expression;
    const result = await evaluateMathExpression(expression);
    res.json({ result });
  }
}

 // module.exports = ElemMathsController;
export default ElemMathsController;
