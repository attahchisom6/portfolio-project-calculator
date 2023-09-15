import ElemMathsController from '../controllers/ElemMathsController';
import UIController from '../controllers/UIController';

import express from 'express';

const router = express.Router();

router.get('/basicCalc', ElemMathsController.getBasicCalc);

// User Interface related issues
router.get('/', UIController.getUI);

export default router;
