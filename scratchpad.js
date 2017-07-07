function series (n, func) {
  var str;
  var ar = [];
  var start = bind()(()=>ret(1))
  makeArray(n).map(k => {
    ar.push(start(terminate))

    start = start(func)
    ar.push(start)
  })
  var art = ar.filter(v => typeof v == "number");
  return art;
}

var seriesArray = series(99,x => ret(1+1/(x*x)));
console.log(seriesArray)
