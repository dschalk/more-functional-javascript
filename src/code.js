import {h, pre} from '@cycle/dom';
var score = 0;
var goals = 0;
var operator = 'add';

var monad = h('div',  [
h('h1', 'The Monads'),
h('p', ' In this project, monads are objects with at least two attributes: an id and data. The id is usually a string, although it can be any valid JavaScript value. The data can also be any JavaScript value, so it might be a number, an array, or even a monad. '),
h('h3', 'Rules vs Freedom ' ),
h('p', ' Some people seek the comfort and safety of rules. They seek refuge from the inherent anarchy of JavaScript in things such as "Javascript: The Good Parts" and Typescript. Team leaders can maintain smooth and uneventfull progress during application development by requiring such things. Anyone assisting me is free to use eval() and free to define wildly polymorphic functions, provided that they don\'t disrespectfully trample on the work of their colleagues or leave backdoors open to potential hackers. ' ),   
h('p', ' Monads can also have methods. The most common are a method for creating a new monad with the same identifier and an updated data attribute, and a method for providing its value to a function. In this project, they are named "ret" and "bnd" because of their similarity to "return" and "bind" in the Haskell programming language. The bnd() method facilitates chainging procedures.' ),
h('p', ' I\'ll start by presenting a small monad, along with its companion funtions, bind() and retrn(). bind() is for chaining procedures and retrn() is for updating values. Here are the definitions: ' ),
h('pre', `    function Monad(data, ID = 'temp') {
      this.x = data;
      this.id = ID;
    };

    function terminate (x) {return x};

    function bind (m) {
      var inner = function (func, ...args) { 
        var monad = evaluate(m);
        var y = evaluate(func(monad.x, ...args)) 
        var ID = testPrefix(args, monad.id);
        window[ID] = new Monad(y.x, ID);
        if (func.name === "terminate") return y.x
        else return bind(y); 
      };
      return inner
    };

    function retrn (monad, value) {
      window[monad.id] = new Monad (value, monad.id);
      return new bind(window[monad.id])
    };  ` ),

h('p', ' Monads are created by code such as "var m = new Monad(\'anything\', \'m\')". The arguments are the values of m.x and m.id in the instance of Monad named "m". Instances of Monad can also be be defined using the function "ret()". For example ret(888, "instance_443") creates am instance of Monad named "instance_443" with instance_443.id === "instance_443" and instance_443.x = 888. ' ),
h('p', ' Any monad "m" in the global space can be displaced by another monad named "m" by using retrn(). When this is done, it looks as though m.x got mutated, but that isn\'t actually the case. Previously defined references to m retain their values, as the snippets below demonstrate. '),

h('pre',`    var m = new Monad (5, 'm');
    var arr = [m];
    var p = m;
    retrn(m,100);                     // Updates the data attribute of m.
    console.log(m.x, arr[0].x, p.x);
    // 100, 5, 5  ` ),

h('p', ' In global scope, which is the object named "window" in browswers, m.x changed to 100; but p and arr still refer to 5, the orininal value of m.x. Similarly, when bind operates on a monad, the change is seen globally, but nowhere else. As in the previous example, existing references to m are not affected by updating it. ' ),

h('pre', `    var m = new Monad (5, 'm');
    var arr = [m];
    var p = m;
    bind(m)(add,95)(terminate)
    console.log(m.x, arr[0].x, p.x);
    // 100, 5, 5  ` ),

h('p', ' Had there been no reference to m, the previous instance would have been subject to removal by the garbage collector. ' ),
h('p', ' It is possible to mutate monads with code such as m.x = 888. That might be a good thing to do in a function with many recursions, although its hard to imagine why anyone would recurse over a value in a monad rather than the value itself. Monads aren\'t mutated on this website. That way, the data attribute of a monad being used in a time-consuming procedure stays outside of the scope of other procedures. Further safeguards are provided by the Haskell server, which uses TVars to asure that concurrent procedure are performed atomically. '),
  h('p', ' The bind() method can leave the calling monad\'s global value unchanged while assigning a value (in the global space) to another previously defined monad, or to a freshly created monad. So regardless of whether or not "m2" is defined, retrn(m,4)(m,cube,"$m2") causes m.x === 4 and m2.x === 64 to both return true. ' ),
h('pre', `    retrn(m,4)(m,cube,"$m2")
    console.log(m.x, m2.x)   // 4 64  ` ),
h('p', ' Instances of Monad can be chained in computational sequences, each using the result of the previous computation,. This works because bind returns its inner function and the inner function returns bind(y) where y is a monad holding the latest computational result. ' ),
h('pre', `    retrn(m,0)(add,2,"$m2")(v=>v*v,"$m3")(v => ret(v*v), "$m4")
    (v=>v*v, "$m5")(v => ret(v*v), "$m6")(terminate) 
    //65636
    console.log(m.x, m2.x, m3.x, m4.x, m5.x, m6.x)  
    // 0 2 4 16 256, 65636  
` ),
h('p', ' bind() is polymorphic. It accepts functions that return monads as will as functions which return primitive values. The following terser code words just as well. ' ),  
h('pre', `    retrn(m,0)(v=>v+2,"$m2")(v=>v*v,"$m3")(v=>v*v,"$m4")
    (v=>v*v,"$m5")(v=>v*v,"$m6")(terminate) ` ), 

h('p', ' I am not saying that these are efficient ways of generating numerical series. I do believe that anyone who is new to functional programming will beenefit by contemplating how the code produces the result and experimenting with the code using functions other than "v=>v*v". I have been doing my experiments in the Firefox scratchpad. If you do as I suggest, you will be teaching your brain a wonderful new way of thinking. ' ),
h('p', ' Unless you are a genius or an expierienced functional programmer, it might be best to return to the next demonstration after a good night\'s sleep and a cup of coffee. ' ), 
  h('p', ' The function "series" automates the algorithm used in the previous example. While testing it, I discovered that 1 + 1 / (1.465571231876768 * 1.465571231876768) = 1.465571231876768. I didn\'t need to know that, but the oscilating series (higher then lower then higher ... than the result) that converged to that result is kind of interesting. Here\'s the code: ' ),
h('pre', `  function series (n, func) {
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

  function makeArray (n) {
    var a = new Array (n)
    for (var k=0; k<=n; k+=1) a[k] = k; 
   return a
  }  ` ),
h('p', ' And here is the result: ' ),
h('span.redsmall', ' 0, Infinity, 1, 2, 1.25, 1.6400000000000001, 1.37180249851279, 1.5313942135189396, 1.426408640598956, 1.4914870486759138, 1.4495324290188554, 1.475931147477801, 1.4590582576091302, 1.4697369615928917, 1.4629358005751474, 1.467250165675962, 1.4645063608989797, 1.4662485297695578, 1.4651412125747463, 1.4658445625216319, 1.4653976213536375, 1.4656815539517154, 1.4655011472787112, 1.4656157629273645, 1.4655429406129283, 1.4655892070930874, 1.4655598116339825, 1.4655784877487914, 1.4655666219334014, 1.4655741607922543, 1.4655693710123165, 1.4655724141688138, 1.4655704807150556, 1.4655717091235168, 1.4655709286608705, 1.465571424523348, 1.465571109479868, 1.465571309640962, 1.4655711824697275, 1.4655712632672557, 1.4655712119329984, 1.4655712445479305, 1.465571223826216, 1.4655712369916412, 1.4655712286270621, 1.4655712339414504, 1.4655712305649837, 1.4655712327102028, 1.46557123134725, 1.4655712322131942, 1.4655712316630216, 1.4655712320125707, 1.4655712317904865, 1.4655712319315866, 1.4655712318419394, 1.4655712318988963, 1.465571231862709, 1.4655712318857004, 1.465571231871093, 1.4655712318803737, 1.4655712318744771, 1.4655712318782235, 1.4655712318758434, 1.4655712318773555, 1.4655712318763947, 1.4655712318770053, 1.4655712318766172, 1.465571231876864, 1.4655712318767071, 1.4655712318768068, 1.4655712318767433, 1.4655712318767837, 1.465571231876758, 1.4655712318767744, 1.465571231876764, 1.4655712318767706, 1.4655712318767664, 1.465571231876769, 1.4655712318767673, 1.4655712318767686, 1.4655712318767677, 1.4655712318767682, 1.465571231876768, 1.465571231876768, 1.465571231876768, 1.465571231876768, 1.465571231876768, 1.465571231876768, 1.465571231876768, 1.465571231876768, 1.465571231876768, 1.465571231876768, 1.465571231876768, 1.465571231876768, 1.465571231876768, 1.465571231876768, 1.465571231876768, 1.465571231876768, 1.465571231876768, 1.465571231876768 ' ),
h('br') ])


var variations = h('div',  [
h('h3', 'Variations on the Theme' ),
h('p', ' Variations on the Monad theme serve diverse purposes. Instances of MonadState preserve computations so they won\'t have to be performed again. An instance of MonadState2 keeps a record of game play allowing players to back up and resume play from a previous display of numbers. It also keeps the current game parameters - score, goals, operator, selected numbers, and remaining numbers - in a single array which is stored in the archive whenever a new state is created. MonadItter instances are used to parse websockets messages and organize the callbacks neatly. MonadEr catches NaN and prefents crashes when undefined variables are encountered. I defined a message emitting monad but it seemed useless in this Cycle application where reactivity is pervasive. When you want to emit and listen for messages, it is better to build a driver and merge its stream of messages into the application cycle. '),

h('p', ' The various monad constructors demonstrate a way of encapsulating procedures and state in chainable objects. You might incorporate Monad or one of the other constructors presented here in your application, but I hope you will at least consider modifying them or defining new monads to suit your purposes. ' )
])

