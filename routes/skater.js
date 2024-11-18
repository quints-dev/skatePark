const { Router } = require('express');
const createSkaterController = require('../controllers/skater');


const router = Router();

router.post('', createSkaterController);

module.exports = router; 