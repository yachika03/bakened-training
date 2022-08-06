const str="FuNction UP"
const result=str.toLowerCase()
const result2=str.toUpperCase()
function trim(){
    console.log(str);
}   
function changetoLowerCase() {
     console.log(result);
}
function changeToUpperCase() {
    console.log(result2);
}
module.exports.trim=trim
module.exports.lower=changetoLowerCase;
module.exports.upper=changeToUpperCase;