var variations2 = h('div', [  
h('h3', ' The Monad Laws '),
h('p', ' In the following discussion, "x === y" signifies that the expression x === y returns true. Let J be the collection of all Javascript values, including functions, instances of Monad, etc, and let F be the collection of all functions mapping values in J to instances of Monad with references (names) matching their ids; that is, with window[id] === m.id for some id which is a valid es2015 variable name. The collection of all such instances of Monad along and all of the functions in F is called "M". For any instances of Monad m, m1, and m2 in M and any functions f and g in F, the following relationships follow easily from the definition of Monad: '),
h('div', 'Left Identity ' ),
h('pre', `    retrn(m,v)(temp,f).x === f(v).x
    Examples: retrn(m, 3)(m, cube).x === cube(3).x  Tested and verified
    retrn(m, 5)(m, cube) == bind(m,cube)
    ret(3).bnd(cube).x === cube(3).x     Tested and verified
    Haskell monad law: (return x) >>= f \u2261 f x  ` ),
h('div#discussion', ' Right Identity  ' ),
h('pre', `    m.bnd(m.ret) === m      Tested and verified
    m.bnd(m.ret) === m   Tested and verified
    m.bnd(ret) === m  Tested and verified
    Haskell monad law: m >>= return \u2261 m `  ),
    h('div', ' Commutivity  ' ),
    h('pre', `    m.bnd(f1, ...args).bnd(f2, ...args).x === m.bnd(v => f1(v, ...args).bnd(f2, ...args)).x
    Example: m.ret(0).bnd(add, 3).bnd(cube).x ===
    m.ret(0).bnd(v => add(v,3).bnd(cube)).x  Tested amd verified
    Haskell monad law: (m >>= f) >>= g \u2261 m >>= ( \\x -> (f x >>= g) ) `),
h('a', { props: { href: '#top' } }, 'Back To The Top'),
h('h3', ' Disussion ' ),
h('span.tao', ' The Haskell statement ' ),
h('span.turk6', `f \u2261 g` ),
h('span', ' means that f x == g x for all Haskell values x of the appropriate type. That is the test applied to Javascript expressions in the "Monad Laws" section (above). Neither the == nor the === operator would provide useful information about the behavior of instances of Monad, which are objects. Those operators test objects for location in memory. If the left and right sides of predicates create new instances of m, then the left side m and the right side m wind up in different locations in memory. So we expect m.ret(3) === m.ret(3) to return false, and it does. The question we want answered is the question \u2261 answers in Haskell: Can the left and right sides be substituted for one another and still yield the same results.'),
h('br' ),
h('br' ),
h('span.tao', ' The Haskell programming language borrowed the term "monad" from the branch of mathematics known as category theory. This was apropriate because Haskell monads, along with the function return and the operator >>=, behave quite a bit like category theory monads, and the inspiration for them came out of category theory. For Haskell monads to actually be category theory monads, they would need to reside in a category-theory category. They don\'t, although the Haskell mystique tends to give newcommers to the language the impression that they do. See ' ),
h('a', { props: { href: "http://math.andrej.com/2016/08/06/hask-is-not-a-category/", target: "_blank" } }, 'Hask is not a category.'),
h('br' ),
h('p', ' Research into ways of defining a Haskell category appears to be ongoing. It involves tinkering with special constraints, omitted features, and definitions of morphisms that are not Haskell functions. When a definition of the category is established, Haskell monads are then shown to be, in some contrived context, category-theory monads. Devising such schemes are instructive academic exercises, but I don\'t think they can provide anything useful to programmers working on applications for industry, commerce, and the Internet. ' ),
h('p', ' However, imitating definitions and patterns found in category theory, as Haskell does in defining the functor, monoid, and monad type classes, was a stroke of genius that vastly enriched the Haskell programming language and brought it into the mainstream as a viable alternative to java, c++, etc.  This website runs efficiently on a Haskell websockets server. The modified Haskell Wai Websockets server has proven to be extraordinarily easy to maintain as new requirements become necessary. For example, modifying the server to send chat messages and shared todo lists only to members of the same group was a trivial task. It required just a tiny amount of pattern-matching code. Category theory patterns make the Haskell interface to the Cycle front end robust, versitile, and reliable. Those are the qualities that I strive to emulate with JS-monads.'  ) ])

export default { monad, variations, variations2 }






const monadIt = h('pre', {style: {color: '#AFEEEE' }}, `  var MonadItter = function MonadItter() {
    this.p = function () {};
    this.release = function () {
      return this.p.apply(this, arguments);
    };
    this.bnd = function (func) {
      return this.p = func;
    };
  }; ` )

const ret = h('pre', {style: {color: '#AFEEEE' }}, `    function ret(v, id = 'temp') {
      return window[id] = (new Monad(v, id));
    } ` )

var driver = h('pre', `  var websocketsDriver = function () {
      return create((add) => {
        socket.onmessage = msg => add(msg)
      })
  };
` )

var messages = h('pre', `  const messages$ = sources.WS.map( e => {
    console.log(e);
    mMtem.ret(e.data.split(',')).bnd( v => {
      console.log('Websockets e.data.split message v: ', v );
      mMZ10.bnd( () => {
        gameMonad.run([v[7], v[8], 0, [], [v[3], v[4], v[5], v[6]]]);
      });
      mMZ12.bnd( () => mM6.ret(v[2] + ' successfully logged in.'));
      mMZ13.bnd( () => {
        var message = v.slice(3,v.length).join(', ');
        var str = v[2] + ': ' + message;
        messages.unshift(h('span', str ), h('br'));
      });
      mMZ14.bnd( () => {
        mMgoals2.ret('The winner is ' + v[2]);
        setTimeout(() => mMgoals2.ret(''), 5000 );
      });
    mMZ15.bnd( () => {
      mMgoals2.ret('A player named ' + v[2] +
        ' is currently logged in. Page will refresh in 4 seconds.')
      refresh() });
    mMZ16.bnd( () => testComments(e.data));
    mMZ17.bnd( () => testTask(v[2], v[3], e.data) );
    mMZ18.bnd( () => {
      if (pMgroup.x != 'solo' || pMname.x === v[2] ) updatePlayers(e.data)  });
    mMZ19.bnd( () => testComments(e.data));
  })
  mMtemp.ret(e.data.split(',')[0])
  .bnd(next, 'CA#$42', mMZ10)
  .bnd(next, 'CD#$42', mMZ13)
  .bnd(next, 'CE#$42', mMZ14)
  .bnd(next, 'EE#$42', mMZ15)
  .bnd(next, 'TG#$41', mMZ16)
  .bnd(next, 'DD#$42', mMZ17)
  .bnd(next, 'NN#$42', mMZ18)
  .bnd(next, 'GG#$42', mMZ19)
  .bnd(next, 'TG#$40', mMZ20)
  });

  function next(x, y, instance, z) {
    if (x == y) {
        instance.release(z);
    }
    return ret(x);
  };  `  )

var MonadSet = h('pre',  `  var MonadSet = function MonadSet(set, ID) {
    this.s = set;
    this.bnd = (func, ...args) => func(this.s, ...args);
    this.add = a => new MonadSet(s.add(a), this.id);
    this.delete = a => new MonadSet(s.delete(a), this.id);
    this.clear = () => new MonadSet(s.clear(), this.id);
  };  `  )

  const arrayFuncs = h('pre',  `  var push = function push(y,v,mon) {
      if (Array.isArray(y)) {
        let ar = [];
        let keys = Object.keys(y);
        for (let k in keys) {ar[k] = y[k]};
        ar.push(v);
        return mon.ret(ar);
      }
      console.log('The value provided to push is not an array');
      return ret(y);
    };

    var spliceRemove = function splice(x, j, mon) {
      if (Array.isArray(x)) {
        let ar = [];
        let keys = Object.keys(x);
        for (let k in keys) {ar[k] = x[k]};
        ar.splice(j,1);
        return mon.ret(ar);
      }
      console.log('The value provided to spliceRemove is not an array');
      return ret(x);
    };

    var spliceAdd = function splice(x, index, value, mon) {
      if (Array.isArray(x)) {
        let ar = [];
        let keys = Object.keys(x);
        for (let k in keys) {ar[k] = x[k]};
        ar.splice(index, 0, value);
        return mon.ret(ar);
      }
      console.log('The value provided to spliceAdd is not an array');
      return ret(x);
    };

    var splice = function splice(x, start, end, mon) {
      if (Array.isArray(x)) {
        let ar = [];
        let keys = Object.keys(x);
        for (let k in keys) {ar[k] = x[k]};
        ar.splice(start, end);
        return mon.ret(ar);
      }
      console.log('The value provided to spliceAdd is not an array');
      return ret(x);
    };
  `  )

