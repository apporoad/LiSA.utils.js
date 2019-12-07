var utils = require("./index")

console.log(utils.startTrim("/abc/efg/hijk",["/ab","/abc"]))


var afun = async (abc) =>{}

console.log(utils.Type.isAsyncFunction(afun))


console.log(utils.endTrim("1234567",['467','4567']))

var array1 = ['1','2','3']
var array2 = ['1','3','2']

console.log(utils.ArrayEquals(array1,array2))