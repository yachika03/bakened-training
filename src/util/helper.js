const date=new Date()
const month=date.getMonth()
function printDate(){
    console.log(date)
}
function printMonth(){
    console.log(month)
}
function getBatchName(){
    console.log("Plutonium, W3D5, the topic for today is Nodejs module system")
}
module.exports.printDate=printDate;
module.exports.printMonth=printMonth;
module.exports.getBatchName=getBatchName;