var cleanup = h('pre',  `  function cleanup (x) {
      let target0 = document.getElementById('0');
      let target1 = document.getElementById('1');
      let target2 = document.getElementById('2');
      let target3 = document.getElementById('3');
      let targetAr = [target0, target1, target2, target3];
      for (let i in [0,1,2,3]) {
        if (targetAr[i].innerHTML === 'undefined' )    {
          targetAr[i].style.display = 'none';
        }
        else {
          targetAr[i].style.display = 'inline';
        }
      }
      return ret(x);
  }; `  )

  var C42 = h('pre',  `  mMZ10.bnd(() => mM$1
     .ret([mMar.x[3], mMar.x[4], mMar.x[5], mMar.x[6]])
     .bnd(() => mM$2.ret([]))
     .bnd(displayInline,'0')
     .bnd(displayInline,'1')
     .bnd(displayInline,'2')
     .bnd(displayInline,'3'));  `  )

  var taskStream = h('pre',  `
      `  )

  var deleteTask2 = h('pre',  `  mMZ19.bnd(() => mM$task.bnd(spliceRemove, mMar.x[3], mM$task));
  `  )

  var newTask = h('pre',  `  const newTask$ = sources.DOM
    .select('input.newTask').events('keydown');

  const newTaskAction$ = newTask$.map(e => {
      let ob = {};
      var alert = '';
      var ar = e.target.value.split(',');
      var ar2 = ar.slice(2);
      var task = '';
      if (ar.length < 4) {
        task = ar[2];
      }
      if (ar.length > 3) {
        task = ar2.reduce((a,b) => a + '$*$*$' + b);
      }
      if( e.keyCode === 13 ) {
        if ( ar.length < 3 ) {
          alert = 'You should enter "author, responsible party, task" separated by commas';
          document.getElementById('alert').innerHTML = alert;
        }

        else if ( (mMar2.x.filter(v => (v.task === task)).length) > 0 ) {
          document.getElementById('alert').innerHTML = task + " is already listed.";
        }

        else if ( ar.length > 2 ) {
          mM$taskList.bnd(addString, task + ',yellow, none, false,' +  ar[0] + ',' + ar[1], mM$taskList);
          e.target.value = '';
          document.getElementById('alert').innerHTML = '';
        }
      }
  };  ` )

  var process = h('pre',  `  const process = function(str) {
    let a = str.split(",");
    console.log('In process. str and a are: ', str, a);
    if (a === undefined) {
      return;
    };
    if (a.length < 9) {
      return
    };
    let ob = {};
    let ar = a.slice(3)
    let s = ar.reduce((a,b) => a + ',' + b);
    if (mM$taskList.x.length < 5) {
      mM$taskList.ret(s);
    }
    let ar2 = [];
    let tempArray = [];
    if (ar.length < 6) {return};
    if ((ar.length % 6) !== 0) {
      document.getElementById('alert').innerHTML = 'Error: array length is: ' + length;
    } else {
      let keys = Array(ar.length/6).fill(1);
      keys.map(_ => {
        ar2.push(
          {
            task: convertBack(ar.shift()),
            color: ar.shift(),
            textDecoration: ar.shift(),
            checked: ar.shift() === 'true',
            author: ar.shift(),
            responsible: ar.shift()
          }
        )
      })
      console.log('In process  ar2 is: ', ar2)
      let keys2 = Object.keys(ar2);
      for (let k in keys) {
        tempArray.push(
          h('div.todo',  [
            h('span.task3', {style: {color: ar2[k].color, textDecoration: ar2[k].textDecoration}},
                'Task: ' + ar2[k].task  ),
            h('br'),
            h('button#edit1', 'Edit'  ),
            h('input#edit2', {props: {type: 'textarea', value: ar2[k].task}, style: {display: 'none'}}  ),
            h('span#author.tao', 'Author: ' + ar2[k].author  + ' / ' + 'Responsibility: ' + ar2[k].responsible),
            h('br'),
            h('input#cb', {props: {type: 'checkbox', checked: ar2[k].checked}, style: {color: ar2[k].color,
                 textDecoration: ar2[k].textDecoration} } ),
            h('label.cbox', { props: {for: '#cb'}}, 'Completed' ),
            h('button.delete', 'Delete'  ),
            h('br'),
            h('hr')])
        )
      }
      mMtaskList.ret(tempArray)
    }
  };  `  )

  var colorClick = h('pre',  `  const colorClick$ = sources.DOM
    .select('#cb').events('click')

  const colorAction$ = colorClick$.map(e => {
    let index = getIndex(e);
    let s = mM$taskList.x;
    let ar = s.split(',');
    let n = 6 * index + 3;
    let j = 6 * index + 2;
    let k = 6 * index + 1;
    let checked = ar[n];
    if (checked === 'true')  {
      ar[n] = 'false';
      ar[k] = 'yellow';
      ar[j] = 'none';
    }
    else {
      ar[n] = 'true';
      ar[k] = 'lightGreen';
      ar[j] = 'line-through';
    }
    mM$taskList.ret( ar.reduce((a,b) => a + ',' + b) )
  });

  var getIndex = function getIndex (event_object) {
    var task = event_object.currentTarget.parentNode.innerText;
    var possibilities = event_object.currentTarget.parentNode.parentNode.childNodes;
    var keys = Object.keys(possibilities);
    for (let k in keys) {
      if (task === possibilities[k].innerText) {
        return k
      }
    }
    console.log('In getIndex. No match');
  }  `  )

  var edit = h('pre',  `  const edit1$ = sources.DOM
    .select('#edit1').events('click')

  const edit1Action$ = edit1$.map(e => {
    let index = getIndex2(e);
    mMtaskList.x[index].children[3].elm.style.display = 'block';
  });

  const edit2$ = sources.DOM
    .select('#edit2').events('keypress')

  const edit2Action$ = edit2$.map(e => {
    let v = e.target.value;
    let index = getIndex2(e);
    if( e.keyCode === 13 ) {
      process2(v, index);
    mMtaskList.x[index].children[3].elm.style.display = 'none';
    }
  });

  const process2 = function(str, index) {
    var a = mMcurrentList.x.split(',');
    a[6*index] = str;
    var b = a.reduce((a,b) => a + ',' + b)
    task2(b);
  };

  var getIndex2 = function getIndex2 (e) {
    var elem = e.currentTarget.parentNode.children[0].innerHTML
    var elem2 = e.currentTarget.parentNode.parentNode.childNodes
    var keys = Object.keys(elem2);
    for (let k in keys) {
      if (elem === elem2[k].childNodes[0].innerHTML) {
        return k
      }
      console.log('In getIndex2. No match');
    }
  }  `  )

  var mM$task = h('pre',  `  const taskAction$ = mM$taskList.stream.map(str => {
    socket.send('TD#$42' + ',' + mMgroup.x.trim() +
        ',' + mMname.x.trim() + ',' + '@' + str);
  });  `  )

  var updateCalc = h('pre',  `  function updateCalc(ar, op) {
    var result = calc(ar[0], op, ar[1]);
    if (result === 18 || result === 20) {
      score(result);
    }
    else {
      var sco = gameMonad.fetch0();
      var goals = gameMonad.fetch1();
      var a = gameMonad.fetch4().slice();
      a.push(result);
      gameMonad.run([sco,goals,0,[],a]);
    }
  };  `  ) 

  var sco = h('pre', `  function score(result) { var sc = parseInt(gameMonad.fetch0());
    var sco = result === 18 ? sc + 3 : sc + 1;
    var scor = sco % 5 === 0 ? sco + 5 : sco;
    var goals = gameMonad.fetch1();

    if (scor === 25 && gameMonad.fetch1() === "1") {
      mMindex.ret(0);
      gameMonad = new MonadState('gameMonad', [[0,0,0,[],[0,0,0,0]]]);
      socket.send(\`CE#$42,\${pMgroup.x},\${pMname.x}\`);
      scor = 0;
      goals = 0;
    }
    if (scor === 25 && gameMonad.fetch1() === "0") {
      scor = 0;
      goals = 1;
    }
    newRoll(scor, goals);
  }; ` )

  var testZ = h('pre',  `  mMZ1.bnd(v => mMt1
  .bnd(add,v).bnd(w => {
    mMt1.ret(w)
    .bnd(cube)
    .bnd(x => mMt3VAL = w + ' cubed is ' + x)}));

  mMZ2.bnd(v => cube(v)
  .bnd(w => mMt3VAL = v + ' cubed is ' + w));  `  )

  var quad = h('pre',  `  const quad$ = sources.DOM
    .select('#quad').events('keypress')  // Motorcycle way to get user input.

  const quadAction$ = quad$.map((e) => {
    if( e.keyCode === 13 ) {
      mMZ3.release(e.target.value)       // Releases mMZ (below).
      document.getElementById('quad').value = null;
    }
  });

  var solve = function solve () {
     mMZ3.bnd(a => {
     mMquad4.ret('');
     mMquad6.ret('');
     mMquad5.ret(a + " * x * x ")
     mMZ3.bnd(b => {
     mMquad6.ret(b + ' * x ')
     mMZ3.bnd(c => {
     mMtemp.ret([a,b,c])
    .bnd(fmap, qS4,'mMtemp2')
    .bnd(result => {
      let x = result[0]
      let y = result[1]
      if (x === 0) {
        mMquad5.ret('No solution', mMtemp)
        mMquad6.ret(' ');
        solve();
        return;
      }
      if (y === 0) {
        mMquad5.ret('No solution')
        mMquad6.ret(' ')
        solve();
        return;
      };
      mMquad4.ret("Results: " + x + " and  " + y)
      mMquad5.ret(p(a).text + " * " + x + " * " + x + " + " + p(b).text +
              " * " + x + " " + p(c).text + " = 0")
      mMquad6.ret(p(a).text + " * " + y + " * " + y + " + " + p(b).text +
              " * " + y + " " + p(c).text + " = 0")
      solve();
      }) }) }) })
  };

  var p = function p (x) {
    if (x >= 0) {return ' + ' + x}
    if (x < 0 ) {return ' - ' + Math.abs(x)}
  }

  var qS1 = function qS1 (a, b, c) {
    let n = (b*(-1)) + (Math.sqrt(b*b - 4*a*c));
    if (n != n) {
      return "No solution";
    }
    return n/(2*a);
  }

  var qS2 = function qS2 (a, b, c) {
    let n = (b*(-1)) - (Math.sqrt(b*b - 4*a*c));
    if (n != n) {
      return "No solution";
    }
    return n/(2*a);

  function fmap(x, g, id) {
    var mon = new Monad(g(x), id);
    window[id] = mon;
    return mon;
  }  `  )

  var runTest = h('pre',  `  var runTest = function monTest () {
  mM5.bnd( equals,
    m.ret(0).bnd(v => add(v, 3, m).bnd(cube)),
    m.ret(0).bnd(add, 3, m).bnd(cube), mMa)

  mM5.bnd(equals, m, m.bnd(m.ret), mMb)

  mM5.bnd(equals, m, m.ret(m.x), mMc)
  }  `  )


  var inc = h('pre',  `  var inc = function inc(x, mon) {
      return mon.ret(x + 1);
  };

  var spliceAdd = function spliceAdd(x, index, value, mon) {
    if (Array.isArray(x)) {
      let ar = [];
      let keys = Object.keys(x);
      for (let k in keys) {ar[k] = x[k]};
      ar.splice(index, 0, value);
      return mon.ret(ar);
    }
    console.log('The value provided to spliceAdd is not an array');
    return ret(x);
  }  `  )

    var todoStream = h('pre',  `  const taskAction$ = mM$taskList.stream.map(str => {
    socket.send('TD#$42' + ',' + mMgroup.x.trim() +
        ',' + mMname.x.trim() + ',' + '@' + str);
  });  `  )

var add = h('pre',  `  var add = function(x,b,mon) {
    if (arguments.length === 3) {
      return mon.ret(x + b);
    }
    return ret(x+b);
  }; ` )

var seed = h('pre',  `  mM$prime.ret([[2],3])  `  )

var MonadState = h('pre',  `  function MonadState(g, state) {
    this.id = g;
    this.s = state;
    this.bnd = (func, ...args) => func(this.s, ...args);  
    this.ret = function (a) {
      return window[this.id] = new MonadState(this.id, a);
    };
  };  `  )

var primesMonad = h('pre',  `    var primesMonad = new MonadState('primesMonad', [2, '', 3, [2]], [2],  primes_state)

    var primes_state = function primes_state(x) {
      var v = x.slice();
      console.log('In script2.js >>> primes_state v is ', v );
      while (2 == 2) {
          if ( v[3].every(e =>  (v[0] / e) != Math.floor(v[0] / e)) ) {
              v[3].push(v[0]);
          }
          if (v[3][v[3].length - 1] > v[2]) {
             return v;
          };
          v[0] += 2;
      }
    }  `  )

var fibsMonad = h('pre',  `  var primesMonad = new MonadState('primesMonad', [3, '', 3, [2,3]], primes_state);

  var fibs_state = function fibs_state(ar) {
    var a = ar.slice();
    while (a[3].length < a[2]) {
      a = [a[1], a[0] + a[1], a[2], a[3].concat(a[0])];
    }
    return a
  }  `  )

