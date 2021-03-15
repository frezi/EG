
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