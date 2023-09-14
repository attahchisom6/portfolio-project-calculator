import Trig from '../utils/trig';
import ElemMaths from '../utils/elementaryMaths';
import logarithm from '../utils/logaithms';
import express from 'express';

const router = express.Router();

router.get('/sum', ElemMaths.sum);
router.get('/sub', ElemMaths.sub);
router.get('/mul', ElemMaths.mul);
router.get('div', ElemMaths.div);
router.get('mod', ElemMaths.mod);

export default router;