var tr3 = h('pre',  `  var tr3 = function tr (fibsArray, primesArray) {
    var bound = Math.ceil(Math.sqrt(fibsArray[fibsArray.length - 1]))
    var primes = primesArray.slice();
    if (primesArray.slice(-1)[0] >= bound) {
      primes = primesArray.filter(v => v <= bound);
    }
    var ar = [];
    var fibs = fibsArray.slice(3);
    fibs.map (v => {
      if (primesArray.every(p => (v % p || v === p))) ar.push(v);
    })
    return [fibsArray, primes, ar]
  }  `  )

  var primeFibInterface = h('pre',  `    const fibKeyPress5$ = sources.DOM
      .select('input#fib92').events('keyup');

    var primeFib$ = fibKeyPress5$.map(e => {
      workerB.postMessage(e.target.value)
    });

    const workerB$ = sources.WWB.map(m => {
      console.log('In workerB$ stream in the main thread. m is ', m );
      mMres.ret(m.data)
      .bnd(v => mM36.ret('Asynchronous addendum. The largest computed ' +
        'prime Fibonacci number is ' + v[2].split(',')[v[2].split(',').length - 1]), '$mM36')
      primesMonad.s = JSON.parse(JSON.stringify(primesMonad.s));
      primesMonad.a = JSON.parse(JSON.stringify(primesMonad.a));
      primesMonad.s = m.data[3];
      primesMonad.a = m.data[3][3];
    });  `  )

  var fpTransformer = h('pre',  `    var fpTransformer = function fpTransformer(x, s) {
      var a = Math.ceil(Math.sqrt(x[3].slice(-1)[0]));
      var m = primesMonad.run([s,a]);
      var ar = [];
      x[3].map(function (v) {
        if (m.s[3].filter(x => x <= v).every(function (p) { return (v % p || v == p); }))
          ar.push(v);
      });
      return [x[3].join(', '), m.s[3].slice(-1).pop(), ar.join(', '), m.s];
    };   `  )

  var factorsMonad = h('pre',  `  var factorsMonad = new MonadState('factorsMonad', [[], [], 2, []], factor_state);

    function factor_state(v) {
      v[3].map(function (p) {
        if (v[2] / p === Math.floor(v[2] / p)) {
            v[0].push(p);
        }
      });
      return v;
    }  `  )

  var factorsInput = h('pre',  `  var factorsPress$ = sources.DOM
        .select('input#factors_1').events('keydown');

    var factorsAction$ = factorsPress$.map(function (e) {
      var factors = [];
      mMfactors3.ret('');
      if (e.keyCode === 13) {
        var num = e.target.value
        if (!num.match(/^[0-9]+$/)) {
          mMfactors3.ret('This works only if you enter a number. ' + num + ' is not a number');
        }
        else {
          factors = primesMonad.run([primesMonad.s[0], [], num, primesMonad.a])
          .bnd(s => prFactTransformer3(s, num));
          mMfactors.ret("The prime factors of " + num + " are " + factors.join(', '));
        }
      }
    });  `  )

  var MonadSet = h('pre',  `    var MonadSet = function MonadSet(set, str) {
        var this = this;
        this.id = str;
        this.s = new Set();
    };

    var s = new Set();

    var sMplayers = MonadSet(s, 'sMplayers'); // holds currently online players  `  );

  var promise = h('pre',  `      var promise = function promise(x, t, mon, args) {
          return (new Promise((resolve) => {
            setTimeout(function() {
              resolve(eval("mon.ret(x).bnd(" + args + ")"))   // eval! Get over it, Douglas.
            },t*1000  );
          }));
        };  `  )

  var promiseSnippet = h('pre',  `  m.ret(3).bnd(promise, 2, m, "cube").then(data => m.ret(data.x).bnd(add, 15, m))  `  )

  var timeoutSnippet = h('pre',  `  const timeoutClicks$ = sources.DOM.select('#timeout').events('click')
      const timeoutAction$ = timeoutClicks$.map(() => {
        document.getElementById('timeout2').innerHTML = ''
        document.getElementById('timeout3').innerHTML = ''
        m.ret(3).bnd(m.ret)
          .bnd(display, 'timeout2', 'm) is ' + ' ' + m)).bnd(m.ret)
          .bnd(timeout2, 1, m, [() => m
          .bnd(cube).bnd(m.ret)
          .bnd(display, 'timeout2', 'm) is ' + ' ' + m)).bnd(m.ret)
          .bnd(timeout2, 2, m, [() => m
          .bnd(add, 15).bnd(m.ret)
          .bnd(display, 'timeout2',  'm) is ' + ' ' + m)).bnd(m.ret)
          .bnd(display, 'timeout3', 'The meaning of everything was computed to be' + ' ' + m))
        ])]);
      });
    });  `  )

  var timeout = h('pre',  `  var timeout2 = function timeout (x, t, m, args) {
      setTimeout(function () {
        mMZ9.release();
      }, t * 1000  );
      return mMZ9.bnd(() => m.bnd(... args))
    };  `  )

  var examples = h('pre',  `
               ret('m1Val','m1')
               m1.x === 'm1Val'   // true
               ret('m2Val', 'm2')
               m2.x === 'm2Val'   // true

               m1.bnd(m2.ret)
               m2.x === 'm1Val' // true
               m2.x === 'm2Val'   // still true

               m1.ret('newVal')
               m1.bnd(v => ret(v, 'm2'))
               m2.x === 'newVal'  // true
               m2.x === 'm1Val' // true   still the same  `   )

  var examples2 = h('pre',  `
    var m = new Monad(v, "m");
    ret(v, "m");
               `  )

  var e2 = h('pre',  `  var c = m.ret(0).bnd(add,3).bnd(cube).bnd(log, "The values of m\'s and c\'s
    x attributes are " + m.x + " and " + c.x + " respectively." )   ` )

  var e2x = h('pre', `   Output: The values of m\'s and c\'s x attributes are 0 and 27 respectively.  ` )

     var e3 = h('p',  ' Note: m\'s x attribute keeps its initial value of 0 because each computation creates a fresh instance of Monad with id === "default". In the next example, m\'s x attribute becomes the computation result due to the addition of ".bnd(m.ret)". '  )

   var e4 = h('pre',  `  var c = m.ret(0).bnd(add,3).bnd(cube).bnd(m.ret).bnd(log,
     "The values m\'s and c\'s x attributes are " + m.x + " and " + c.x + " respectively.") ` )

   var e4x = h('pre', `   Output: The values of m\'s and c\'s x attributes are 27 and 27 respectively.  ` )

   var e6 = h('pre',  `  m.ret(0).bnd(add,3).bnd(m2.ret).bnd(cube,m3).bnd(m3.ret)
    .bnd(log,"m), m2.x, and m3.x are  " + m.x + ", " + m2.x + " and " +
    m3.x + " respectively. "); ` )
  var e6x = h('pre', `   Output: m.x and m2.x and m3) are  0, 3 and 27 respectively.  ` )

  var equals = h('pre',  `    var equals = function equals (mon1, mon2) {
        if (mon1.id === mon2.id && mon1) === mon2)) return true;
        else return false
      }  `  )

  var fmap = h('pre',  `    function fmap (x, g, id) {window[id] = new Monad(g(x), id); return window[id]}

      var qS1 = function qS1 (a, b, c) {
        let n = (b*(-1)) + (Math.sqrt(b*b - 4*a*c));
        if (n != n) {
          return "No solution";
        }
        return n/(2*a);
      }

      var qS2 = function qS2 (a, b, c) {
        let n = (b*(-1)) - (Math.sqrt(b*b - 4*a*c));
        if (n != n) {
          return "No solution";
        }
        return n/(2*a);
      }

      var qS4 = function qS4 ([x,y,z]) {
        let [a,b,c] = [x,y,z]
        return [qS1(a,b,c), qS2(a,b,c)]
      }

      m.ret([12,12,-144])

      m.bnd(fmap, qS4, "temp").bnd(lg)   logs [3, -4] `  )

  var opM = h('pre',  `    function opM (a, op, b, id) {
        window[id] = new Monad(eval(a.x + op + b.x), id);
        return window[id];
      }

      m1.ret(42)

      m2.ret(7)

      opM(m1, "%", m2, "ok").bnd(lg)  logs 0

      opM(m1, "+", m2, "ok").bnd(lg)  logs 49  `  )

  var a = 'acorn'

  var messageMonad = h('pre',  `    var messageMonad = new MonadState('messageMonad', messages, messages, message_state);

      function message_state(v) {
        var ar = v[0].concat(v[3]);
        return [ v[0], [], [], ar ];
      };  `  )

  var test3 = h('pre',  `  function test3 (a) {
      var b = [];
      for (let i of [0,1,2,3]) {
        b[i] = (a[i] === undefined) ? 'none' : 'inline'
      }
      return ret(b);
    }

    pMnums.bnd(test3).bnd(pMstyle.ret);  `  )

  var mMZ10 = h('pre',  `  mMZ10.bnd( () => {
      pMnums.ret([v[3], v[4], v[5], v[6]]).bnd(test3).bnd(pMstyle.ret)
      travMonad.run([ [v[3], v[4], v[5], v[6]], v[7], v[8] ]);
      pMscore.ret(v[7]);
      pMgoals.ret(v[8]) });  `  )

  var test10_11 = h('pre.turk5',  `    function test10 () {
        m.ret(4).bnd(mult,100,'$m1')
        .bnd(square,'$m2')
        .bnd(add,-m2.x + 3,'$m3')
        .bnd(mult,100,'$m4')
        .bnd(square,'$m5')
        .bnd(add,m2.x,'$m6')
        .bnd(sqroot,'$m7')
        .bnd(() => {
          mMar10.ret([m, m1, m2, m3, m4, m5, m6, m7]);
          console.log('The square root of the sum of ', m1.x,
            ' squared and ', m4.x, ' squared is ', m7.x); });
        return mMar10;
      }

      function test11 () {
        m.ret(4).bnd(mult,100,'$m1')
        .bnd(square,'$m2')
        .bnd(add,-m2.x + 3,'$m3')
        .bnd(mult,100,'$m4')
        .bnd(square,'$m5')
        .bnd(add,m2.x,'$m6')
        .bnd(sqroot,'$m7').bnd(m.ret)
        .bnd(() => {
          mMar11.ret([m, m1, m2, m3, m4, m5, m6, m7]);
          console.log('The square root of the sum of ', m1.x,
            ' squared and ', m4.x, ' squared is ', m7.x); });
        return mMar11;
      }  `  )

  var backAction = h('pre',  `  var rollClick$ = sources.DOM
    .select('#roll').events('click');

  var rollClickAction$ = rollClick$.map(() => {
    var a = gameMonad.fetch0().valueOf() - 1;    // Lose one point for clicking ROLL.
    var b = gameMonad.fetch1().valueOf();
    socket.send(\`CA#$42,\${pMgroup.x},\${pMname.x},6,6,12,20,\${a},\${b}\`);
  });
  
  var backClick$ = sources.DOM
      .select('#back.tao100').events('click');

  var backAction$ = backClick$.map(() => {
    if (gameMonad.s[1] > 0) {
      gameMonad.dec(); 
    }
  });

  var forwardClick$ = sources.DOM
      .select('#ahead.tao1').events('click')

  var forwardAction$ = forwardClick$.map(() => {
    if (gameMonad.s[1] < gameMonad.s[0].length - 1) {
      gameMonad.inc();
    }
  }); ` )

  var monadEr = h('pre',  `    function MonadEr (val, ID, er = []) {
          var test;
          var arr = arr = [];
          this.x = val;
          this.e = er;
          this.id = ID;
          this.getx = function getx (x) {return this.x};
          this.bnd = function (f, ...args) {
            var args = args;
            if (f === 'clean3' || f === clean3) {
              this.e = [];
              window[this.id] = new MonadEr(this.x, this.id, []);
              return window[this.id];
            }
          if (this.e.length > 0) {
            console.log('BYPASSING COMPUTATION in MonadEr instance', this.id, f,
                '.  PROPAGATING ERROR:',  this.e[0]);
            return this;
          }

          if (args.length > 0) {
            arr = args.filter(v => !(typeof v === 'string' && v.charAt() === '$' && 
                v.slice(0,4) !== 'Math'))

            arr.map(v => {
              test = testP(v, this.id)
              if (test === 'STOP') {
                console.log('\"STOP\" returned from testP. Ending code execution in ',
                    this.id, '.' )
                this.e.push('STOP');
                return this;
              }
            });
          }
          if (test !== "STOP") {
          try {
            var testId = testPrefix(args, this.id);
            var ar = arr.map(v => eval(v))
            var m = eval(f)(this.x, ...ar)
            var id = testPrefix(ar, this.id);
            window[testId] = new MonadEr(m.x, testId, []);
            return window[testId];
            }
            catch(error) {
              this.e.push('STOP -- Execution Aborted. ');
              console.log(f, 'ERROR in ',id,error,' No further computations will be attempted');
              return this;
            }
          }
          else {
            this.e.push('STOP -- Execution Aborted. ');
            console.log(f, 'ERROR "STOP" returned from testP. No further ' +
                'computations will be attempted');
            return this;
          }
        }
        this.ret = function (a) {
          window[this.id] = new MonadEr(a, this.id, []);
          return window[this.id];
        }
      };

    function testPrefix (x,y) {
      var t = y;
      var s;
      if (Array.isArray(x)) {
        x.some(v => {
          if (typeof v === 'string' && v.charAt() === '$') {
             t = v.slice(1);
          }
        })
      }
      return t;
    }

    function testP (x,id) {
        if ( eval('typeof ' + x) === 'undefined') {
          console.log(\`............... ERROR parameter \${x} is not defined\`);
          window[id].e = [\`\${x} is not defined\`]
          return 'STOP';
        }
        if (eval(x) !== eval(x)) {
          console.log(\`............... ERROR parameter \${x} is not a number\`);
          window[id].e = [\`\${x} is not a number\`];
          return 'STOP';
        }
        mMZ12.release([]);
        return []
    }

    function ret3(v, id = 'generic') {
        window[id] = new MonadEr(v, id, []);
        return window[id];
      }

    function add3(x, y) {
        return ret3(x*1 + y*1);
      }

    function cube3(x) {
        return ret3(x*x*x);
    }

    function clean3 (x, id) {
      window[id] = new MonadEr(x, id, []);
      return window[id];
    }    `  )

