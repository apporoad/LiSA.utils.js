var Type = (function () {
    var type = {};
    var typeArr = ['String', 'Object', 'Number', 'Array', 'Undefined', 'Function', 'Null', 'Symbol', 'Boolean', 'RegExp', 'AsyncFunction'];
    for (var i = 0; i < typeArr.length; i++) {
        (function (name) {
            type['is' + name] = function (obj) {
                return Object.prototype.toString.call(obj) == '[object ' + name + ']';
            }
        })(typeArr[i]);
    }
    return type;
})();

var endWith = function (str, s) {
    if (s == null || s == "" || str.length == 0 || s.length > str.length)
        return false;
    if (str.substring(str.length - s.length) == s)
        return true;
    else
        return false;
}

exports.endTrim = (str, end) => {
    end = end || ' '
    var result =str
    var array = []
    if (Type.isArray(end)) {
        array = end
    }
    else {
        array.push(end)
    }

    for (var i = 0; i < array.length; i++) {
        var s = array[i]
        if (endWith(str, s) && s) {
            //console.log(str, start)
            result = str.substring(0, str.length - s.length)
        }
    }
    if(result == str){
        return  result
    }
    return exports.endTrim(result,end)
}
var startWith = function (str, s) {
    if (s == null || s == "" || str == null || str == "" || str.length == 0 || s.length > str.length)
        return false;
    if (str.substr(0, s.length) == s)
        return true;
    else
        return false;
}

exports.startTrim = (str, start) => {
    start = start || ' '
    var result = str
    var array = []
    if (Type.isArray(start)) {
        array = start
    }
    else {
        array.push(start)
    }

    for (var i = 0; i < array.length; i++) {
        var s = array[i]
        if (startWith(str, s) && s) {
            //console.log(str, start)
            result = str.substring(s.length)
        }
    }
    if(result == str){
        return result
    }
    return exports.startTrim(result,start)
}

exports.randUnique = (start, end, size) => {
    var allNums = new Array;
    size = size ? (size > end - start ? end - start : size) : 1;
    for (var i = start, k = 0; i <= end; i++, k++) {
        allNums[k] = i;
    }
    allNums.sort(function () { return 0.5 - Math.random(); });
    return allNums.slice(0, size);
}

exports.Type = Type
exports.endWith = endWith
exports.startWith = startWith


exports.indexOfString = (str, searchStr) => {
    if (!str || !searchStr) {
        return -1
    }
    if (searchStr.length > 2 && endWith(searchStr, '/') && startWith(searchStr, '/')) {
        //正则匹配
        var re = new RegExp(searchStr.substring(1, searchStr.length - 1), "mg")
        var arr;
        while ((arr = re.exec(str)) != null)
            return arr.index  //print(arr.index + "-" + arr.lastIndex + "\t" + arr);
        return -1
    }
    else {
        return str.indexOf(searchStr)
    }
}
var indexOfString = exports.indexOfString

exports.indexOf = (str, search) => {
    if (!str || !search) {
        return -1
    }
    if (Type.isString(search)) {
        return indexOfString(str, search)
    }
    else if (Type.isNumber(search)) {
        re = new RegExp(/\n/, "mg")
        var nArr = new Array()
        var temp = null
        while ((temp = re.exec(str)) != null)
            nArr.push(temp.index)
        if (search >= 0) {
            if (search == 0)
                return 0
            if (search - 1 < nArr.length) {
                return nArr[search - 1]
            }
            else {
                //? maybe should know
                return -1
            }
        } else {
            var activeIndex = nArr.length + search
            if (activeIndex > -1) {
                return nArr[activeIndex]
            } else {
                //?  maybe should know
                return -1
            }
        }
    }
    else {
        throw Error('pplugins:util: unsupport search type')
    }
}


exports.ArrayContains = (array, one, compareFn) => {
    return exports.ArrayIndexOf(array, one, compareFn) > -1
}

exports.ArrayEquals = (array1, array2, compareFn) => {
    if (array1.length != array2.length) {
        return false
    }
    array1.sort(compareFn)
    array2.sort(compareFn)
    for (var i = 0; i < array1.length; i++) {
        if (compareFn) {
            if (!compareFn(array1[i], array2[i])) {
                return false
            }
        } else {
            if (array1[i] != array2[i]) {
                return false
            }
        }
    }
    return true
}

exports.ArrayIndexOf = (array, one, compareFn) => {
    for (var i = 0; i < array.length; i++) {
        element = array[i]
        if (compareFn) {
            if (compareFn(one, element)) {
                return i
            }
        }
        else {
            if (one == element) {
                return i
            }
        }
    }
    return -1
}

exports.ArrayFilter = (array, one, compareFn) => {
    var newArr = []
    for (var i = 0; i < array.length; i++) {
        var element = array[i]
        if (compareFn) {
            if (compareFn(one, element)) {
                newArr.push(element)
            }
        } else if (one == element) {
            newArr.push(element)
        }
    }
    return newArr
}


exports.ArraySort = (array, compareFn) => {
    if(compareFn){
        return array.sort((a,b)=>{
            var result = compareFn(a,b)
            if(Type.isNumber(result))
                return result
            else
                return result ? 1 : -1
        })
    }else{
        return array.sort()
    }
}

exports.ArrayDistinct = (array, compareFn) => {
    return array.filter(function (item, index, arr) {
        return exports.ArrayIndexOf(arr, item, compareFn) === index
    });
}

exports.ArrayRemove = (array, arrayOrOneRemoving, compareFn) => {
    var newArr = []
    if (!exports.Type.isArray(arrayOrOneRemoving)) {
        arrayOrOneRemoving = [arrayOrOneRemoving]
    }
    array.forEach(element => {
        if (!exports.ArrayContains(arrayOrOneRemoving, element, compareFn)) {
            newArr.push(element)
        }
    })
    return newArr
}

exports.deepCopy = (obj) => {
    let map = new WeakMap();
    function dp(obj) {
        let result = null;
        let keys = Object.keys(obj);
        let key = null,
            temp = null,
            existobj = null;
        existobj = map.get(obj);
        if (existobj) {
            return existobj;
        }
        result = Array.isArray(obj) ? [] : {}
        map.set(obj, result);
        for (let i = 0, len = keys.length; i < len; i++) {
            key = keys[i];
            temp = obj[key];
            if (temp && typeof temp === 'object') {
                result[key] = dp(temp);
            } else {
                result[key] = temp;
            }
        }
        return result;
    }

    return dp(obj);
}