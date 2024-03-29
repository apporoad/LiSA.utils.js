var utils = require("./index")
var atils = utils.Async
var it2 = global.debug || it


it('test startTrim',()=>{

    var str1 = utils.startTrim("/abc/efg/hijk",[ "g","/ab","c/ef"])
    expect(str1).toBe('/hijk')
    var str2 = utils.startTrim("/abc/efg/hijk","/ab")
    expect(str2).toBe('c/efg/hijk')

    var array = utils.ArrayFilter([{name:'hello'},{name : 'hi'}, {name : 'hello'}] , { name : 'hello'} , (a,b)=>{ return a.name ==b.name})
    expect(array.length).toBe(2)
})

it('test endTrim', ()=>{
    var str1 = utils.endTrim('aaaabbbb', 'b')
    var str2 = utils.endTrim('abc      ')
    var str3 = utils.endTrim('zzzabccba' , ['a','b','c'])
    
    expect(str1).toBe('aaaa')
    expect(str2).toBe('abc')
    expect(str3).toBe('zzz')
})

it('test deepCopy' , ()=>{
    var obj1 = { hi : { hello : 1}}
    var obj2 = { hello : { hi : 3}}
    obj1.next = obj2
    obj2.next = obj1
    var obj3 = utils.deepCopy(obj1)
    obj3.hi.hello = 3
    expect(obj1.hi.hello *3 == obj3.hi.hello).toBeTruthy()

    var json1 = {
        hello : [ '1' , '2' , '3']
    }
    var json2 = utils.deepCopy(json1)
    //console.log(json2)
    expect(json2.hello.length).toBe(3)
})

it('test sort' , ()=>{
    var array = [
        { id :1, name : '1'},
        { id :2, name : '2'},
        { id :0, name : '0'},
    ]
    expect(utils.ArraySort(array,(a,b)=>{ return a.id > b.id})[0].id).toBe(0)
})

it2('test special' , ()=>{
    var json = {
        abc : /asdfs/g,
        obj : [{
            a : 2
        }]
    }
    var cpJ = utils.deepCopy(json)
    cpJ.obj[0].a =1

    expect(cpJ.abc == json.abc).toBe(true)

    expect(cpJ.obj[0].a != json.obj[0].a).toBe(true)
})

// var afun = async (abc) =>{}

// console.log(utils.Type.isAsyncFunction(afun))


// console.log(utils.endTrim("1234567",['467','4567']))


// var array1 = ['1','2','3']
// var array2 = ['1','3','2']

// console.log(utils.ArrayEquals(array1,array2))


// var arry3 = [
//     {name  : "asdf", n : 1},
//     {name  : "abc", n : 3},
//     {name  : "two", n : 2},
//     {name  : "six", n : 6},
//     {name : "thre" , n :2}
// ]

// // console.log(utils.ArraySort(arry3,(a,b)=>{ return a.n -b.n}))

// // console.log(utils.ArrayDistinct(arry3,(a,b)=>{ return a.n -b.n == 0}))

// console.log(utils.ArrayRemove(arry3,{ n :3}))


// console.log(utils.ArrayRemove(arry3,{ n :3},(a,b)=>{ return a.n == b.n}))

// console.log(utils.ArrayRemove(arry3,[{ n :3},{n:2}],(a,b)=>{ return a.n == b.n}))


it('test async', async ()=>{
    expect(await atils.ArrayContains(['a', { hello : 1} , 2] , 1 , async( one,two)=>{
        return Promise.resolve(utils.Type.isObject(two) && two.hello)
    })).toBeTruthy()

    expect(await atils.ArrayEquals([1],[2],async (one, two)=>{
        return Promise.resolve(true)
    })).toBeTruthy()

    //todo
    
})


it('test mkdirp' , async()=>{
    var path = __dirname + '/test/test/test/'
    utils.mkdirp(path)

    expect( require('fs').existsSync(path)).toBe(true)
})

it('test hash' , async()=>{
    var a = /asdfsdf/g
    var b = /asdfsdf/g
    expect(utils.hashCode(a) == utils.hashCode(b)).toBe(true)
})


it('test joinPath' ,()=>{
    var result = utils.joinPath('http://hello.com' , '/module1/' , 'module2/' , '/abc.html/') 
    console.log(result)
    expect(result== "http://hello.com/module1/module2/abc.html/").toBe(true)
})