var errorDemo = h('pre',  `    var t = new MonadEr(0,'t', []);
    var t2 = new MonadEr(0,'t2', []);
    var t3 = new MonadEr(0,'t3', []);
    console.log('Values of t, t2, and t3', t.x,t2.x,t3.x)
    console.log("executing t.bnd(\'add3\',3,\'$t2\').bnd(cube3, \'$t3\') ");
    t.bnd('add3',3,'$t2').bnd(cube3, '$t3')
    console.log('Values of t, t2, and t3', t.x,t2.x,t3.x)
    var t = new MonadEr(0,'t', []);
    var t2 = new MonadEr(0,'t2', []);
    var t3 = new MonadEr(0,'t3', []);
    console.log('Values of t, t2, and t3', t.x,t2.x,t3.x)

    console.log("executing t.bnd('add3','three', '$t2').bnd(cube3, '$t3') " );
    t.bnd('add3','three','$t2').bnd(cube3, '$t3')
    console.log('Values of t, t2, and t3', t.x,t2.x,t3.x)

    console.log( 't.bnd(clean3)' );
    t.bnd(clean3);

    console.log("executing t.bnd('add3', 'Math.sqrt(-1)', '$t2').bnd(cube3, '$t3') " );
    t.bnd('add3','Math.sqrt(-1)','$t2').bnd(cube3, '$t3')
    console.log('Values of t, t2, and t3', t.x,t2.x,t3.x)
    console.log( 't.bnd(clean3)' );
    t.bnd(clean3);
    console.log("executing t.bnd(\'addd3\',3,\'$t2\').bnd(cube3, \'$t3\') ");
    t.bnd('addd3',3,'$t2').bnd(cube3, '$t3')
    console.log('Values of t, t2, and t3', t.x,t2.x,t3.x)    `  )

var tests = h('pre',  `    function atest () {
      ret(2,'a')
      .bnd(add,1)
      a.bnd(v => ret(v*100,'b'))
      .bnd(v2 => ret(v2*v2,'c')
      .bnd(v3 => ret(4,'d')
      .bnd(v4 => ret(v4*100))
      .bnd(v5 => ret(v5*v5,'e')
      .bnd(v6 => ret(Math.sqrt(v6+v3),'f')
      .bnd(v7 => console.log('The square root of the sum of',v2,'and',v5,'is', v7,'.'))))))
      return [a,b,c,d,e,f]
    }

    console.log('// Now setting a, b, c, d, e and f to 7 and ' +
        'logging a.x, b.x, c.x, d.x, e.x, and f.x.)');
    ret(7,'a');ret(7,'b');ret(7,'c');ret(7,'d');ret(7,'e');ret(7,'f');
    console.log(a.x, b.x, c.x, d.x, e.x,f.x)
    console.log('// Now running atest and making demoAr a reference to its return value. ');
    demoAr = atest();
    console.log('// Now logging a.x, b.x, c.x, d.x, e.x, and f.x.');
    console.log(a.x, b.x, c.x, d.x, e.x,f.x)
    console.log('// Now logging demoAr.map(v => v.x).join(", ").');
    console.log(demoAr.map(v => v.x).join(', '));
    console.log('// Now setting a, b, c, d, e and f to 6 and ' +
        'logging a.x, b.x, c.x, d.x, e.x, and f.x.)');
    ret(6,'a');ret(6,'b');ret(6,'c');ret(6,'d');ret(6,'e');ret(6,'f');
    console.log(a.x, b.x, c.x, d.x, e.x,f.x)
    console.log('// Now logging demoAr.map(v => v.x).join(", ").');
    console.log(demoAr.map(v => v.x).join(', '));
    console.log('// The monads in DemoAr were not mutated or replaced ' +
        'when monads with the same ' );
    console.log('// names (a, b, c, d, and e) updated to 6, 6, 6, 6, 6, 6 by  ' +
        'using their bnd() methods. ');
    }  `  )

var wDriver = h('pre.green2',  `    var worker = new Worker("worker.js");

    function workerDriver () {
      return xs.create({
        start: listener => { worker.onmessage = msg => listener.next(msg)},
        stop: () => { worker.terminate() }
      });
    };  `  )


var worker$ = h('pre.green2',  `    const worker$ = sources.WW.map(v => {
      console.log('$essage from worker: ', v );
      v.preventDefault();
      mMZ21.bnd(() => {
        mM11.ret(v.data[1]);
        });
      mMZ22.bnd(() => {
        mM12.ret(v.data[1])
      });
      mMZ23.bnd(() => {
        mM13.ret(v.data[1])
      });
      mMZ24.bnd(() => {
        mM14.ret(v.data[1])
      });
      mMZ25.bnd(() => {
        window['primesMonad'] = new MonadState('primesMonad', v.data[1], primes_state);
      });
      next(v.data[0], 'CA#$41', mMZ21)
      next(v.data[0], 'CB#$41', mMZ22)
      next(v.data[0], 'CC#$41', mMZ23)
      next(v.data[0], 'CD#$41', mMZ24)
      next(v.data[0], 'CE#$41', mMZ25)
    });   `  )

var workerB_Driver = h('pre.red0',  `    function workerBDriver () {
      return xs.create({
        start: listener => { workerB.onmessage = msg => listener.next(msg)},
        stop: () => { workerB.terminate() }
      });
    };    `  )

var primes_state = h('pre',  `    function MonadState(g, state, p) {
      this.id = g;
      this.s = state;
      this.process = p;
      this.a = this.s[0];
      this.bnd = (func, ...args) => func(this.s, ...args);
      this.run = ar => {
        var ar2 = this.process(ar);
        this.s = ar2;
        self[this.id] = this;   // "self" is the global context in a worker.
        return self[this.id];
      }
    };

    var primesMonad = new MonadState('primesMonad', [3, [2,3], 3, [2,3]], primes_state);

    function primes_state(x) {
      var state = x[0].slice();
      var top = state[2];
      var primes = state[3];
      var newtop = x[1];
      if (newtop == state[0] || newtop == top) {
        return state;
      }

      else if (newtop < top) {
        var temp = primes.filter(v => v <= newtop);
        var q = temp.indexOf(temp[temp.length - 1]);
        temp.push(primes[q + 1]);
        return [primes[q+1], temp, top, primes];
      }

      else {
        while (true) {
          if (primes.every(e =>  (top / e != Math.floor(top / e))))  {
            primes.push(top);
            if (top > newtop) {  // Nesting assures that the new top is prime.
              return [top, primes, top, primes];
            }
          };
          top += 2;
          console.log('In primes_state. top is >>>>> ', top );
        }
      }
    };    `  )

var workerC = h('pre',  `

onmessage = function(ar) {
      importScripts('script2.js');
      var num = ar.data[1];
      var s = ar.data;
      s[2] = num;
      primesMonad.run(s)
      .bnd(s2 => fact(s2)
      .bnd(factors => postMessage(["The prime factors of " + num +
        " are " + factors.join(', '), s2])));
    }    `  )

var fact_workerC = h('pre.red0',  `    onmessage = function(ar) {
      console.log('In workerC.js.  ar is ', ar );
      importScripts('script2.js');
      execP(ar.data[0], ar.data[1] + 1)
      .bnd(primeState => pfactors(primeState, ar.data[1])
      .bnd(factors => postMessage(["The prime factors of " + ar.data[1] +
        " are " + factors.join(', '), primeState])));
    }

    function execP (state, num) {
      var top = state[2];
      var top2 = state[2];
      var primes = state[3];
      var primes2 = state[3]
      var result;
      if (num == state[0] || num == top) {
        result = new MonadState('primesMonad', state);
      }

      else if (num < top) {
        var temp = primes.filter(v => v <= num);
        var q = temp.indexOf(temp[temp.length - 1]);
        temp.push(primes[q + 1]);
        result = new MonadState('primesMonad', [primes[q+1], temp, top, primes]);
      }

      else {
        while (top2 <=  num ) {
          if (primes2.every(e =>  (top / e != Math.floor(top / e))))  {
            primes.push(top);
            top2 = top;
          };
          top += 2;
        }
        result = new MonadState('primesMonad', [top2, primes, top2, primes] );
      }
      return result;
    };

    function execLCM (a, b, primeState) {
      pfactors(primeState, a).bnd(x => {
        pfactors(primeState, b).bnd(y => {
          postMessage([primeState, [a, b, lcm(x,y)]])
        })
      })
    }  `  )

var fact2_workerD = h('pre',  `    onmessage = function(ar) {
      var n = 0;
      importScripts('script2.js');
      var res;
      var a = ar.data[1][0];
      var b = ar.data[1][1];
      var primeState = ar.data[0];
      var decompState = ar.data[2];
      var max = a > b ? a : b
      var c = ar.data[2][3];
      var d = c.length;
      var diff = max - d;
      execP(ar.data[0], max)
      .bnd(primeState => execLCM(a, b, primeState))
    }

    function execLCM (a, b, primeState) {
      pfactors(primeState, a).bnd(x => {
        pfactors(primeState, b).bnd(y => {
          postMessage([primeState, [a, b, lcm(x,y)]])
        })
      })
    }  `  )

