const express = require('express');
const router = express.Router();

router.get('/students/:name', function(req, res) {
    let studentName = req.params.name
    console.log(studentName)
    res.send(studentName)
})

router.get("/random" , function(req, res) {
    res.send("hi there")
})


router.get("/test-api" , function(req, res) {
    res.send("hi FunctionUp")
})


router.get("/test-api-2" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API")
})


router.get("/test-api-3" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's ")
})


router.get("/test-api-4" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
})



router.get("/test-api-5" , function(req, res) {
    res.send("hi FunctionUp5. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
})

router.get("/test-api-6" , function(req, res) {
    res.send({a:56, b: 45})
})

router.post("/test-post", function(req, res) {
    res.send([ 23, 45 , 6])
})


router.post("/test-post-2", function(req, res) {
    res.send(  { msg: "hi" , status: true }  )
})

router.post("/test-post-3", function(req, res) {
    // let id = req.body.user
    // let pwd= req.body.password

    // console.log( id , pwd)

    console.log( req.body )

    res.send(  { msg: "hi" , status: true }  )
})



router.post("/test-post-4", function(req, res) {
    let arr= [ 12, "functionup"]
    let ele= req.body.element
    arr.push(ele)
    res.send(  { msg: arr , status: true }  )
})



    let players =
   [
       {
           "name": "manish",
           "dob": "1/1/1995",
           "gender": "male",
           "city": "jalandhar",
           "sports": [
               "swimming"
           ]
       },
       {
           "name": "gopal",
           "dob": "1/09/1995",
           "gender": "male",
           "city": "delhi",
           "sports": [
               "soccer"
           ],
       },
       {
           "name": "lokesh",
           "dob": "1/1/1990",
           "gender": "male",
           "city": "mumbai",
           "sports": [
               "soccer"
           ],
       },
   ]

   router.post('/players-y', function (req, res) {
    let Newname=req.body
    let fly =false

    for (let i=0 ;i<players.length;i++){
       
        if (Newname.name==players[i].name){
           
            fly=true
            break;

        }
    }if(fly==true) {
        
        res.send("person already exist")

    }else{
        players.push(Newname)
       res.send(players)
       
        // let result=players.push(Newname)
        // res.send(result)
        
    }
    
    // let Newname=req.body
    // for (let i=0; i<players.length; i++){
    //     let object=players[i]
         
    //     if (object.name==Newname.name){
    //         res.send("player do exist")
    //         break;
    //     }
    // }
    // result=players.push(Newname)
    // res.send(result)
    // let dob = req.body.dob
    // let gender= req.body.gender
    // let city= req.body.city
    // let sports=req.body.sports
    // players.push({name,dob,gender,city,sports})
    
//     console.log (players)
    

//        //LOGIC WILL COME HERE
//        res.send(  { data: players , status: true }  )
  })
  
module.exports = router;


