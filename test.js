var utils = require("./index")

console.log(utils.startTrim("/abc/efg/hijk",["/ab","/abc"]))


var afun = async (abc) =>{}

console.log(utils.Type.isAsyncFunction(afun))


console.log(utils.endTrim("1234567",['467','4567']))

var array1 = ['1','2','3']
var array2 = ['1','3','2']

console.log(utils.ArrayEquals(array1,array2))


var arry3 = [
    {name  : "asdf", n : 1},
    {name  : "abc", n : 3},
    {name  : "two", n : 2},
    {name  : "six", n : 6},
    {name : "thre" , n :2}
]

// console.log(utils.ArraySort(arry3,(a,b)=>{ return a.n -b.n}))

// console.log(utils.ArrayDistinct(arry3,(a,b)=>{ return a.n -b.n == 0}))

console.log(utils.ArrayRemove(arry3,{ n :3}))


console.log(utils.ArrayRemove(arry3,{ n :3},(a,b)=>{ return a.n == b.n}))

console.log(utils.ArrayRemove(arry3,[{ n :3},{n:2}],(a,b)=>{ return a.n == b.n}))