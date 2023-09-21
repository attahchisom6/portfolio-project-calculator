import evaluateMathExpression from '../utils/elementaryMaths';
import evaluateComplexMathExpression from '../utils/complexMaths';
import Trig from '../utils/trig';

class MathsController {
  static async getBasicCalc(req, res) {
    const expression = decodeURIComponent(req.query.expression);
    try {
      const result = await evaluateMathExpression(expression);
      res.json({ result });
    } catch(error) {
      res.status(400).json({ error });
    }
  }

  static async getComplexCalc(req, res) {
    let { expression, mode } = req.headers;
    console.log("This is the passed mode:", mode);
    try {
      Trig.CalcMode = mode;
      console.log('This is the mode:', Trig.CalcMode);
      console.log('expression recieved:', expression);
      console.log('passed expression', expression);
      expression = decodeURIComponent(expression);
      console.log('decoded expression:', expression);
      const result = await evaluateComplexMathExpression(expression);
      res.json({ result });
      console.log(result);
    } catch(error) {
      console.error(error);
      res.status(400).json({ error });
    }
  }
}

 // module.exports = ElemMathsController;
export default MathsController;
