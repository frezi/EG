// es6 for in & of使用
{
  //20210315 周一
  const p = [{ name: "Lydia" }, { age: 21 }];
  for (let item in p) {
    console.log(item);
  }

  const obj = { P21120100009: 2 };

  for (const item in obj) {
    console.log(item); //P21120100009
  }
  /**
   * A {name:"Lydia"},{age:21}
   * B "name","age"
   * C "Lydia",21
   * D ["name","Lydia"],["age",21]
   *
   * 选B 。for in遍历数组或者对象，item表示对象的属性名，
   * 数组如果想输出属性值，则for of
   * 对象如果想输出属性值，Object.values(obj) 换成数组 再for of
   */
}

// parseInt() 函数可解析第一个字符串，并返回一个整数
{
  const num = parseInt("7*6", 10);
  /**
        A: 42
        B: "42"
        C: 7
        D: NaN
        选C parseInt() 函数可解析第一个字符串，并返回一个整数
        注意： 只有字符串中的第一个数字会被返回。
        注意： 开头和结尾的空格是允许的。
        注意：如果字符串的第一个字符不能被转换为数字，那么 parseInt() 会返回 NaN。
        注意：在字符串以"0"为开始时旧的浏览器默认使用八进制基数。ECMAScript 5，默认的是十进制的基数。
     */
}

// 类型判断
{
  //判断是否 a 是不是 b 的实例
  console.log(null instanceof Object, 888); //false
  console.log([1] instanceof Array, 888); //true
  console.log([1] instanceof Object, 888); //true

  //判断类型 输出是字符串 "string" "number" "boolean" "undefined" "function"  "object"(数组 对象 null)
  console.log(typeof (() => {}), 999); //"function" 999
  console.log(typeof [1, 2], 999); //"object" 999
  console.log(typeof dd, 888); //"undefined"
  console.log(typeof null, "null"); //"object"
  console.log(typeof Symbol, "Symbol"); //"function"

  //判断数组
  console.log(Array.isArray([]), 888); //true

  //判断对象
  console.log(Object.prototype.toString.call({ a: 1 }) === "[Object,Object]"); //true

  //判断null
  null !== "null" && String(null) === "null";

  console.log(String([1, 2]), 88); //1,2
  console.log(String({ a: 1, B: 2 }), 88); //[object Object] 88
}

// 防抖和节流函数
{
  /**
   * 节流：高频函数特定时间内只能执行一次 throttle；防抖：高频函数在特定时间内不被调用后再执行 debounce
   * 都是防止函数在特定时间内无意义被多次调用
   */
  function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
      if (timer) clearTimeout(timer);
      let context = this;
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    };
  }

  function throttle(fn, delay) {
    let timer = null;
    let canRun = true; // 通过闭包保存一个标记
    return function (...args) {
      if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
      canRun = false; // 立即设置为false
      if (timer) clearTimeout(timer);
      let context = this;
      timer = setTimeout(() => {
        // 将外部传入的函数的执行放在setTimeout中
        fn.apply(context, args);
        // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
        canRun = true;
      }, delay);
    };
  }
  function sayHi(e) {
    console.log("throttle");
  }
  window.addEventListener("resize", throttle(sayHi, 1000));
}

// 实现一个bind函数
/**
 * bind绑定
 * apply 应用（通俗理解是拿参数的东西变成自己的东西）
 * call 等同于 apply 但是它是参数拿调用者的东西
 * context 上下文
 * arguments 函数参数对象[Arguments] { '0': 7, '1': 8, '2': 9 } 可以用数组方式调用arguments[0]
 * typeof 类型判断 instanceof  实例
 */
// 简单版
{
  Function.prototype.my_bind = function (context) {
    var self = this;
    return function () {
      return self.apply(context, arguments); // allpy
    };
  };
  //验证
  function foo() {
    console.log(this.name);
  }
  foo(); // undefined
  var b = { name: "hello" };
  foo.my_bind(b)(); //hello
  foo.bind(b)(); //hello
}
// 完美方式
{
  Function.prototype.myBind = function (context) {
    if (typeof this !== "function" || String(this) === "Symbol()") {
      throw new Error("请使用函数调用绑定");
    }
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    //[7,8]
    return function () {
      var innerArgs = Array.prototype.slice.call(arguments);
      //[9]
      var finalArgs = args.concat(innerArgs);
      //[7,8,9]
      return self.apply(context, finalArgs);
    };
  };
  //验证
  function bar(m, n, d) {
    console.log(arguments, "arguments");
    console.log(this.name + " " + m + " " + n + " " + d);
  }
  var b = { name: "kong" };
  bar.myBind(b, 7, 8)(9, 10); // kong 7 8 9
  bar.myBind(b, 7, 8)(); // kong 7 8 undefined
}

