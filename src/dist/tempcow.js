
function makeArray (n) {
  var a = new Array (n)
  for (var k=1; k<=n; k+=1) a[k] = k; 
  return a
}

function evaluate (x) {
  var a = eval("typeof " + x)
  return [(a === "undefined"),b];
}

  function Monad(z = 'default', ID = 'tempMonad') {
    this.x = z;
    this.id = ID;
  };

  function bind (m) {return (func, ...args) => {
    var test = evaluate(m);
    console.log('test', test);
    if (test[1] === false) var m = new Monad(m, m)
    else monad = m; 
    var y = func(monad.x, ...args) 
    var ID = "bindDefault"
    ID = testPrefix(args, monad.id);
    window[ID] = new Monad(y.x,ID);
    return bind(y);   // Curried bind(). (func, ...args) => ...
    };

  function testPrefix (x,y) {
     var t = y;  // y is the id of the monad calling testPrefix
     if (Array.isArray(x)) {
      x.map(v => {
        if (typeof v == 'string' && v.charAt() == '$') {
           t = v.slice(1);  // Remove $ from the id of the soon to be instantiated monad.
        }
      })
    }
    return t;
  }

  function retrn (monad, value) {
    window[monad.id] = new Monad (value, monad.id);
    return bind(window[monad.id])
  };
  
  function ret (v, id = 'temp_from_ret') {
    return window[id] = new Monad(v, id);
  }

  function square (v) {
    return ret(v*v)
  };

  function cube (v) {
    return ret(v*v*v);
  };

  function add (a, b) {
    return ret((parseInt(a,10) + parseInt(b,10)));
  };

  var double = function double(v) {
      return ret(v + v);
  };

  function mult(x, y) {
    return ret(x * y);
    }

  function pi (k) {
    var a = (2*k)*(2*k);
    var b = (k+2)*(k)
    return ret(a/b)
  }


var m0 = new Monad (0, "m0")