var workerD$ = h('pre',  `    const workerD$ = sources.WWD.map(m => {
      console.log('Back in the main thread. m is', m );
      mMfactors6.ret(m.data[0]);
      window['primesMonad'] = new MonadState('primesMonad', m.data[1], primes_state);
      mMfactors8.ret(m.data[2]);
    });  `  )

var execP = h('pre',  `    function execP (x) {
      var state = primesMonad.s.slice();
      var top = state[2];
      var top2 = state[2];
      var primes = state[3];
      var primes2 = state[3].filter(v => v <= top)
      if (x == state[0] || x == top) {
        return (new MonadState('primesMonad', state, primes_state));
      }

      else if (x < top) {
        var temp = primes.filter(v => v <= x);
        var q = temp.indexOf(temp[temp.length - 1]);
        temp.push(primes[q + 1]);
        return (new MonadState('primesMonad', [primes[q+1], temp, top, primes], primes_state));
      }

      else {
        while (top2 <=  x ) {
          if (primes2.every(e =>  (top / e != Math.floor(top / e))))  {
            primes.push(top);
            top2 = top;
          };
          top += 2;
        }
        return (new MonadState('primesMonad', [top, primes, top, primes], primes_state));
      }
    };    `  )

var hardWay = h('div',  [
h('h3', ' Doing Things The Hard Way ' ),
h('h2.red', 'WARNING: EVEN SIMPLE COMPUTATIONS TEND TO HANG' ),  
h('p', ' The next two demonstration generate the same results as the previous two; but in doing so, they also generate and add to a shared and persistent (for the duration of the browser session) array of arrays of prime decompositions of the positive integers. The array is the value of decompMonad.s. It is re-used as the starting point for generating larger arrays, or as a sort of lookup table if a required prime decomposition has already been computed. The index of an array is the number whose decomposition is in the array so, for example, array-of-arrays[12] is [2,2,3]. The actual code will be shown later and is also available at the Github repository. ' ) ])

var hardWay2 = h('div', [
h('p', ' The next demonstration shares the array of arrays of prime decompositions with the previous demonstration. That array is kept in a MonadState instance named "decompMonad". Computing prime decompositions of numbers that end up being ignored is clearly inefficient, so please bear in mind that a demonstration of a JS-monads way to keep mutable state in immutable, composable, globally accessable objects. ' ),
h('label', ' Enter two comma-separated integers here: ' ),
h('input#factors_5b'),

h('br'),
h('br'),

])

var p503j = h('pre',  `
`  )

var cycle = h('div',  [
h('h3', ' A Few Words About Cycle.js ' ),
h('p', ' Opinionated frameworks tend to annoy and frustrate me. Cycle, on the other hand, is easy on my mind. I love it.' ),
h('p', ' In the early stages of developing this website, I had functions that mutated global variables. Sometimes, I directly mutated values in the DOM with statements like "document.getElementById(\'id\').innerHTML = newValue". Cycle didn\'t object. Over time, mutating variables and manhandling the DOM gave way to gentler techniques that I developed in conjunction with the "proof of concept" features that I was in a hurry to get up and running. ' ),
h('p', ' Handling events is a breeze. Drivers eliminate the need to name event emitters or observers. Driver output in main() is available to any function or block of code that is interested. The result of any callback is in an event in a stream of events that automatically merge with the other streams that define main\'s return value, a blueprint for the updated user interface. This is breathtakingly elegant. main() is called only once, when the application loads. After that, the application hums like an enchanted perpetual motion machine. ' ),


h('pre', `function workerDriver () {
  return xs.create({
    start: listener => { worker.onmessage = msg => listener.next(msg)},
    stop: () => { worker.terminate() }
  });
};

function websocketsDriver() {
  return xs.create({
    start: listener => { socket.onmessage = msg => listener.next(msg)},
    stop: () => { socket.close() }
  });
};   ` )      ])




var async1 = h('div', [
h('p', ' The next five demonstrations involve computations of prime numbers, Fibonacci numbers, prime Fibonacci numbers, and prime factors of numbers. Several instances of a constructor named "MonadState" (simple and not an ES6 class) are utilyzed, three of which maintain and share share an array of prime numbers maintained in the MonadState instance named "primesState". An array of arrays of prime factors of numbers is maintained in MonadState instance "decompMonad", which is shared by the fourth and fifth examples in this series of async examples. Here is the definition of MonadState: ' ),
h('pre', `
    function MonadState(g, state) {
      this.id = g;
      this.s = state;
      this.bnd = (func, ...args) => func(this.s, ...args);
    }    ` ),

h('p', ' The first demonstration displays the Fibonacci series up to an upper bound entered in the browser by a user. It also displays a list of the prime Fibonacci numbers in the list of Fibonacci numbers, along with the largest prime number that was generated during a computation. ' ),
h('p', ' The progress display confirmed that it took almost no time to generate the list of Fibonacci numbers or to select the ones that are prime. The bottleneck was computing the primes. To see the effectiveness of saving computed prime numbers, I deleted three zeros and then added them back again. At 100,000,000,000,000 and 1,000,000,000,000, the lag times were  67 microseconds and 124 microseconds, respectively. The display, in a brief flash, showed that those delays occorred mostly during the selection of prime Fibonacci numbers from the array of Fibonacci numbers. Firefox\'s performance was comparable to Chrome\'s. I entered 1,000,000.000,000,000 in the Firefox browser, and after approximately 35 seconds five additional Fibonacci numbers appeared, topped by 806,515,533,049,393. The largest prime number that had to generated to achieve that result was 28,399,249. A total of 2,640,405 prime numbers were generated. ' ),
h('p', ' The demonstrations do not block the main execution thread. Computations are performed in web workers and the results are stored for further use in the main thread. ' ),
h('span', ' According to the '),
h('a', { props: { href: "https://oeis.org/A005478", target: "_blank" } }, 'The On-Line Encyclopedia of Integer Sequences '),
h('span', ' these are the first eleven proven prime Fibonacci numbers:'),
h('span.red', ' 2, 3, 5, 13, 89, 233, 1597, 28657, 514229, 433494437, 2971215073, and 99194853094755497. '),
h('span', ' The eleventh number, 2971215073, is as far as you can go on an ordinary desktop computer. ' ),
h('br' ),
h('p', ' The circles below are red during the computation of A. Fibonacci numbers, B. Prime numbers, and C. prime fibonacci numbers. A, B, and C are shown from left to right. On my desktop computer, the middle circle in the red state starts bcoming briefly discernable a 10,000,000, which is where the largest attainable prime Fibonacci number (2971215073), first appears. The lag time in the Chrome browser at 1,000,000,000,000,000 was a little over thirty-five seconds. After deleting and then replacing the last 0, the delay was under five seconds, demonstrating a significant benefit derived from retrieving previously generated prime numbers instead of computing them again. But once a large array of primes has been generated, lookup times for small number exceeds the time it would take to generate a fresh array of primes. When the square root of the number in the box is less than the largest prime number in primesMonad.s[3], the only circle that turns red is the right one, corresponding to picking out the prime Fibonacci numbers. ')  ])



var async2 = h('div', [
h('div.tao3', mMfactors3.x ),
h('p#monadstate'),
h('h3', 'MonadState and MonadState Transformers'),
h('p', ' The preceding demonstrations used three instances of MonadState: primesMonad, fibsMonad, and factorsMonad. The chat message demonstration uses another instance of MonadState; namely, messageMonadn. Instance of MonadState holds a current state along with a method for updating state. Here again is the definition of MonadState: '),
     //code.MonadState,
h('p', ' MonadState reproduces some of the functionality found in the Haskell Module "Control.Monad.State.Lazy", inspired by the paper "Functional Programming with Overloading and Higher-der Polymorphism", Mark P Jones (http://web.cecs.pdx.edu/~mpj/) Advanced School of Functional Programming, 1995. Transformers take instances of MonadState and return different instances of MonadState. In the prime Fibonacci example, the method call "fibsMonad.bnd(fpTransformer, primesMonad)" returns primesMonad updated so that the largest prime number in primesMonad.s[1] is only slightly larger than the square root of the largest Fibonacci number in fibsMonad.s[3]. Here is the definition of fpTransformer: '),
     //code.fpTransformer,
h('a#err', { props: { href: '#top' } }, 'Back To The Top') ])

var MonadState2 = h('pre',  `    class MonadEmitter extends EventEmitter {}; 

    function MonadState2(g, state) {
      this.id = g;
      this.s = state;
      this.c = new EventEmitter();
      this.bnd = (func, ...args) => func(this.s, ...args);  
      this.ret = function (a) {
        return window[this.id] = new MonadState(this.id, a);
      };
      this.c.on(a, st => {
        mMindex.ret(mMindex.x + 1);
        st[5] = this.s[5].slice();
        st[5].splice(mMindex.x, 0, [st[0], st[1], st[2], st[3], st[4]]);
        window[this.id] = new MonadState2(this.id, st);
      })
    }; `)

var gameMonad = h('pre',  `    var gameMonad = new MonadState2('gameMonad',
      [ 0,0,0,[],[0,0,0,0],[[0,0,0,[],[0,0,0,0]]]]);
`  )

var clicks = h('pre',  `  var numClick$ = sources.DOM
      .select('.num').events('click');

  var numClickAction$ = numClick$.map(e => {
    if (gameMonad.fetch3().length < 2)  {
      var score = gameMonad.fetch0();
      var goals = gameMonad.fetch1();
      var op = gameMonad.fetch2();
      var a = gameMonad.fetch3();
      var b = gameMonad.fetch4();
      a.push(b.splice(e.target.id, 1)[0]);
      gameMonad.run([score,goals,op,a,b]);
      if (a.length === 2 && gameMonad.fetch2() != 0) {
        updateCalc(a, gameMonad.fetch2())
      }
    }
  });

  var opClick$ = sources.DOM
      .select('.op').events('click');

  var opClickAction$ = opClick$.map(e => {
    var s3 = gameMonad.fetch3();
      var score = gameMonad.fetch0();
      var goals = gameMonad.fetch1();
      var a = gameMonad.fetch3().slice();
      var b = gameMonad.fetch4().slice();
    if (s3.length === 2) {
      updateCalc(s3, e.target.innerHTML);
    }
    else {
      gameMonad.run([score,goals,e.target.innerHTML,a,b]);
    }
  });
`  )

var MonadEmitter = h('pre',  `
`  )

