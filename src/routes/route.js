const express = require('express');
const underScore=require('underscore')
const loadash = require('lodash');

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
   
   let weekend=['saturday', 'sunday', 'monday','tuesday']
   let result=underScore.first(weekend,2)
   let array =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
   let sub_arrays=loadash.chunk(array,3)
   console.log("print all subArrays:", sub_arrays)
   console.log('find the result:', result)
   let number=[1,3,5,7,9,11,13,15,17,19]
   let odd_number=loadash.tail(number)
   console.log("print all odd number:", odd_number)
   
   let resultArray=loadash.union([1,2,3],[2,3,4],[3,4,5],[4,5,6],[5,6,7])
   console.log("answer will be combined array:", resultArray)
  
   let given=loadash.fromPairs( [["horror","The Shining"],["drama","Titanic"],["thriller","Shutter Island"],["fantasy","Pans Labyrinth"]])
   console.log("answer 4:", given)
 res.send('My first ever api!')
});

module.exports = router;
// adding this comment for no reason 