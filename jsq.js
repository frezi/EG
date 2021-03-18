
{
    //20210315 周一
    const p = {
        name:"Lydia",
        age:21
    }
    for(const item in p){
        console.log(item)
    }

    /**
     * A {name:"Lydia"},{age:21}
     * B "name","age"   
     * C "Lydia",21
     * D ["name","Lydia"],["age",21]
     * 
     * 选B 。for in遍历数组或者对象，item表示对象的属性名，如果想输出属性值，则for of
     */
    
}


{
    //20210316 周二
    console.log(3 + 4 + "5");

    /**
        A: "345"
        B: "75"
        C: 12
        D: "12"

        选B 
     */
    
}

{
    //20210317 周三
    const num = parseInt("7*6", 10);

    /**
        A: 42
        B: "42"
        C: 7
        D: NaN

        选C parseInt() 函数可解析一个字符串，并返回一个整数
        注意： 只有字符串中的第一个数字会被返回。

        注意： 开头和结尾的空格是允许的。

        注意：如果字符串的第一个字符不能被转换为数字，那么 parseInt() 会返回 NaN。

        注意：在字符串以"0"为开始时旧的浏览器默认使用八进制基数。ECMAScript 5，默认的是十进制的基数。

     */
    
}