var primes= h('pre',  `    function MonadState(g, state) {
      this.id = g;
      this.s = state;
      this.bnd = (func, ...args) => func(this.s, ...args);  
    };

    var primesMonad = new MonadState('primesMonad', [3, [], 3, [2,3]]);
    Object.freeze(primesMonad);

    function isPrime(n) {
       if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false;
       var m = Math.sqrt(n);
       for (var i=2;i<=m;i++) if (n%i==0) return false;
       return true;
    }

    function *gen(x) {
      var x = x
      while(true) {
        if(isPrime(x)) yield x;
        x++;
      }
    }

    var primesIt = gen(primesMonad.s[2]+1);

    function execP (state, num) {   // This function is used to update primesMonad.
      var x = state[2];
      var primes = state[3].slice();
      if (x < num) {
        var end = 0;
        while (end < num) {
          primes.push(primesIt.next().value);
          end = primes[primes.length - 1];
        }
        return [end, primes, end, primes]
      }
      else {
        var number = primes.indexOf(num) + 1;
        var newP = primes.slice(number);
        return [newP[newP.length - 1], newP, x, primes];
      }
    }  `  )

var primes2 = h('pre',  `    const workerB$ = sources.WWB.map(m => {
      console.log('In workerB$ stream in the main thread. m, m[3] ', m, m.data[3] );
      if (m.data[3] === 'color') {  // Updates the color display.
        fill1Monad.ret(m.data[0]);
        fill2Monad.ret(m.data[1]);
        fill3Monad.ret(m.data[2]);
        mMprimeBlurb.ret(m.data[5]);
        mMfibBlurb.ret(m.data[4]);
        mMprimeFibBlurb.ret(m.data[6]);  
      }
      else {
        console.log('m.data[3] ********************', m.data[3] );
        mMelapsed.ret(elapsed(m.data[0][3]))
        .bnd(v =>  console.log(v));
        mMres.ret(m.data[0])
        window['primesMonad'] = new MonadState('primesMonad', m.data[1], primes_state);
      }
    }); `  )

var primes3 = h('pre',  `    var fibKeyPress5$ = sources.DOM
        .select('input#fib92').events('keyup');

    var primeFib$ = fibKeyPress5$.map(e => {
      workerB.postMessage([primesMonad.s, e.target.value]);
    });   `  )

var primes4 = h('pre',  `    execF(ar[1]).bnd(fpTransformer, ar[0], x)  `  )

var gameMonad_2 = h('pre',  `  function MonadState(g, state) {
    this.id = g;
    this.s = state;
    this.bnd = (func, ...args) => func(this.s, ...args);  
    this.ret = function (a) {
      return window[this.id] = new MonadState(this.id, a);
    };
  };

  gameMonad = new MonadState('gameMonad', [ [0,0,0,[],[0,0,0,0] ]]); `)

var styl = h('pre', `  function styl (s) {
    switch(s) {
      case (0): return ['none', 'none', 'none', 'none'];
      break;
      case (1): return ['inline', 'none', 'none', 'none'];
      break;
      case (2): return ['inline', 'inline', 'none', 'none'];
      break;
      case (3): return ['inline', 'inline', 'inline', 'none'];
      break;
      case (4): return ['inline', 'inline', 'inline', 'inline'];
      break;
      default: console.log('The argument(s) provided to styl are flawed'); 
      }
  }

  function bNode (arr) {
    var x = styl(arr.length);
    var node = h('div', [
      h('button#0.num', { style: { display: x[0] }}, arr[0] ),
      h('button#1.num', { style: { display: x[1] }}, arr[1] ),
      h('button#2.num', { style: { display: x[2] }}, arr[2] ),
      h('button#3.num', { style: { display: x[3] }}, arr[3] )
    ]);
    return node;
  }  `  )

var monCon = h('pre',  `
`  )

var newRoll = h('pre',  `  var rollClick$ = sources.DOM
    .select('#roll').events('click');

  var rollClickAction$ = rollClick$.map(() => {
    var a = gameMonad.fetch0().valueOf() - 1;    // Lose one point for clicking ROLL.
    var b = gameMonad.fetch1().valueOf();
    socket.send(\`CA#$42,${pMgroup.x},${pMname.x},6,6,12,20,${a},${b}\`);
  });
`  );

var num_op = h('pre',  `  var rollClick$ = sources.DOM
    .select('#roll').events('click');

  var rollClickAction$ = rollClick$.map(() => {
    var a = gameMonad.fetch0().valueOf() - 1;
    var b = gameMonad.fetch1().valueOf();
    socket.send(\`CA#$42,${pMgroup.x},${pMname.x},6,6,12,20,${a},${b}\`);
  });

  var numClick$ = sources.DOM
      .select('.num').events('click');

  var numClickAction$ = numClick$.map(e => {
    if (gameMonad.fetch3().length < 2)  {
      var score = gameMonad.fetch0();
      var goals = gameMonad.fetch1();
      var op = gameMonad.fetch2();
      var a = gameMonad.fetch3();
      var b = gameMonad.fetch4();
      a.push(b.splice(e.target.id, 1)[0]);
      gameMonad.run([score,goals,op,a,b]);
      if (a.length === 2 && gameMonad.fetch2() != 0) {
        updateCalc(a, gameMonad.fetch2())
      }
    }
  }).startWith([0, 0, 0, 0]);

  var opClick$ = sources.DOM
      .select('.op').events('click');

  var opClickAction$ = opClick$.map(e => {
    var s3 = gameMonad.fetch3();
      var score = gameMonad.fetch0();
      var goals = gameMonad.fetch1();
      var a = gameMonad.fetch3().slice();
      var b = gameMonad.fetch4().slice();
    if (s3.length === 2) {
      updateCalc(s3, e.target.innerHTML);
    }
    else {
      gameMonad.run([score,goals,e.target.innerHTML,a,b]);
    }
  });  `  )

var prototypeAdditions = h('pre',  `  var gameMonad = new MonadState('gameMonad', 
    [[[0,0,0,[],[1,2,3,4]], [0,0,0,[],[0,0,0,0]]],1 ]);

  MonadState.prototype.dec = function () {
    this.s[1] -= 1;
    buttonNode = bNode(this.s[0][this.s[1]][4]);
    socket.send(\`CG#$42,${pMgroup.x},${pMname.x},\${this.s[0][this.s[1]][0]},\${this.s[0][this.s[1]][1]}\`)
    window[this.id] = this;
    return this;
  };

  MonadState.prototype.inc = function () {
    this.s[1] += 1
    buttonNode = bNode(this.s[0][this.s[1]][4]);
    socket.send(\`CG#$42,${pMgroup.x},${pMname.x},\${this.s[0][this.s[1]][0]},\${this.s[0][this.s[1]][1]}\`)
    window[this.id] = this;
    return this;
  };

  MonadState.prototype.fetch0 = function () {
      return this.s[0][this.s[1]][0];
  }
   
  MonadState.prototype.fetch1 = function () {
      return this.s[0][this.s[1]][1];
  }
   
  MonadState.prototype.fetch2 = function () {
      return this.s[0][this.s[1]][2];
  }
   
  MonadState.prototype.fetch3 = function () {
      return this.s[0][this.s[1]][3].slice();
  }
   
  MonadState.prototype.fetch4 = function () {
      return this.s[0][this.s[1]][4].slice();
  }
   
  MonadState.prototype.clearPicked = function () {
    var st = this.s.slice();
    st[0][st[1]][3] = [];
    st[1] += 1;
    st.splice(this.s[1]+1, 0, st[0]); 
    return window['gameMonad'] = new MonadState('gameMonad', st);
  }

  MonadState.prototype.run = function ([
    score = this.s[0][this.s[1]][0], 
    goals = this.s[0][this.s[1]][1],
    operator = this.s[0][this.s[1]][2],
    picked = this.s[0][this.s[1]][3].slice(),
    display = this.s[0][this.s[1]][4].slice()
  ]) {
    this.s[1] += 1;
    var newState = this.s.slice();
    newState[0].splice(this.s[1], 0, [score, goals, operator, picked, display])  
      [score, goals, operator, picked, display]);  
    this.s = newState;
    buttonNode = bNode(display);
    return window['gameMonad'] = new MonadState('gameMonad', newState);
  }  `  )

  var calculations = h('pre', `  function updateCalc(ar, op) {
    var result = calc(ar[0], op, ar[1]);
    if (result === 18 || result === 20) {
      score(result);
    }
    else {
      var sco = gameMonad.fetch0();
      var goals = gameMonad.fetch1();
      var a = gameMonad.fetch4().slice();
      a.push(result);
      gameMonad.run([sco,goals,0,[],a]);
    }
  };

  function score(result) {
    var sc = parseInt(gameMonad.fetch0());
    var sco = result === 18 ? sc + 3 : sc + 1;
    var scor = sco % 5 === 0 ? sco + 5 : sco;
    var goals = gameMonad.fetch1();

    if (scor === 25 && gameMonad.fetch1() === "1") {
      mMindex.ret(0);
      gameMonad = new MonadState('gameMonad', [[0,0,0,[],[0,0,0,0]]]);
      socket.send(\`CE#$42,\${pMgroup.x},\${pMname.x}\`);
      scor = 0;
      goals = 0;
    }
    if (scor === 25 && gameMonad.fetch1() === "0") {
      scor = 0;
      goals = 1;
    }
    newRoll(scor, goals);
  }  ` )

  var todo1 = h('pre',  `    var rep = new RegExp('<<>>', 'g');
    var rep2 = new RegExp(',', 'g');

    function MonadState2(g, state) {
      console.log('someone called with g and state', g, state);
      this.id = g;
      this.s = state;
      this.bnd = (func, ...args) => func(this.s, ...args);  
      this.ret = function (a) {
        return window[this.id] = new MonadState(this.id, a);
      };
    };

    taskMonad = new MonadState2( 'taskMonad', [] );

    MonadState2.prototype.html = "";

    MonadState2.prototype.run2 = function (str) {
     var newAr = str.split('@').map(v => v.split(','));
      newAr.map(v => {
        v[0] = v[0].replace(rep, ',');
        v[1] = eval(v[1]);
      });
      this.s = newAr;
      console.log('In run >>>>>>>>>>>>>>>>>>>> this.s is', this.s );
      // "two",false,"alfred","jane","none"
      var arr = this.s.slice();
      console.log('In MonadState.run2. <o><o><o><o><o><o><o> this.s is', this.s );
      var nodeObject = [];
      var n = -1
      var showCheck, showUnCheck, showGreen, showLineThrough;
      arr.map(a => {
        n+=1
        showCheck = a[1] ? "none" : "inline"
        showUnCheck = a[1] ? "inline" : "none"
        showGreen = a[1] ? "green" : "yellow"
        showLineThrough = a[1] ? "line-through" : "none"
        console.log('In MonadState2.prototype.run2. a[1], showCheck, showUnCheck, showGreen, showLineThrough', 
          a[1] === "checked", showCheck, showUnCheck, showGreen, showLineThrough);
        nodeObject.push(h('div#' + n +'.todo', [
          h('span.task3', { style: { color: showGreen, textDecoration: showLineThrough } }, 'Task: ' + a[0]),
          h('br'),
          h('input#cbx',  { props: { type: 'checkbox', checked: a[1] }}), 
          h('label.tao4', { for: 'cbx', style: {display: showUnCheck}}, 'The task is completed' ),
          h('label.tao4', { for: 'cbx', style: {display: showCheck}}, 'The task is not completed' ),
          h('br'),
          h('span.tao', 'Author: ' + a[2] + ' / ' + 'Responsibility: ' + a[3]),
          h('br'),
          h('button#edit1', {props: {innerHTML: 'edit'}}),
          h('input#edit2', { props: { type:'textarea', value: a[0] }, style: { display: a[4] } }),
          h('button#delete', 'delete'),
          h('br'),
          h('button#chbox1', {style: {display: showUnCheck}}, 'change to not completed'),
          h('button#chbox2', {style: {display: showCheck}}, 'change to completed'),
          h('hr')   
        ])) 
      });  
      taskMonad.html = nodeObject;
  }; `  )

