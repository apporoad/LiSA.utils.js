/**类声明*/
declare class Type{

    isString(obj : any) : boolean

    isObject(obj : any) :boolean

    isNumber(obj : any) : boolean

    isArray(obj : any) : boolean

    isUndefined(obj : any) : boolean

    isFunction(obj : any) :boolean

    isNull(obj : any) : boolean

    isSymbol(obj:any) : boolean

    isBoolean(obj: any) : boolean

    isRegExp(obj : any) : boolean

    isAsyncFunction(obj : any) :boolean
}

declare class Utils{


    /**
     *   is  instance of  string
     *  是否是字符串
     */
     Type: Type


    /**
     * 字符串是否以xx结尾
     * @param originStr 
     * @param endStr 
     */
    endWith(originStr : string,endStr : string): boolean


    /**
     * 
     * @param str 
     * @param end string 或者 string[]
     */
    endTrim (str:string,end : string) : string

    startWith (originStr : string , startStr: string) : boolean

    /**
     * 
     * @param str 
     * @param start string 或者 string[]
     */
    startTrim (str:string,start :string) : string

    /**
     * 生成不重复的随机整数 randUnique(0,100,4)
     * @param start 
     * @param end 
     * @param size 
     */
    randUnique (start : number, end : number, size : number) : Array<number>

    /**
     * 
     * @param str 
     * @param searchStr 支持正则匹配
     */
    indexOfString(str : string,searchStr : string) : number

    ArrayContains (array :Array<any>,one : any, compareFn? : Function) :boolean 

    ArrayEquals ( array1 : Array<any>,array2 : Array<any>,compareFn? : Function) :boolean

    ArrayIndexOf (array : Array<any>,one : any, compareFn? : Function) : number

    ArraySort (array : Array<any>,compareFn? : Function) : Array<any>

    ArrayDistinct (array : Array<any> ,compareFn ? : Function) : Array<any>

    ArrayRemove (array : Array<any>,arrayOrOneRemoving,compareFn ? : Function) : Array<any>
}


export = new Utils()