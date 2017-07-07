
  function bd (m) {
    var inner = function (func, ...args) { 
      //console.log('**************** monad, y, ID, window[ID] **************');
      var monad = evaluate(m);
      //console.log('monad',monad);
      var y = evaluate(func(monad.x, ...args)) 
      //console.log('y',y);
      var ID = testPrefix(args, monad.id);
      //console.log('ID',ID);
      window[ID] = new Monad(y.x, ID);
      return bd(y); 
      //console.log('window[ID]', window[ID]);
      // return bind(this.y); 
      //return bd(window[ID]);
    };
    return inner
  };

retrn(m,3)
var a = bd(m);
var b = a(v=>v*v*v)(v=>ret(v+ 3),"$m")
console.log(a);
console.log(b);
console.log("Suzy Q")
console.log(m);
console.log("Linda");

/*
Exception: TypeError: this.monad is undefined
inner@Scratchpad/1:7:29
@Scratchpad/1:22:9
*/