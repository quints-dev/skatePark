const { Router } = require('express');
const { createSkaterController, findAllSkatersController } = require("../controllers/skater");


const router = Router();

router.post('', createSkaterController);

router.get('/skaters', findAllSkatersController);

module.exports = router; 