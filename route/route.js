
let express = require('express');
let router = express.Router();
let controller = require('../controller/controller');
router.get('/card', controller.getAllCards );
router.get('/card/:id', controller.getOneCard );
router.post('/card', controller.addOneCard );
module.exports = router;
