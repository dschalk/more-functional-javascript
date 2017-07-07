function series (n, func) {
  var mx = new Monad (2, 'mx')
  var str;
  var ar = [2];
  var start = Bind(mx)(v=>ret(2))
  makeArray(n).map(k => {
    //let st = "func(" + k + ")"
    //start = start(st)
    start = start(x=>ret(x*2))
    start(x=>console.log(x));
    ar.push(start)
   /* let str = eval(st);
    let str2 = new Monad (str.x, "$m"+k)
    console.log(str2)
    ar.push(str.x);  */
    
  })
  return ar;
}

console.log(series(7,x => ret(2*x)));