// 7、es6 数组去重 Promise
{
  let arr = [2, 1, 2];
  arr = Array.from(new Set([...arr]));
  console.log(arr);

  let myajax = (t) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        console.log(t, "ajax");
        res();
      }, t);
    });
  };

  // myajax(1000).then(()=>{
  //     myajax(3000)
  // }).then(()=>{
  //     myajax(6000)
  // })

  const foo = async () => {
    try {
      //可以用来排队多接口请求
      await myajax(6000);
      await myajax(1000);
      await myajax(3000);
    } catch (E) {
      throw new Error(E);
    }
  };
  // foo()
}

// 8、var变量提升(let因为es块级作用域不会提升)和函数提升
/**
 * 变量提升是声明的提升 值没有提升
 * 函数提升在变量提升前面 优先级大
 */
{
  //   console.log(b);
  //   var b = 1;
  //   console.log(b);
  //   function b() {
  //     console.log(2);
  //   }
  //   console.log(b);
  //   var b = 3;
  //   console.log(b);
  //   function b() {
  //     console.log(3);
  //   }
  //   b();
  //   console.log(b);
  //   //其实是这样的顺序
  //   function a() {
  //     alert(3);
  //   } //第一步预解析：将 var a提升      但因为变量名与函数名相同，故function a()提升时将覆盖var a，又因为存在两个相同名称                           的function函数，后写的将覆盖先写的，所以最后提升的只有function a(){alert(3);}
  //   console.log(a); //因为函数提升，所以打印的a为函数整体
  //   a = 1; //将1赋值给函数a,此时的a为一个变量，不再是函数
  //   console.log(a); //故打印的为a赋的值
  //   console.log(a);
  //   a = 3; //将a重新赋值3
  //   console.log(a); //故打印结果为3
  //   a(); //此时的a为一个变量，不再是一个函数，所以报错，js中一旦出现报错，后面的语句将不再运行，所以最后一个console.log不进行打印。
  //   console.log(a);
}

//9、闭包 函数嵌套函数
{
  function out() {
    let num = 3;
    return function () {
      let n = 1;
      console.log(++n);
      console.log(++num);
    };
  }

  let foo = out(); // num转为全局变量
  foo(); // 2 4 let和var都会
  foo(); // 2 5

  console.log("--保护变量值--");
  //   for (var i = 1; i < 5; i++) {
  //     (function (i) {
  //       setTimeout(() => {
  //         console.log(i);
  //       }, 1000);
  //     })(i);
  //   }
  console.log("---保护变量值&定时打印---");
  //   for (var i = 1; i < 5; i++) {
  //     (function (i) {
  //       setTimeout(() => {
  //         console.log(i);
  //       }, 1000 * i);
  //     })(i);
  //   }
  console.log("---闭包作为参数传递---");
  //   const num = 15;
  //   function f1(x) {
  //     if (x > num) {
  //       console.log(x); //30 此时num为15
  //     }
  //   }
  //   void (function (f2) {
  //     const num = 100;
  //     f2(30);
  //   })(f1);
}

//10、递归函数&深拷贝
{
  //通过函数名，在函数自己内部调用自己 如果没有阻断if、return等，会造成死循环
  //斐波那契题（兔子生兔子）
  function aa(x) {
    if (x === 1 || x === 0) {
      return x;
    }
    //1， 1， 2， 3， 5， 8， 13， 21 。。。
    return aa(x - 1) + aa(x - 2);
  }
  const n = aa(3);
  console.log(n, "斐波拉契");

  //深拷贝
  function deepClone(obj) {
    //数据类型判断&不符合拦截
    if (typeof obj !== "object" || String(obj) === "null") {
      console.log("target is no object");
      return false;
    }
    const newObj = Array.isArray(obj) ? [] : {};
    for (let k in obj) {
      if (obj[k] && typeof obj[k] === "object") {
        //递归二维或二维以上深复制
        newObj[k] = deepClone(obj[k]);
      } else {
        newObj[k] = obj[k];
      }
    }
    return newObj;
  }

  const o1 = { a: 1, b: 2, c: { v: 1 } };
  const a1 = [2, 1, o1];
  const o2 = deepClone(o1);
  console.log(o2, o2 === o1, "深拷贝用递归");
  const a2 = deepClone(a1);
  console.log(a2, a1 === a2, "深拷贝用递归shuzu");
  const o3 = deepClone(null);
}
// 11 ajax和websocket
{
  // let xhr = new XMLHttpRequest(); //node v8不支持改js api
  // xhr.onreadystatechange = function () {
  //   if (xhr.readyState === 4 && xhr.status === 200) {
  //     alert(xhr.responseText);
  //   }
  // };
  // xhr.open("get", "http://dev.pro/user/info");
  // xhr.send();
}

// console
{
}
