let axios = require("axios")
let getweather = async function (req, res) {
    try {
        let q = req.query.q
        let appid = req.query.appid
        let options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${q}&appid=${appid}`
        }
        let result = await axios(options);
        res.status(200).send({msg:result.data.weather})
    } catch (error) {
        res.status(500).send({ msg: error })
    }
}
let getcity = async function (req, res) {
    try {
       let city=req.query.q
       let appid=req.query.appid
       let result=[]
       let finalArray=[]
       for (let i=0;i<city.length;i++){
        let options = {
            method: "get",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city[i]}&appid=${appid}`
        
        }
         result[i]=(await axios(options))
        
       } 
       for(let i=0;i<city.length;i++){
        
        finalArray.push({temp:result[i].data.main.temp,city:result[i].data.name})

       }
        finalArray.sort((a, b) => {
            return a.temp - b.temp;
        });
       
        res.status(200).send({data:finalArray})
    } catch (error) {
        res.status(500).send({ msg: error })
    }
}
module.exports.getweather = getweather
module.exports.getcity=getcity