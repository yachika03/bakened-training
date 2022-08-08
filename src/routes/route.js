const { json } = require('body-parser');
const { response, request } = require('express');
const express = require('express');
const abc = require('../introduction/intro')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    logger.welcome()

    res.send('My second ever api!')
});

router.get('/movies', function (req, res){
    let movies = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]

    res.send(movies)
})

router.get('/movies/:indexNumber', function(req, res){
    let movies = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
    let requestParams = req.params
    if(requestParams.indexNumber<movies.length){
        res.send(movies[requestParams.indexNumber])
    }else{
        res.send("please give a valid index")
    }
})

router.get('/films', function(req, res){
   let object = [ {
        'id': 1,
        'name': 'The Shining'
       }, {
        'id': 2,
        'name': 'Incendies'
       }, {
        'id': 3,
        'name': 'Rang de Basanti'
       }, {
        'id': 4,
        'name': 'Finding Nemo'
       }]
       
   res.send("please give a valid index")
})
module.exports = router;

router.get('/films/:filmId', function(req, res){
    let flag=-1
    let films= [ {
        'filmId': 1,
        'name': 'The Shining'
       }, {
        'filmId': 2,
        'name': 'Incendies'
       }, {
        'filmId': 3,
        'name': 'Rang de Basanti'
       }, {
        'filmId': 4,
        'name': 'Finding Nemo'
       }]
    
       requestParams=req.params
       for (let i=0; i<films.length; i++){
        
        if(films[i].filmId==requestParams.filmId){
          flag=i
            break;
        }else {
            flag=-1
        }
       }
       if (flag!=-1){
        res.send(films[flag])
       }else{
       res.send("please give a valid filmId ")
       }
})