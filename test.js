var utils = require("./index")

console.log(utils.startTrim("/abc/efg/hijk",["/ab","/abc"]))


var afun = async (abc) =>{}

console.log(utils.Type.isAsyncFunction(afun))