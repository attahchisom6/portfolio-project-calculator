import MathsController from '../controllers/MathsController';
import UIController from '../controllers/UIController';

import express from 'express';

const router = express.Router();

router.get('/basicCalc', MathsController.getBasicCalc);
router.get('/complexCalc', MathsController.getComplexCalc);

// User Interface related issues
router.get('/', UIController.getUI);

export default router;
