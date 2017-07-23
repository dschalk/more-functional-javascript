function series (n, func, base) {
    var str;
    var ar = [];
    var start = bind()(()=>ret(base))
    makeArray(n).map(k => {
      ar.push(start(terminate))
      start = start(func)
      ar.push(start)
    }) 
    var art = ar.filter(v => typeof v == "number");
    return art;
  } 
var seriesArray = series(9,x=>x*2,1);
  console.log(seriesArray)

