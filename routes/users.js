const express = require('express');

const router = express.Router();
//const homeController = require('../controllers/home_controller');

//router.get('/',homeController.home);
router.get('/', (req, res) => {
    res.send("Hye its router use");
})

module.exports = router;