var todo2 = h('pre',  `  // Clicking the checkbox to indicate that a task has been finished.
  var cbx$ = sources.DOM.select('input#cbx').events('click');

  var cbxAction$ = cbx$.map(e => {
    console.log('************************************ event detected');
    var s = taskMonad.s.slice();
    console.log('1 in cbxAction$. s is', s );
    var index = e.target.parentNode.id;
    s[index][1] = eval(s[index][1]) === true ? false : true
    s.map(v => v[0] = v[0].replace(rep2, '<<>>'));
    console.log('2 in cbxAction$. s is', s );
    var str = s.join('@');
    console.log('3 in cbxAction$. str is', str);
    socket.send(\`TD#$42,\${get(pMgroup)},\${get(pMname)},@\${str}\`);
  });

  // Clicking the completed / not completed buttons.
  var chbox1Click$ = sources.DOM.select('#chbox1').events('click');

  var chbox1Action$ = chbox1Click$.map( e => {
    console.log('************************************ event detected');
    var s = taskMonad.s.slice();
    console.log('In chbox1Action. $$$$$$$$$$$$$$$$$$$$$ e and s are', e, s); 
    var index = e.target.parentNode.id;
    s[index][1] = false;
    s.map(v => v[0] = v[0].replace(rep2, '<<>>'));
    var str = s.join('@');
    console.log('In chbox1Action. str is', str); 
    socket.send(\`TD#$42,\${get(pMgroup)},\${get(pMname)},@\${str}\`);  
  });

  var chbox2Click$ = sources.DOM.select('#chbox2').events('click');

  var chbox2Action$ = chbox2Click$.map( e => {
    console.log('************************************ event detected');
    var s = taskMonad.s.slice();
    console.log('In chbox2Action. e and s are', e, s); 
    var index = e.target.parentNode.id;
    s[index][1] = true;
    s.map(v => v[0] = v[0].replace(rep2, '<<>>'));
    var str = s.join('@');
    socket.send(\`TD#$42,\${get(pMgroup)},\${get(pMname)},@\${str}\`);
  });

  // Clicking the DELETE button.
  var deleteClick$ = sources.DOM
      .select('#delete').events('click');

  var deleteAction$ = deleteClick$.map(function (e) {
    console.log('************************************ event detected');
    if (taskMonad.s.length < 2) {
      console.log('Now removing the',pMgroup.x,'file');
      taskMonad.html = '';
      taskMonad.s = [];
      socket.send(\`TX#$42,\${get(pMgroup)},\${get(pMname)}\`);
    }
    else {
      var s = taskMonad.s.slice();
      var index = e.target.parentNode.id;
      s.splice(index, 1);
      s.map(v => v[0] = v[0].replace(rep2, '<<>>'));
      var str = s.join('@');
      socket.send(\`TD#$42,\${get(pMgroup)},\${get(pMname)},@\${str}\`);
    }
  });

  // Editing a task.
  var edit1$ = sources.DOM
      .select('button#edit1').events('click');

  var edit1Action$ = edit1$.map(function (e) {
    console.log('************************************ event detected');
    console.log('In edit1Action$. e is', e );
    var index = getIndex2(e);
    var s = taskMonad.s.slice();
    var str;
    s.map(v => v[0] = v[0].replace(rep2, '<<>>'));
    s[index][4] = 'inline-block';
    str = s.join('@');
    taskMonad.run2(str);  
  });

  var edit2$ = sources.DOM
      .select('#edit2').events('keypress');

  var edit2Action$ = edit2$.map(function (e) {
    console.log('************************************ event detected');
    console.log('In edit2Action$. e is', e );
    var arr;
    var str;
    if (e.keyCode === 13) {
      var s = taskMonad.s.slice();
      var index = e.target.parentNode.id;
      s[index][0] = e.target.value;
      s[index][1] = false;
      s[index][4] = "none";
      s.map(v => v[0] = v[0].replace(rep2, '<<>>'));
      var str = s.join('@');
      socket.send(\`TD#$42,\${get(pMgroup)},\${get(pMname)},@\${str}\`);
    }
  });

  // Creating a new task
  var newTask$ = sources.DOM
      .select('input.newTask').events('keydown');

  var newTaskAction$ = newTask$.map(function (e) {
    console.log('************************************ event detected');
    var alert = '';
    var s = taskMonad.s.slice();
    s.map(v => v[0] = v[0].replace(rep2, '<<>>'));
    console.log('In newTaskAction$. <><><><><><><> s is', s);
    var todo = [];
    if (e.keyCode === 13) {
      var ar = e.target.value.split(',');
      if (ar.length < 3) {
        mMalert.ret('You should enter "author, responsible party, task" separated by commas');
        return;
      }
      else {
        todo[2] = ar.shift();
        todo[3] = ar.shift();
        todo[0] = ar.join(',').replace(rep2, '<<>>');
        todo[1] = false;
        todo[4] = "none";
        s.push(todo);
        console.log('In newTask. s is', s );
        var str = s.join('@');
        console.log('<><><><><><><><><><><><><><><><><><> In newTaskAction$. str is', str);
        socket.send(\`TD#$42,\${get(pMgroup)},\${get(pMname)},@\${str}\`);
      }
    }
  });  ` );



var comments0 = h('pre',  `    comz <- TIO.readFile xcomments
    comms <- atomically $ newTVar comz    `  )


var comments1 = h('pre',  `    else if T.isPrefixOf "GZ#$42" msg             
    then
      do
        comments <- atomically $ readTVar comms
        st <- atomically $ readTVar state
        broadcast (mappend6 (T.pack "ZZ#$42,") group com sender com comments) st 

    mappend6 a b c d e f = mappend a (mappend b (mappend c (mappend d (mappend e f)))) ` )

var comments2 = h('pre',  `    mMZ16.bnd( () => {   
    var a = extra.replace(/(\r\\n|\\n|\r)/gm,"");   // Remove newlines
    mMcomments.ret(commentMonad.run(extra));  // Process in commentMonad.run()
                                              // commentMonad.s[2] displays the result. `)

var comments3 = h('pre', `    var MonadState3 = function MonadState3(g, state) {
      this.id = g;
      this.s = state;
      this.bnd = (func, ...args) => func(this.s, ...args);
      this.ret = function (a) {
        return window[this.id] = new MonadState(this.id, a);
      };
    };

    var commentMonad = new MonadState3('commentMonad',   [ '', [], [] ]);

    MonadState3.prototype.run = function (s0) {
      var n = -1;
      var html = [];
      var str = s0.replace(/<<>>/g, ",")
      .replace(/(\r\\n|\\n|\r)/gm,"");   // Remove newlines
      var ar = str.split('<@>')
      ar = ar.filter(v => ( v != "" ))
      .map(v => v = v.split('<o>'))
      .filter(v =>  ( v.length > 1))
      .filter(v =>  (v[1].length > 0) )
      ar.map(a => {
        var show = showFunc(a[0], pMname.x);
        n+=1;
        html.push(h('div#'+n, [
          h('div', a[0] + ' commented: ' + a[1]),
          h('input#editB', { props: { type:'textarea', value: a[1]}, 
            style: {display: show}}),
          h('button#deleteB', {props: {innerHTML: 'delete'},
            style: {display: show, fontSize:14}}),
          h('br' ),
          h('span', '***************************************************************')
        ]))
      })
      this.s = [str, ar, html]; 
      return html;
    }    `  )

   var comments4 = h('pre',  `  else if T.isPrefixOf "GE#$42" msg 
     then
       do
         a <- atomically $ readTVar comms
         b <- substitute extraNum a extra2
         TIO.writeFile xcomments b
         atomically $ writeTVar comms b
         st <- atomically $ readTVar state
         broadcast (mappend8 "ZE#$42," group com sender com extra com extra2) st   `  )
    
    var comments5 = h('pre',  `  mMZ20.bnd( () => {                 
    var ar = commentMonad.s[1].slice()
    .map(v => v = v.join('<o>'));
    ar[extra] = extra2;           // The comment at index extra becomes extra2 
    var str = ar.join('<@>');
    mMcomments.ret(commentMonad.run(str));  // Run it through commentMonad.run
  });                                       // and update mMcomments
`  )

    var comments6 = h('pre',  `  else if T.isPrefixOf (T.pack "GD#$42") msg              -- DELETE A COMMENT
    then
      do
        old <- atomically $ readTVar comms
        a <- TIO.readFile xcomments
        b <- remove extraNum a
        TIO.writeFile xcomments b
        st <- atomically $ readTVar state
        broadcast (mappend6 (T.pack "ZD#$42,") group com sender com extra) st 
    
  remove :: Int -> Text -> IO Text
  remove n a = do
    let b = T.splitOn at a
    let c = splitAt n b
    let d = mappend (fst c) (drop 1 (snd c))
    return $ T.pack $ intercalate "<@>" (map T.unpack d)

  at :: Text
  at = "<@>"
  // All browsers receive extra (below)
  mMZ21.bnd( () => {    
    var a = commentMonad.s[1].slice();        // commentMonad.s[1] is useful here too.
    a.splice(extra,1);                        // Remove a comment.
    var b = a.map(v => v.join('<o>'));        // re-stringify the comments.
    var c = b.join('<@>'); 
    mMcomments.ret(commentMonad.run(c));      // Re-set the div ids and update the display.
  });
`  )

    var monCon0 = h('pre',  `
`  )

/*
  export default { comments0, comments1, comments2, comments3, comments4, comments5, comments6, todo1, todo2, sco, calculations, prototypeAdditions, styl, num_op, fetch, gameMonad_2, newRoll, primes3, primes2, primes, variations, variations2, MonadEmitter, clicks, bNode, MonadState2, gameMonad, cycle, monad, hardWay, hardWay2, async1, async2, execP, workerD$, fact_workerC, fact2_workerD, primes_state, workerB_Driver, workerC, worker$, errorDemo, monadEr, backAction, tests, mMZ10, test3, monad, equals, fmap, opM, e2, e2x, e3, e4, e4x, e6, e6x, driver, messages, monadIt, MonadSet, updateCalc, arrayFuncs, nums, cleanup, ret, C42, newTask, process, mM$task, colorClick, edit, testZ, quad, runTest, todoStream, inc, seed,  add, MonadState, primesMonad, fibsMonad, primeFibInterface, tr3, fpTransformer, factorsMonad, factorsInput, promise, promiseSnippet, timeout, timeoutSnippet, examples, examples2 } */
