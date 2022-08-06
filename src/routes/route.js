const express = require('express');

const router = express.Router();
const module1 = require("../logger/logger.js")
const module2 = require("../util/helper.js")
const module3 = require("../validator/formatter.js")

router.get('/test-me', function (req, res) {
   module1.myInfo()
   module2.printDate()
   module2.printMonth()
   module2.getBatchName()
   module3.trim()
   module3.lower()
   module3.upper()
 res.send('My first ever api!')
});

module.exports = router;
// adding this comment for no reason 