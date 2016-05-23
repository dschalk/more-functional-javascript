import Cycle from '@motorcycle/core';
import {h, p, span, h1, h2, h3, br, div, label, input, hr, makeDOMDriver} from '@motorcycle/dom';
import {just, create, merge, combine, fromEvent, periodic, observe, delay, filter, of} from 'most';
import code from './code.js';

function createWebSocket(path) {
    let host = window.location.hostname;
    if(host == '') host = 'localhost';
    let uri = 'ws://' + host + ':3055' + path;
    let Socket = "MozWebSocket" in window ? MozWebSocket : WebSocket;
    return new Socket(uri);
}

const socket = createWebSocket('/');

const websocketsDriver = function () {
    return create((add) => {
      socket.onmessage = msg => add(msg)
    })
}

const unitDriver = function () {
  return periodic(1000, 1);
}

window.onload = function (event) {
  console.log('onopen event: ', event);
};

function main(sources) {

  setTimeout( function() {
    document.querySelector('input#login').focus();
    mM$fib5.ret( [ 0, 1, 1, [0] ] );
    mM$prime5.ret([[2], 3, 3]);
    mM$primeFibs.ret([[2], 3, 3, [2,3]]); 
    mM$fib2.ret([0, 1, []]);
    mM$fib4.ret( [ 0, 1, 1, [0] ] );
  },1200 );

  mMZ1.bnd(v => O.mMt1.bnd(add,v,mMt1)
  .bnd(cube,mMt2)
  .bnd(() => mMt3.ret(O.mMt1.x + ' cubed is ' + O.mMt2.x)))
  
  mMZ2.bnd(v => cube(v).bnd(w => mMt3.ret(v + ' cubed is ' + w)))
  
  const messages$ = (sources.WS).map(e => {
    console.log('******____&&&&&&&&&&&&&&&&&&&____**************_In messages$  e.data is: ', e.data)
    mMtem.ret(e.data.split(',')).bnd(v => {
    mMZ10.bnd(() => {
      mM$2.ret([])
      mM$1.ret([v[3], v[4], v[5], v[6]])})
    mMZ11.bnd(() => updateScoreboard(v[3]));
    mMZ12.bnd(() => mM6
      .ret(v[2] + ' successfully logged in.'))
    mMZ13.bnd(() => updateMessages(v))
    mMZ14.bnd(() => mMgoals2.ret('The winner is ' + v.x ))
    mMZ15.bnd(() => mMgoals2.ret('A player named ' + 
      O.mMname.x + 'is currently logged in. Page will refresh in 4 seconds.')
      .bnd(refresh))
    mMZ16.bnd(() => {
      if (v[3] == 'no file') {
        mMtaskList.ret([])
      } 
      else {
        process(e.data)
      }
    })
    mMtemp.ret(e.data.split(',')[0])
      .bnd(next, 'CA#$42', mMZ10)
      .bnd(next, 'CB#$42', mMZ11)
      .bnd(next, 'CC#$42', mMZ12)
      .bnd(next, 'CD#$42', mMZ13)
      .bnd(next, 'CE#$42', mMZ14)
      .bnd(next, 'EE#$42', mMZ15)
      .bnd(next, 'DD#$42', mMZ16)
    }) 
  });
  
  const updateMessages = function updateMessages (ar) {
    var sender = ar[2];
    mMhelper.ret(ar)
      .bnd(splice, 0, 3, mMhelper)
      .bnd(reduce, ((a,b) => {return a + ', ' + b}), mMhelper)
      .bnd(v => O.mMmsg.bnd(unshift, h('div', sender + ': ' + v), O.mMmsg));
  }

  const loginPress$ = sources.DOM
    .select('input#login').events('keypress');

  const loginPressAction$ = loginPress$.map(e => {
    let v = (e.target.value);
    if (v == '' ) {
      return;
    } 
    if( e.keyCode == 13 ) {
      socket.send("CC#$42" + v);
      mMname.ret(v.trim())
      mM3.ret([]).bnd(mM2.ret);
      e.target.value = '';
      document.getElementById('dice').style.display = 'block';
      document.getElementById('rightPanel').style.display = 'block';
      document.getElementById('log1').style.display = 'none';
      document.getElementById('log2').style.display = 'block';
      document.getElementById('gameDiv2').style.display = 'block';
    }
  });

  const groupPress$ = sources.DOM
    .select('input#group').events('keypress');

  const groupPressAction$ = groupPress$.map(e => {
    let v = e.target.value;
    if( e.keyCode == 13 ) {
      mMgroup.ret(v);
      socket.send(`CO#$42,${v},${O.mMname.x.trim()},${v}`);
    }
  });

  const messagePress$ = sources.DOM
    .select('input.inputMessage').events('keydown');

  const messagePressAction$ = messagePress$.map(e => {
    if( e.keyCode == 13 ) {
      socket.send(`CD#$42,${O.mMgroup.x.trim()},${O.mMname.x.trim()},${e.target.value}`);
      e.target.value = '';
    }
  });

  const newTask$ = sources.DOM
    .select('input.newTask').events('keydown');

  const newTaskAction$ = newTask$.map(e => {
      let ob = {};
      var alert = '';
      var task = '';
      if( e.keyCode == 13 ) {
        var ar = e.target.value.split(',');
        if ( ar.length < 3 ) {
          alert = 'You should enter "author, responsible party, task" separated by commas';
          document.getElementById('alert').innerHTML = alert;
        }
        var ar2 = ar.slice(2);
        console.log('*************************************$$$$$$$$$$$_ar ', ar);
        if (ar2.length == 1) {
          task = ar[2];
        }
        if (ar2.length > 1) {
          task = ar2.reduce((a,b) => a + '$*$*$' + b);
        }
        if ( (O.mMar2.x.filter(v => (v.task == task)).length) > 0 ) {
          document.getElementById('alert').innerHTML = task + " is already listed.";
        }
        else if ( ar.length > 2 ) {
          O.mMcurrentList.bnd(addString, task + ',yellow, none, false,' +  ar[0] + ',' + ar[1], mM$taskList)
          e.target.value = '';
          document.getElementById('alert').innerHTML = '';
        } 
      } 
  });

  const process = function(str) {
    var a = str.split(",");
    if (a == undefined) {
      return;
    };
    if (a.length < 9) {
      return
    };
    var ob = {};
    var ar = a.slice(3)
    var s = ar.reduce((a,b) => a + ',' + b);
    console.log('In process. ar and s are: ', ar, s);
    var tempArray = [];
    if (ar.length < 6) {return};
    if ((ar.length % 6) !== 0) {
      document.getElementById('alert').innerHTML = 'Error: array length is: ' + length;
    } 
    mMcurrentList.ret(s);
    process3(ar);
  }
    
  const process3 = function(a) {
    var ar5 = [];
    var keys = Array(a.length/6).fill(1);
    keys.map(_ => {
      ar5.push(
        {
          task: convertBack(a.shift()),
          color: a.shift(),
          textDecoration: a.shift(),
          checked: a.shift() === 'true',
          author: a.shift(),
          responsible: a.shift()
        }
      )
    })
    mMar2.ret(ar5);
    process4(ar5);
  };

  const process4 = function(a) {
    var tempArray = [];
    let keys = Object.keys(a);
    for (let k in keys) {
      tempArray.push(
        h('div.todo',  [
          h('span.task3', {style: {color: a[k].color, textDecoration: a[k].textDecoration}},
              'Task: ' + a[k].task  ),  
          h('br'),
          h('button#edit1', 'Edit'  ),
          h('input#edit2', {props: {type: 'textarea', value: a[k].task}, style: {display: 'none'}}  ), 
          h('span#author.tao', 'Author: ' + a[k].author  + ' / ' + 'Responsibility: ' + a[k].responsible),
          h('br'),
          h('input#cb', {props: {type: 'checkbox', checked: a[k].checked}, style: {color: a[k].color,
               textDecoration: a[k].textDecoration} } ), 
          h('label.cbox', { props: {for: '#cb'}}, 'Completed' ),
          h('button.delete', 'Delete'  ),  
          h('br'),
          h('hr')])
      )
    }
    mMtaskList.ret(tempArray)
  }

  const colorClick$ = sources.DOM
    .select('#cb').events('click')
    
  const colorAction$ = colorClick$.map(e => {
    let index = getIndex(e);
    let s = O.mMcurrentList.x;
    let ar = s.split(',');
    let n = 6 * index + 3;
    let j = 6 * index + 2;
    let k = 6 * index + 1;
    let checked = ar[n];
    if (checked == 'true')  {
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

  const edit1$ = sources.DOM
    .select('#edit1').events('click')
    
  const edit1Action$ = edit1$.map(e => {
    let index = getIndex2(e);
    O.mMtaskList.x[index].children[3].elm.style.display = 'block';
  });

  const edit2$ = sources.DOM
    .select('#edit2').events('keypress')
    
  const edit2Action$ = edit2$.map(e => {
    let v = e.target.value;
    let index = getIndex2(e);
    if( e.keyCode == 13 ) {
      process2(v, index);
    O.mMtaskList.x[index].children[3].elm.style.display = 'none';
    }
  });

  const process2 = function(str, index) {
    let a = O.mMcurrentList.x;
    let ar = a.split(',');
    let task = str.split(',').reduce((a,b) => ar + '$*$*$' + b)
    ar[index * 6] = task;
    let s = ar.reduce((a,b) => a + ',' + b);
    mM$taskList.ret(s);
  };

  const deleteClick$ = sources.DOM
    .select('.delete').events('click')
    
  const deleteAction$ = deleteClick$.map(e => {
    let index = getIndex(e);
    let s = O.mMcurrentList.x;
    let ar = s.split(',');
    let str = '';
    ar.splice(index*6, 6);
    if (ar.length > 0) {
      mM$taskList.ret(ar.reduce((a,b) => a + ',' + b));
    } else {
      socket.send('TX#$42' + ',' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() ); 
      mMtaskList.ret('');
    } 
  });

  const chatClick$ = sources.DOM
    .select('#chat2').events('click');

  const chatClickAction$ = chatClick$.map(() => {
    var el = document.getElementById('chatDiv');
    (el.style.display == 'none') ?
    el.style.display = 'inline' :
    el.style.display = 'none' 
  });
     
  const captionClick$ = sources.DOM
    .select('#caption').events('click');

  const captionClickAction$ = captionClick$.map(() => {
    var el = document.getElementById('captionDiv');
    (el.style.display == 'none') ?
    el.style.display = 'inline' :
    el.style.display = 'none' 
  });
     
  const gameClick$ = sources.DOM
    .select('#game').events('click');

  const gameClickAction$ = gameClick$.map(() => {
    var el = document.getElementById('gameDiv');
    (el.style.display == 'none') ?
    el.style.display = 'inline' :
    el.style.display = 'none' 
    
    var el2 = document.getElementById('gameDiv2');
    (el2.style.display == 'none') ?
    el2.style.display = 'inline' :
    el2.style.display = 'none' 
  });
     
  const runTest$ = sources.DOM
    .select('#runTest').events('click')
    
  const runTestAction$ = runTest$.map(() => {
    runTest();
});

  const todoClick$ = sources.DOM
    .select('#todoButton').events('click')
    
  const todoClickAction$ = todoClick$.map(e => {
    var el = document.getElementById('todoDiv');
    (el.style.display == 'none') ?
    el.style.display = 'inline' :
    el.style.display = 'none' 
});

  const numClick$ = sources.DOM
    .select('.num').events('click');
     
  const numClickAction$ = numClick$.map(e => {
    console.log('In numClickAction$ O.mM3.x and e are: ', O.mM3.x, e);
    if (O.mM3.x.length < 2) {
      O.mM3.bnd(push, e.target.innerHTML, O.mM3)
      // mMtemp.ret(O.mMhistorymM1.x[O.mMindex2.x])
      O.mMallRolls.bnd(spliceRemove, O.mMindex2.x, e.target.id, mM$1)
      if (O.mM3.x.length === 2 && O.mM8.x !== 0) {
        updateCalc();
      }
    };
  }).startWith([0,0,0,0]);
    
  const opClick$ = sources.DOM
    .select('.op').events('click');

  const opClickAction$ = opClick$.map(e => {
    mM8.ret(e.target.textContent);
    if (O.mM3.x.length === 2) {
      updateCalc();
    }
  })

  const rollClick$ = sources.DOM
    .select('.roll').events('click');

  const rollClickAction$ = rollClick$.map(e => {  
    mM13.ret(O.mM13.x - 1);
    mM8.ret(0);
    mM3.ret([]);
    socket.send('CG#$42,' + O.mMgroup.x.trim() + ',' + 
        O.mMname.x.trim() + ',' + -1 + ',' + O.mMgoals.x);
    socket.send('CA#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',6,6,12,20')
  });

  // ************************************************************************* Original Fibonacci enter
  mM$fib.stream.addListener({
    next: v => {
      if (v[2] > 1) {mM$fib.ret([v[1], v[0] + v[1], v[2] -1])}
      else {
        console.log(v[0]);
        mM19.ret(v[0]);
      }
    },
    error: err => console.error(err),
    complete: () => console.log('completed')
  });

  const fibPress$ = sources.DOM
    .select('input#code').events('keydown');

  const fibPressAction$ = fibPress$.map(e => {
    if (e.target.value == '') {return};
    if( e.keyCode == 13 && Number.isInteger(e.target.value*1) ) {
      mM21.ret(e.target.value);
      mM$fib.ret([0, 1, e.target.value]);
    }
    if( e.keyCode == 13 && !Number.isInteger(e.target.value*1 )) {
      mM19.ret("You didn't provide an integer");
    }
  });
// ************************************************************************* END Original Fibonacci END

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START fib  
  
  const fibKeyPress5$ = sources.DOM
    .select('input#fib3335').events('keydown');

  const fibKeyPressAction5$ = fibKeyPress5$.map(e => {
    console.log('In fibKeyPressAction');
    if (e.target.value == '') {return};
    if( e.keyCode == 13 && Number.isInteger(e.target.value*1) ) {
      console.log('releasing mMitterFib5');
      mMitterFib5.release(e.target.value);
    }
    if( e.keyCode == 13 && !Number.isInteger(e.target.value*1 )) {
        document.getElementById('fib5').innerHTML = "You didn't provide an integer";
    }
  });

  mM$fib5.stream.addListener({
    next: v => {
      var a = v[1];         // Fibonacci number
      var b = v[0] + v[1];  // Fibonacci number
      var c = v[2];         // Limit
      var d = v[3];         // List of Fibonacci numbers
      let wd = JSON.parse(JSON.stringify(d));
      d.push(a);
      if (a < c) {mM$fib5.ret([a,b,c,d])}
      else {
        mMfibSave.ret([a, b, c, d]);
        document.getElementById('fib5').innerHTML = wd; 
      };
      mMitterFib6.bnd(limit => {
        let w = JSON.parse(JSON.stringify(O.mMfibSave.x[3]));
        let e = [O.mMfibSave.x[0], O.mMfibSave.x[1], limit, w];
        mM$fib5.ret(e);
      }) 
      mMitterFib5.bnd(
        x => {
          console.log('In mMitterFib5.bnd -- x is: ', x);
          if (x > (v[3][v[3].length - 1])) {
            console.log('In the x > ... test. x and v are: ', x, v);
            mMitterFib6.release(x);
          }
          else {
            var ar1 = O.mMfibSave.x[3];
            var ar = ar1.filter(v => v <= x);
            console.log('In mMitterFib4.bnd x < largest   x, ar1, and ar are: ', x, ar1, ar);
            document.getElementById('fib5').innerHTML = ar; 
          }
      })
    },
    error: err => console.error(err),
    complete: () => console.log('completed')
  });


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END fib END 

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> basic prime
  const primeKeyPress5$ = sources.DOM
    .select('input#prime3336').events('keydown');

  const primeKeyPressAction5$ = primeKeyPress5$.map(e => {
    if (e.target.value == '') {return};
    if( e.keyCode == 13 && Number.isInteger(e.target.value*1) ) {
      console.log('In primeKeyPressAction5');
      mMitterPrime5.release(e.target.value);
    }
    if( e.keyCode == 13 && !Number.isInteger(e.target.value*1 )) {
        document.getElementById('prime5').innerHTML = "You didn't provide an integer";
    }
  });

  mM$prime5.stream.addListener({
    next: v => {
      while ((v[0][v[0].length - 1]) < v[2]) {
        for (let i in v[0]) {
          if ((v[1] % v[0][i]) == 0) {
            mM$prime5.ret([v[0], v[1] + 1, v[2]]);
          }
          if (i == (v[0].length - 1)) {
            v[0].push(v[1]);
          }
        }
      }
      let ar = JSON.parse(JSON.stringify(v[0]));
      ar.pop();
      document.getElementById('prime5').innerHTML = ar;
      mMitterPrime5.bnd(x => {
        if (x > (v[0][v[0].length - 1])) {
          mM$prime5.ret([v[0], v[1] + 1, x]);
        }
        else {
          let ar2 = JSON.parse(JSON.stringify(v[0]));
          let trunc = ar2.filter(a => a < x);
          document.getElementById('prime5').innerHTML = trunc;
        }
      })
    },
    error: err => console.error(err),
    complete: () => console.log('completed')
  });

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> END basic prime END

// *************************************************************<<<<<<>>>>>  START prime fib

  const primeKeyPress2$ = sources.DOM
    .select('input#prime3334').events('keydown');

  const primeKeyPressAction2$ = primeKeyPress2$.map(e => {
    if (e.target.value == '') {return};
    if( e.keyCode == 13 && Number.isInteger(e.target.value*1) ) {
      mMitterFib4.release(e.target.value);
    }
    if( e.keyCode == 13 && !Number.isInteger(e.target.value*1 )) {
      mM19.ret("You didn't provide an integer");
    }
  });

  mM$fib4.stream.addListener({
    next: v => {
      var a = v[1];         // Fibonacci number
      var b = v[0] + v[1];  // Fibonacci number
      var c = v[2];         // Limit
      var d = v[3];         // List of Fibonacci numbers
      let wd = JSON.parse(JSON.stringify(d));
      d.push(a);
      if (a < c) {mM$fib4.ret([a,b,c,d])}
      else {
        mMfibSave2.ret([a, b, c, d]);
        document.getElementById('fib4').innerHTML = wd; 
        mMitterPrimeFibs.release([v[0], wd]);
      };
      mMitterFib8.bnd(limit => {
        let e = [O.mMfibSave2.x[0], O.mMfibSave2.x[1], limit, O.mMfibSave2.x[3]];
        mM$fib4.ret(e);
      }) 
      mMitterFib4.bnd(
        x => {
          if (x > (v[3][v[3].length - 1])) {
            mMitterFib8.release(x);
          }
          else {
            var ar1 = JSON.parse(JSON.stringify(O.mMfibSave2.x[3]));
            var ar = ar1.filter(v => v <= x);
            mMitterPrimeFibs.release([ar[ar.length - 1], ar]);
            document.getElementById('fib4').innerHTML = ar; 
          }
      })
    },
    error: err => console.error(err),
    complete: () => console.log('completed')
  });

  mM$primeFibs.stream.addListener({
    next: v => {
      while (v[2] > v[0][v[0].length - 1]) {
        for (let i in v[0]) {
          if ((v[1] % v[0][i]) == 0) {
            mM$primeFibs.ret([v[0], v[1] + 1, v[2], v[3]]);
          }
          if (i == (v[0].length - 1)) {
            v[0].push(v[1]);
            document.getElementById('prime2').innerHTML = v[0];
          }
        }
      }
      mMitterFib9.bnd(k => {
        let ar = v[0].filter(function(n) {
          return v[3].indexOf(n) != -1;
        })
        mM$PF.ret([k, ar]);
      });
      mMitterFib7.bnd(z => {
        let recent = v[0][v[0].length - 1];
        mM$primeFibs.ret([ v[0], v[1] + 1, z[0], z[1] ]);
      })
      mMitterPrimeFibs.bnd(
        x => {
          if (x[0] > v[0][v[0].length - 1]) { 
            mMitterFib7.release(x);
          }
          else {
            var ar = JSON.parse(JSON.stringify(v[0]));
            var ar2 = ar.filter(v => v <= x[0]);
            var num = ar[ar2.length];
            ar2.push(num);
            document.getElementById('prime2').innerHTML = ar2;
          }
          mMitterFib9.release(x[0]);
        }
      )
    },
    error: err => console.error(err),
    complete: () => console.log('completed')
  });

  mM$PF.stream.addListener({
    next: x => {
      console.log('>>>>>>>>>>>>>> In mM$PF.stream listener. x is: ', x );
      if (x[0] < x[1][x[1].length - 1]) {
        console.log('In the if block in the mM$PF.stream listener.');
        let ar = JSON.parse(JSON.stringify(x[1]));
        let ar2 = ar.filter(v => v <= x[0]);
        document.getElementById('primeFibs').innerHTML = ar2;
      }
      else {document.getElementById('primeFibs').innerHTML = x[1];}
    },
  error: err => console.error(err),
  complete: () => console.log('completed')
  });

 

// ************************************************************************************** END prime fib END

  const forwardClick$ = sources.DOM
    .select('#forward2').events('click');

  const backClick$ = sources.DOM
    .select('#back2').events('click');

  const forwardClickAction$ = forwardClick$.map(() => {
    if (O.mMindex2.x < (O.mMallRolls.x.length - 1)) {
      inc(O.mMindex2.x, mMindex2)
      .bnd(() => mM$3.ret('Hello'))
    }
  });

  const backClickAction$ = backClick$.map(() => {
    if (O.mMindex2.x > 0) {
      console.log('In backClickAction$ O.mMindex2.x is: ', O.mMindex2.x);
      dec(O.mMindex2.x, mMindex2)
      .bnd(() => mM$3.ret('You bet!'))
      console.log('In backClickAction$ again ***** O.mMindex2.x is: ', O.mMindex2.x);
    }
  });

  const taskAction$ = mM$taskList.stream.addListener({
    next: str => {
    console.log('In taskAction$. str is: ', str)
    socket.send('TD#$42' + ',' + O.mMgroup.x.trim() + 
        ',' + O.mMname.x.trim() + ',' + '@' + str);
    },
    error: err => console.error(err),
    complete: () => console.log('completed')
  });

  const mM$1Action$ = mM$1.stream.addListener({
    next: v => {
      console.log('In mM$1Action$. v is: ', v)
      O.mMindex2.bnd(inc, mMindex2);
      O.mMallRolls.bnd(spliceAdd, O.mMindex2.x, v, mMallRolls);
      mMcurrentRoll.ret(v);
      document.getElementById('0').innerHTML = (O.mMallRolls.x[O.mMindex2.x])[0]; 
      document.getElementById('1').innerHTML = (O.mMallRolls.x[O.mMindex2.x])[1]; 
      document.getElementById('2').innerHTML = (O.mMallRolls.x[O.mMindex2.x])[2]; 
      document.getElementById('3').innerHTML = (O.mMallRolls.x[O.mMindex2.x])[3]; 
      cleanup(7)
    },
    error: err => console.error(err),
    complete: () => console.log('completed')
  })

  const mM$3Action$ = mM$3.stream.addListener({
    next: v => {
      console.log('In mM$3Action$. v is: ', v)
      document.getElementById('0').innerHTML = (O.mMallRolls.x[O.mMindex2.x])[0]; 
      document.getElementById('1').innerHTML = (O.mMallRolls.x[O.mMindex2.x])[1]; 
      document.getElementById('2').innerHTML = (O.mMallRolls.x[O.mMindex2.x])[2]; 
      document.getElementById('3').innerHTML = (O.mMallRolls.x[O.mMindex2.x])[3]; 
      cleanup(11);
    },
    error: err => console.error(err),
    complete: () => console.log('completed')
  })

  const testZ = sources.DOM
    .select('#testZ').events('click')
  const testZAction$ = testZ.map(() =>
    mMZ1.release(1));                                

  const testQ = sources.DOM
    .select('#testQ').events('click')
  const testQAction$ = testQ.map(() =>
    mMt1.ret(-1).bnd(mM2.ret)
    .bnd(() => mMZ1.release(1)));                                

  const testW = sources.DOM
    .select('#testW').events('keypress')
  const testWAction$ = testW.map((e) => {
    if( e.keyCode == 13 ) {
      mMZ2.release(e.target.value)
    }
  });

  var solve = (function solve () {
    mMZ3
    .bnd(a => mMquad1.ret(a + 'x**2')
    .bnd(() => mMquad2.ret('').bnd(mMquad3.ret) // Clear the display.
    .bnd(() => 
    mMZ3
    .bnd(b => mMquad1.ret(a + 'x**2 ' + ' + ' + b + 'x')
    .bnd(() =>  
    mMZ3
    .bnd(c => mMquad1
    .ret('Solutions for ' + a + 'x**2 ' + ' + ' + b + 'x' + ' + ' + c + ' = 0:')
    .bnd(() => mMquad2.bnd(sol1,a,b,c,mMquad2)
    .bnd(() => mMquad3.bnd(sol2,a,b,c,mMquad3) 
    .bnd(() => solve()    
        )))))))))
  })();

  const quad$ = sources.DOM
    .select('#quad').events('keypress')
  const quadAction$ = quad$.map((e) => {
    if( e.keyCode == 13 ) {
      mMZ3.release(e.target.value)
      document.getElementById('quad').value = '';
    }
  });

  const calcStream$ = merge( fibKeyPressAction5$, primeKeyPressAction5$, fibPressAction$, primeKeyPressAction2$, runTestAction$, quadAction$, testWAction$, testZAction$, testQAction$, edit1Action$, edit2Action$, colorAction$, deleteAction$, newTaskAction$, chatClickAction$, gameClickAction$, todoClickAction$, captionClickAction$, backClickAction$, forwardClickAction$, groupPressAction$, rollClickAction$, messagePressAction$, loginPressAction$, messages$, numClickAction$, opClickAction$ );
  
    return {
      DOM: 
        calcStream$.map(() => 
        h('div.content', [ 
        h('div#rightPanel',  {style: {display: 'none'}}, [
          h('span#tog', [
          h('button#game',  {style: {fontSize: '16px'}}, 'TOGGLE GAME'  ), 
          h('span.tao',' ' ),
          h('button#todoButton',  {style: {fontSize: '16px'}}, 'TOGGLE TODO LIST'  ),  
          h('br'),
          h('br'),
          h('button#chat2',  {style: {fontSize: '16px'}}, 'TOGGLE CHAT'  ),
          h('span.tao',' ' ),
          h('button#caption',  {style: {fontSize: '16px'}}, 'TOGGLE CAPTION'  )  ]),
          h('br'),
          h('br'),
          h('br'),
          h('br'),

          h('div#gameDiv',   [
          h('span',  'Group: ' + O.mMgroup.x ),
          h('br'),
          h('span',  'Goals: ' + O.mMgoals.x ),
          h('br'),
          h('span',  'Name: ' + O.mMname.x ),
          h('br'),
          h('span', 'player[score][goals]' ),
          h('div', O.mMscoreboard.x ) ]) ,
          h('br'),
          h('br'),  
          h('br'),  
    
          h('div#todoDiv',  [ 
            h('div#taskList', O.mMtaskList.x ),
            h('span', 'Author, Responsible Person, Task: '  ),  
            h('input.newTask' ) ]),
          h('br'),
          h('span#alert' ),
          h('br'),
          h('br'),

          h('div#chatDiv', [ 
          h('div#messages',  [
          h('span', 'Message: '  ),
          h('input.inputMessage' ),
          h('div', O.mMmsg.x  ) ]) ]) 
        ]),
        h('div.leftPanel', {  style: {width: '60%'   }},   [  
        h('br'),
        h('a.tao', {props: {href: '#common'}}, 'Common Patterns'   ),  
        h('a.tao', {props: {href: '#tdList'}}, 'Todo List Explanation'   ),  
        h('a.tao', {props: {href: '#monads'}}, 'Why Call Them Monads'   ),  
        h('div#captionDiv', [
        h('h1', 'Motorcycle.js With JS-monads' ),
        h('span.tao1', ' A shared, persistent todo list, ' ),
        h('br'),
        h('span.tao1', ' A websockets game with a traversable history of dice rolls, ' ),
        h('br'),
        h('span.tao1', ' Group chat rooms and more demonstrations of efficient, ' ),
        h('br'),
        h('span.tao2', ' maintainable code using Motorcycle.js and JS-monads.  ' ) ] ),
        h('br'),
        h('span.tao', 'This is a ' ),
        h('a', {props: {href: "https://github.com/motorcyclejs", target: "_blank" }}, 'Motorcycle.js' ),
        h('span', ' application. Motorcycle.js is ' ), 
        h('a', {props: {href: "https://github.com/cyclejs/core", target: "_blank" }}, 'Cycle.js' ),
        h('span', ' using ' ),
        h('a', {props: {href: "https://github.com/cujojs/most", target: "_blank" }}, 'Most' ),
        h('span', ' , ' ),
        h('a', {props: {href: "https://github.com/TylorS/most-subject", target: "_blank" }}, 'Most-subject' ),
        h('span', ' and '  ), 
        h('a', {props: {href: "https://github.com/paldepind/snabbdom", target: "_blank" }}, 'Snabbdom' ),
        h('span', ' instead of RxJS and virtual-dom. The repository is at '  ),
        h('a', {props: {href: "https://github.com/dschalk/JS-monads-stable", target: "_blank" }}, 'JS-monads-stable' ),

        h('div#gameDiv2',  {style: {display: 'none'}}, [
        h('br'),
        h('span', ' Here are the basic rules:' ), 
        h('p', 'RULES: If clicking two numbers and an operator (in any order) results in 20 or 18, the score increases by 1 or 3, respectively. If the score becomes 0 mod 5, 5 points are added. A score of 25 results in one goal. That can only be achieved by arriving at a score of 20, which jumps the score to 25. Directly computing 25 results in a score of 30, and no goal. Each time ROLL is clicked, one point is deducted. Three goals wins the game. '    ),
        h('button#0.num'),
        h('button#1.num'),
        h('button#2.num'),
        h('button#3.num'),
        h('br'),
        h('button#4.op', 'add'  ),
        h('button#5.op', 'subtract' ),
        h('button#5.op', 'mult' ),
        h('button#5.op', 'div' ),
        h('button#5.op', 'concat' ),
        h('br'),
        h('div#dice', {style: {display: 'none'}}, [ 
        h('button.roll', 'ROLL' ),
        h('br'),
        h('button#back2', 'BACK'  ),
        h('button#forward2', 'FORWARD'  ) ]) ]),
        h('div.winner', O.mMgoals2.x+''  ),
        h('div#log1', [
        h('p', 'IN ORDER TO SEE THE DEMONSTRATIONS, YOU MUST ENTER SOMETHING BELOW.'  ),
        h('span', 'Name: ' ),
        h('input#login', {props: {placeholder: "focus on; start typing"}} ) ]),
        h('p', O.mM6.x.toString() ),
        h('div#log2', {style: {display: 'none'}}, [
        h('span', 'Change group: '  ),
        h('input#group' ) ]),
        h('p',  O.mMsoloAlert.x  ),
        h('p', 'People who are in the same group, other than solo, share the same todo list, messages, and simulated dice game. In order to see any of these, you must establish an identity on the server by logging in. The websockets connection would terminate if the first message the server receives does not succefully participate in the login handshake. '  ),
        h('hr' ),
        h('h1', 'The Monads'  ),
        h('p', ' There are three basic types of monads: Monad, MonadIter, and MonadStream. Instances of Monad have a method called "bnd" which takes a function and possibly other values as arguments. I have not created a comprehensive library of functions for bnd(), but most of the functions used in this demonstration are in the NPM package "js-monads", and all of them are in the Github repository. I create functions to suit specific purposes and I assume that anyone who uses these monads, or their own variations on the theme, will likewise want to create functions to suit their specific purposes. ' ),
        h('p', ' There is a basic pattern that I have found useful for computations and manipulating objects, including arrays. add() and cube() are examples of the pattern. They will be defined and used in the examples below. ' ),
        h('h2', 'Monad' ),
        code.monad,
        h('p', 'The following statements create instances of Monad named "m" with initial values of "some value": var m = new Monad("some value", "m") and ret("some value", "m"). Monad instances maintain state in the unique, mutable, global object named "O". Where there is changing state, it is not practical to avoid mutating something. My choices narrowed down to the window object or an attribute of window like O. O seemed like the better choice. It is a place to keep the most recent versions of named monads. Earlier versions of named monads can persist elsewhere, or be left for the gargage collector.   ' ),
        h('p', ' In the examples shown on this page, the initial values of instances of Monad remain unchaged. The ret() method places updated instances on O. The instances on O are never mutated. For any instance of Monad named m with id "m" and value v (i.e., m.x == v is true), m.ret(v2) creates a new attribute of O with key "m" or, if O.m already exists, m.ret(v2) mutates O by replacing its m attribute\'s value. The monad O.m is not mutated, so any O.m that is replaced will persist if there is a reference to it, or will be subject to garbage collection if there is not. ' ),
        h('h3', 'Examples' ),
        h('p', ' Here are the definitions of ret(), add(), and cube(): '  ),
        code.ret_add_cube,
        h('p', ' calling ret() with only one argument creates an anonymous global monad. There is no reference to it, so when a computation sequence using it terminates, it becomes eligeble for garbage collection. Although the monad\'s scope is global, it can\'t be clobbered because it has no name (no variable referring to it). ' ),
        h('p', ' As you see, cube() and ret() are overloaded functions. Here are some examples of various ways of using them: ' ),
        h('span.red3', 'cube(3)' ),
        h('span.td2', ' creates a useless anonymous monad with x == 27 and id == "anonymous". ' ),
        h('br' ),  
        h('br' ),  
        h('span.red3', 'cube(5, m)' ), 
        h('span.td2', ' where m is a monad leaves m unchanged, O.m.x == 125, and O.m.id == "m". ' ), 
        h('br' ),  
        h('br' ),  
        h('span.red3', 'cube(5).bnd(m.ret)' ), 
        h('span.td2', ' is equivalent to the previous example. m is unchanged and O.m.x == 125. ' ), 
        h('br' ),  
        h('br' ),  
        h('span.red3', 'ret(5).bnd(cube).bnd(m.ret)' ), 
        h('span.td2', ' is equivalent to the previous two examples. O.m.x == 125. ' ), 
        h('br' ),  
        h('br' ),  
        h('span.red3', 'm.ret(4).bnd(cube)' ), 
        h('span.td2', 'causes O.m.x == 4, and creates an anonymous monad with x == 64. ' ),
        h('br' ),  
        h('br' ),  
        h('span.red3', 'm.ret(4).bnd(cube, m)' ), 
        h('span.td2', ' leaves m unchanged, O.m.x == 64, and O.m.id == "m". ' ),
        h('br' ),  
        h('br' ),  
        h('span.tao', ' The convention "a == b" in this presentation signifies that a == b is true. By the way, if you want to change the value of m, all you have to do is call ' ),
        h('span.red3', 'ret(v, "m")' ),
        h('span', ' to cause m.x == v and m.id = "m". This is the definition of add(): ' ),
        code.add,   
        h('span.red3', 'add(3, 4)' ),
        h('span.td2', ' creates a useless anonymous monad with x == 7 and id == "anonymous". ' ),
        h('br' ),  
        h('br' ),  
        h('span.red3', 'add(3, 4).bnd(m.ret)' ),
        h('span.td2', ' causes O.m.x == 7 and O.m.id == "m". ' ),
        h('br' ),  
        h('br' ),  
        h('span.red3', 'add(3, 4, m)' ), 
        h('span.td2', ' is equivalent to the prior example. The result is O.m.x == 7, and O.m.id == "m". ' ), 
        h('br' ),  
        h('br' ),  
        h('span.red3', 'm.ret(0).bnd(add, 3).bnd(cube)' ), 
        h('span.td2', 'leaves m unchanged, O.m.x == 0, and creates an anonymous monad with x == 27. ' ),
        h('br' ),  
        h('br' ),  
        h('span.red3', 'ret(0).bnd(add, 3).bnd(cube).bnd(m.ret)' ), 
        h('span.td2', 'causes O.m.x == 27, and O.m.id = "m". ' ),
        h('br' ),  
        h('br' ),  
        h('span.red3', 'ret(0).bnd(add, 2, m).bnd(cube, m2)' ), 
        h('span.td2', ' where m, and m2 are monads causes O.m.x == 2, and O.m2.x == 8. ' ),
        h('br' ),  
        h('p#iterLink', ' O holds the current state of the monads. This is convenient. For example, mMcurrentList.ret() is seen in the application code whereever a todo list is created, removed, or altered. O.mMcurrentList.x sits in the virtual DOM, making sure that the todo list display is is always current. ' ),
        h('h2', 'MonadIter' ),
        h('p', 'For any instance of MonadIter, say "m", the statement "m.bnd(func)" causes m.p == func to be true. The statement "m.release(...args) causes p(...args) to execute. Here is the definition: ' ), 
        code.monadIt,
        h('p', 'As shown later on this page, MonadIter instances control the routing of incoming websockets messages and the flow of action in the simulated dice game. '  ), 
        h('p', 'The following example illustrates the use of release() with an argument. It also shows lambda expressions being provided as arguments for bnd(). The initial values of mMt1, mMt2, and mMt3 are 0, 0, and "" respectively. When this page loads, the following code runs: ' ),
        code.testZ,
        h('p', ' add() and cube() are defined in the Monad section (above). If you click "mMZ1.release(1)" several times, the code (above) beginning with "mMZ1" will run several times, each time with v == 1. The result, O.mMt3.x, is shown below the button. mMZ1.p (bnd()\'s argument) remains constant while mMZ1.release(1) is repeatedly called. ' ),
        h('button#testZ', 'mMZ1.release(1)'  ),
        h('p.code2', O.mMt3.x ),
        h('span', 'Refresh button: '  ),
        h('button#testQ', 'mMt1.ret(0).bnd(mMt2.ret)'  ),
        h('br' ),
        h('br' ),
        h('span.tao', '  You can call ' ),
        h('span.green', 'mMZ2.release(v)' ),
        h('span', ' by entering a value for v below: ' ), 
        h('br' ),
        h('span', 'Please enter an integer here: ' ), 
        h('input#testW' ), 
        h('p', ' Here is another example. It demonstrates lambda expressions passing values to a remote location for use in a computation. If you enter three numbers consecutively below, I\'ll call them a, b, and c, then the quadratic equation will be used to find solutions for a*x**2 + b*x + c = 0. The a, b, and c you select might not have a solution. If a and b are positive numbers, you are likely to see solutions if c is a negative number. For example, 12, 12, and -24 yields the solutions 1 and -2. ' ),
        h('p.code2#quad4', O.mMquad1.x ),
        h('span.red2', O.mMquad2.x ),
        h('span.red2', O.mMquad3.x ),
        h('br' ),
        h('span.tao' , 'Run mMZ3.release(v) three times for three numbers. The numbers are a, b, and c in ax*x + b*x + c = 0: ' ),
        h('input#quad' ),  
        h('p', 'Here is the code:' ),
        code.quad,
        h('span#tdList' ),
        


        h('h2', 'MonadStream'  ),
        code.monadStr,
        h('span.tao', ' MonadStream instances acquire values with the "ret()" method, placing them in the "stream" attribute. The stream depends on the ' ),
        h('a', {props: {href: "http://staltz.com/xstream/", target: "_blank" }}, 'xstream' ),
        h('span', ' library, which is published by André Staltz, the author of Cycle.js. ' ),
        h('br' ),
        h('p', 'The following example involves two MonadStream instances: mM$fib4 and mM$primeFibs. mM$fib4.ret() and mM$primeFibs.ret() are called when the web page loads. That is the only time that external code calls these ret() methods. After that, all calls to ret() are internal, recursive calls. No computation is performed twice so, for example, if the number 100 is entered after the number 200 has been entered, the previously calculated lists are truncated and displayed. If the number 300 is enter, computations pick up where they left off at 200. mM$PF.stream holds the prime Fibonacci numbers. ' ),
        code.primeFib1,
        h('p', ' When mMitterPrimeFibs.p executes; that is, when mMitterPrimeFibs.release(x) is called, v[3] (the list of primes) is increased up to the limit x[0], unless v[3] is already sufficiently large. If the last element in v[3] is larger than x[0], x[3] is truncated accordingly. No prime number is calculated more than once during the lifetime of the loaded web page. The same goes for the array of Fibonacci numbers. Rather than rely on an explicit memoization function, the application holds the calculated values in streams. ' ),
        h('p', ' After sending the list of primes to the virtual DOM, the mM$PrimeFibs.stream listener calculates the intersection of the prime numbers and Fibonacci numbers arrays and puts the result in mM$PF.stream. If you enter an upper bound below, you should see a list of prime numbers, a list of Fibonacci numbers, and a list of prime Fibonacci numbers. Numbers over 1000 might cause a stack overflow error, necessitating a browser window reload. I have incrementally moved above 10,000 before going too far and needing to reload the browser window. When I get around to refactoring the code, I might find ways to optimize it. ' ),
        h('p#prime2.red4',  ),
        h('input#prime3334',  ),
        h('p#fib4.red4', ),  
        h('p#primeFibs.red4', ),
        h('br' ),
        h('p', ' Here is the code for a Fibonacci number generator that uses the same kind of memoization as shown above.  ' ),
        code.primeFib2,
        h('p', ' The above code is used in Fibonacci demonstration below. ' ),
        h('h3', 'Prime And Fibonacci Streams' ),
        h('p', ' Enter an integer below to generate a list of Fibonacci numbers: '  ), 
        h('input#fib3335',  ),
        h('p#fib5.red4', ),  
        h('p', ' And here is the code for a memoizing prime number generator:   '  ),
        code.primeFib3,
        h('p', ' The prime number code is demonstrated below. ' ),
        h('p', ' Enter an integer below to generate a list of Fibonacci numbers: '  ), 
        h('input#prime3336',  ),
        h('p#prime5.red4', ),  
        h('p', '    '  ),
        h('p', ' The Fibonacci, prime, and prime Fibonacce streams are intitiated as follows:    '  ),
        h('pre', `            mM$fib5.ret( [ 0, 1, 1, [0] ] );
    mM$prime5.ret( [ [2], 3, 3 ] );
    mM$primeFibs.ret( [ [2], 3, 3, [2,3 ] ]); 
`    ),
        h('h3', 'Todo List Side Effects' ),
        h('p', ' When users do anything to the todo list, MonadStream instance mM$taskList runs its ret() method on the modified String representation of the list, causing the string to be added to mM$taskList.stream. mM$taskList.stream has only one subscriber, taskAction$, whose only purpose it to send the string representation of the todo list to the server. The server updates its persistent file and distributes a text representation of the updated todo list to all group members. Each group member receives the todo list as a string and parses it into a DOM node tree that is merged into the stream that updates the virtual DOM. All Todo List side effects can be traced to:' ),
        code.todoStream,
        h('span', ' Just search for "mM$taskList.ret" to find where all todo list changes were initiated. The following link takes you to a more detailed explanation of the todo list. ' ),
        h('a', {props: {href: '#tdList2'}}, 'Detailed Todo List Explanation'   ),  
        h('br' ),
        h('h3', 'Dice Game Side Effects' ),
        h('p', ' mM$1.ret() is called only when (1) a new dice roll comes in from the server, (2) when a player clicks a number, and (3) when clicking a number or operator results in a computation being performed. These are the three things that require a DOM update. When a player clicks a number, it disappears from number display. When a computation is performed, the result is added to the number display, unless the result is 18 or 20. A result of 18 or 20 results in a new roll coming in from the server and mM$1.ret() being called on an array of four numbers; something like mM$1.ret[4,2,11,17]). When a number is removed or a result added, mM$1.ret() is called on an array containing fewer than four numbers. ' ),
        h('p', ' mM$1.stream is a stream of arrays of integers, as explained in the paragraph above. All game side effects can be traced to: ' ),
        code.gameStream,
        h('p', ' Because a player can traverse the history of number displays by clicking the BACK and FORWARD buttons, the current value of O.mMindex2.x must be incremented to determine where the new array of numbers will be placed in the O.mMallRolls.x array. Here are the definitions of inc and spliceAdd: ' ), 
        code.inc,
        h('p', '    ' ),
        h('hr' ),  






        h('h2', 'Concise Code Blocks For Information Control' ),
        h('p', ' Incoming websockets messages trigger updates to the game display, the chat display, and the todo list display. The members of a group see what other members are doing; and in the case of the todo list, they see the current list when they sign in to the group. When any member of a group adds a task, crosses it out as completed, edits its description, or removes it, the server updates the persistent file and all members of the group immediately see the revised list.  '  ),
        h('p', 'The code below shows how incoming websockets messages are routed. For example, mMZ10.release() is called when a new dice roll (prefixed by CA#$42) comes in.   ' ),
        code.messages,
        h('p', ' The "mMZ" prefix designates instances of MonadIter. The bnd() method assigns its argument to the "p" attribute. "p" runs if and when the release() method is called. The next() function releases a specified MonadIter instance when the calling monad\'s value matches the specified value. next2() releases the specified monad when the specified condition returns true. The release method in next() has no argument, but next does take arguments, as illustrated below.' ),
        h('span.tao', ' The incoming messages block is just a syntactic variation of a switch block, but that isn\'t all that MonadIter instances can do. They can provide fine-grained control over the lazy evaluation of blocks of code. Calling release() after a function completes some task provides Promise-like behavior. Error handling is optional. The MonadInter release(...args) method facilitates sequential evaluation of code blocks, remeniscent of video and blog explanations of ES6 iterators and generators. I prefer doing it with MonadIter over "yield" and "next". For one thing, ES6 generator "yield" blocks must be evaluated in a predetermined order. This link takes you back to the MonadIter section with interactive examples of the use of release() with arguments.  ' ),
        h('a#tdList2', {props: {href: '#iterLink'}}, 'release() with arguments'   ),  
        h('br' ),
        h('br' ),
        h('a', {props: {href: '#top'}}, 'Back To The Top'   ),  
        h('br' ),
        h('h3', 'The Todo List' ),
        h('p', ' Next, I\'ll go over some features of the todo list application. This will show how Motorcycle.js and the monads work together.' ),
        h('p', 'Creation Of A Task: If you enter something like Susan, Fred, Pay the water bill, the editable task will appear in your browser and in the browsers of any members a group you might have created or joined. If you have loaded this page in another tab and changed to the same group in both, you will see the task in both tabs, barring some malfunction. The task has a delete button, an edit button, and a "Completed" checkbox. It shows that Susan authorized the task and Fred is responsible for making sure it gets done. Instead of entering an authority and responsible person, you can just enter two commas before the task description. Without two commas, a message appears requesting more information. This is how Motorcycle.js handles the creation of a new task: ' ),
        code.newTask,
        h('p', ' mM$taskList is the todo application\'s worker function. Every time it executes its ret() method, the argument to ret() is added to its stream, causing the following code to run: ' ),
        code.mM$task,
        h('p', 'mM$taskList caries a string representing the task list. mMtaskList.x.split(",") produces an array whose length is a multiple of six. Commas in the task description are replaced by "$*$*$" so split(",") will put the entire task description in a single element. Commas are re-inserted when the list arrives from the server for rendering. Although a task list is a nested virtual DOM object (Snabbdom vnode), it can be conveniently passed back and forth to the server as a string without resorting to JSON.stringify. Its type is Text on the server and String in the front end, becomming a virtual DOM node only once, when it arrives from the server prefixed by "DD#$42" causing "process(e.data) to execute. Here is process(): ' ),
        code.process,
        h('span.tao', 'As you see, the string becomes a list of six-element objects, then those objects are used to create a Snabbdom vnode which is handed to mM$taskList.ret() leading to the update of O.mMtaskList. O.mMtaskList.x sits permanently in the main virtual DOM description. When its value gets refreshed, the DOM re-renders because taskStream$ is merged into the stream that is mapped into the virtural DOM description inside the object returned by "main". "main" and "sources" are the arguments provided to Cycle.run(). "sources" is the argument provided to "main". It is an array of drivers. The code is at '  ),
        h('a', {props: {href: "https://github.com/dschalk/JS-monads-stable"}}, 'https://github.com/dschalk/JS-monads-stable' ),
        h('br'),
        h('p', ' Clicking "Completed": When the "Completed" button is clicked, the following code runs:         '  ),
        code.colorClick,
        h('p', 'O.mMtaskList is split into an array. Every sixth element is the start of a new task. colorAction$ toggles the second, third, and fourth element in the task pinpointed by "index" * 6. getIndex finds the index of the first and only the element whose task description matches the one that is being marked "Completed". I say "only" because users are prevented from adding duplicate tasks. After the changes are made, the array of strings is reduced to one string and sent to the server when mM$taskList.ret() updates mM$taskList.stream triggering . '  ),  
        h('p', ' This is the code involved in editing a task description: '  ),
        code.edit,
        h('p', 'Clicking "Edit" causes a text box to be displayed. Pressing <ENTER> causes it to diappear. edit2Action$ obtains the edited description of the task and the index of the task iten and provides them as arguments to process. Process exchanges $*$*$ for any commas in the edited version and assigns the amended task description to the variable "task". O.mMtaskList.x is copied and split into an array. "index * 6" is replaced with "task" and the list of strings is reduced back to a single string and sent to the server for distribution. This pattern, - (1) split the string representation of the todo list into an array of strings, (2) do something, (3) reduce the list of strings back to a single string - is repeated when the "Delete" button is clicked. If the last item gets deleted, the server is instructed to delete the persistent file bearing the name of the group whose member deleted the last task. ' ), 
        h('p#common', 'Cycle.js has been criticized for not keeping state in a single location, the way React.js does. Motorcycle.js didn\'t do it for me, or try to force me to do it, but it so happens that the current state of all active monads is in the object "O". I have written applications in Node.js and React.js, and I can say without a doubt that Motorcycle.js provides the best reactive interface for my purposes.  ' ),
        h('hr'),
        h('a', {props: {href: '#top'}}, 'Back To The Top'   ),  
        h('h2', 'Common Patterns' ),
        h('p', 'Anyone not yet familiar with functional programming can learn by studying the definition of the Monad bnd() method and considering the common patterns presented below. Often, we want to give a named monad the value of an anonymous monad returned by a monadic computation. Here are some ways to accomplish that: '  ),
        h('p', 'For any monads m1 and m2 with values a and b respectively (in other words, m1.x == a and m2.x == b return true), m1.bnd(m2.ret) provides m1\'s value to m2.ret() causing O.m2 to have m1\'s value. So, after m1.bnd(m2.ret), m1.x == a, m2.x == b, O.m2.x == a all return true. The definition of Monad\s bnd() method shows that the function m2.ret() operates on m1.x. m1.bnd(m2.ret) is equivalent to m2.ret(m1.x). The stand-alone ret() function can be used to alter the current value of m2, rather than altering the value of O.m2. Here is one way of accomplishing this: m1.bnd(x => ret(x,"m2"). These relationships are verified in the following tests: ' ),
        h('pre', 
`             ret('m1Val','m1')
             m1.x === 'm1Val'  // true
             ret('m2Val', 'm2')
             m2.x === 'm2Val'  // true

             m1.bnd(m2.ret)
             O.m2.x === 'm1Val' // true

             m1.ret('newVal')
             O.m1.bnd(v => ret(v, 'm2'))
             m2.x === 'newVal'  // true
             O.m2.x === 'm1Val' // true   still the same  `   ),
        h('p', 'The bnd() method does not have to return anonymous monads. Consider, for example, the trivial function f = function(x, mon) {return mon.ret(x)}. The monad that calls its bnd() method with the argument f gives the monad designated as "mon" its value. So m1.bnd(f, m2) results in m1.x == a, m2.x == b, O.m2.x == a all returning true. ' ), 
        h('p'  ), 
        h('hr'),
        h('h3', 'Immutable Data And The State Object "O" ' ),
        h('p',  'The server updates scores in response to messages prefixed by "CG#$42". Each such message carries an integer specifying the amount of the change. The ServerState list of Client tupples is pulled from the game state TMVar and replaced by a new tupple whose Score field differs from the previous one.' ),
        h('p', 'In front end code, mutating variables which are defined inside of functions often seems inocuous in applications written in an object oriented programming style. This is not the case in a Motorcycle.js application, where functions culminate in streams that merge into the stream that feeds the object returned by the main function, called "main" in this application. "sources" is an array of drivers. It is main\'s only argument, "sources" and "main" are Cycle.run()\'s arguments.' ), 
        h('p', '"main" and "Cycle.run" are called only once. In the cyclic steady state that results, a reference should say what it means and mean what it says. If it suddenly refers to something other than what the other half of the cycle thinks it is, there will be a temporary disconnect. This will promptly staighten out, but having temporary disconnects shakes confidence in the consistency and reliability of the program. I don\'t have an example of mutating an object causing an unexpected result or crash. I would appreciate it if someone would give me such an example. ' ),
       h('p', ' In this environment, avoiding mutations is recommended and I generally follow that recommendation. Mutations in this application are confined to the global state object "O" and MonadIter instances. In the examples above, the release() method moves the process forward to the next occurance of the MonadIter instance where the bnd() method provides a new function to the "p" attribute. The progressive morphing of "p" in MonadIter instances is desirable behavior, and I think that creating a clone each time it occurs would be a senseless waste of resources. Unless and until release() is called, the program is not affected by "p". If release() is called, the return value of p(...args) is returned, but "p" itself remains tucked away, never mixing with the flow of information through the program. The bnd() method is pure. Given the same argument, it will always do the same thing. It doesn\'t even return anything. It just updates the internal "p" attribute. This insulation of internal operations from the outer program is remeniscent of an important purpose of the Haskell IO monad. These are just hand-waving arguments for the harmlessness of letting the bnd() method mutate MonadIter instances, but I wanted to explain why I feel comfortable with letting the definition of MonadIter stand as it is.  ' ),           
       h('p', 'All monad updates caused by the monad ret() method are stored in the object "O". When a monad m executes m.ret(v) for some value "v", m remains unchanged and the O attribute O.m is created or, if it already exists, is replaced by the update; i.e., O.m.x == v becomes true. Older versions of m are subject to garbage collection unless there is a reference to them or to an object (arrays are objects) containing m.  This is illustrated in the score-keeping code below.  All score changes are captured by mM13.ret(). Therefore, O.mM13.x is always the current score. Replacing monad attributes in O is vaguely analogous to swapping out ServerState in the Haskell server\'s state TMVar. Older versions of ServerState can be preserved in the server just as prior versions of O.mM13 can be preserved in the front end. ' ),     
        code.updateCalc,
        h('p', 'The socket messages prompt the server to update its application state and to broadcast messages to all members of the group whose member sent the message to the server. Let\'s take another look at the way incoming messages are handled.'  ),  
        code.messages,
        h('p#monads', ' Messages prefixed by CB#$42 are broadcast in response to CG#$42-prefixed messages from a browser. CB#$42 prefixes release mMZ11, causing the scoreboard to update. CA#$42-prefixed messages to the server result in CA#$42-prefixed messages carrying the next dice roll to be broadcast to the sender\'s group.  CE#$42 prefixed messages cause the release of mMZ14 which causes O.mMgoals2.x to change from an empty string to an anouncement of the name of the winner. ' ),  
        h('hr' ),  
        h('a', {props: {href: '#top'}}, 'Back To The Top'   ),  
        h('h3', 'Why Call Them Monads?' ),  
        h('p', 'For any monad m and function f mapping values to monads, inside the O object the bnd() method behaves like the Haskell >>= operator(pronounce "bind"). Sequences of calls to bnd() are associative; i,e, how computations are grouped does not matter. And the ret() method and ret() function provide a kind of left and right identity similar to the specification in the Haskell monad laws. Here are three functions we will use to illustrate this:' ),
        code.mdem1,
        h('span.tao', ' The relationships being demonstrated here are readily derivable from the definition of Monads; but just for illustration, here are some examples tested with Mocha: ' ),  
        h('a', {props: {href: "http://schalk.net:3056", target: "_blank" }}, 'Mocha Tests.' ),
        h('p', ' That\'s about it. That\'s why I call them "monads". But JS-monads can do much more than vaguely mirror Haskell monad functionality. There is no attempt to constrain JS-monads with type classes, or with restrictions on the types of functions the bnd() method can accept. m.bnd(x => x**3) returns a number, not a JS-monad. It would be the end of the line for a chained sequence of computations; but that might be exactly what you want: a monadic chain of computations that spits out a number when it is done. '  ),  
        h('h2', 'Conclusion' ),
        h('p', '  You might not need a ready-made framework or a bloated set of libraries for your project. It could be that improvisation, possibly with the help of JS-monads or your own variation on the JS-monads theme, is the key to creating a well-organized, understandable, and easily maintainable masterpiece. The libraries I imported, Motorcycle.js and xstream, were an immense help. I wholeheartedly endorse Motorcycle, with its Cycle, Snabbdom, and Most constitutents; along with xstream, which made MonadStream possible. '    ),  
        h('a', {props: {href: '#top'}}, 'Back To The Top'   ),  
        h('p' ),  
        h('p' ),  
        h('p' ),  
        h('br'),  
        h('br'),  
        h('br'),  
        h('hr'),  
        h('p' ),  
        h('p' ),  
        h('p' ),  
        h('p' ),  
        h('p' )  
        ])
      ])
    )}} 

  function cleanup (x) {
      let target0 = document.getElementById('0');
      let target1 = document.getElementById('1');
      let target2 = document.getElementById('2');
      let target3 = document.getElementById('3');
      let targetAr = [target0, target1, target2, target3];
      [0,1,2,3].map(i => {
        if (targetAr[i].innerHTML == 'undefined' )    {
          targetAr[i].style.display = 'none';
        }
        else {
          targetAr[i].style.display = 'inline';
        }
      });
      return ret(x);
  };

  function updateCalc() { 
    O.mM3.bnd(x => mM7
    .ret(calc(x[0], O.mM8.x, x[1]))
    .bnd(result => {if (result == 20) {score(O.mM13.x, 1)}; return O.mM7}) 
    .bnd(result => {if (result == 18) {score(O.mM13.x, 3)}; return O.mMcurrentRoll}) 
    .bnd(push, O.mM7.x, mM$1))
    reset();
  };

  var score = function score(x,j) {
    if ((x + j) == 20) {
      mMgoals.ret(O.mMgoals.x == 2 ? 0 : (O.mMgoals.x + 1)); 
      mM13.ret(0);
      socket.send('CG#$42,' + O.mMgroup.x + ',' + O.mMname.x + ',' + -x + ',' + O.mMgoals.x); 
      if (O.mMgoals.x == 0) {
        socket.send('CE#$42,' + O.mMgroup.x + ',' + O.mMname.x + ',nothing ');
      }
      socket.send('CA#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',6,6,12,20');
      return;
    }
    if ((x + j) % 5 == 0) {
      socket.send('CG#$42,' + O.mMgroup.x + ',' + O.mMname.x + ','+ (j+5)+',' + O.mMgoals.x); 
      mM13.ret(x + j + 5);
      socket.send('CA#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',6,6,12,20');
      return;
    } 
    socket.send('CG#$42,' + O.mMgroup.x + ',' + O.mMname.x + ','+j+',' + O.mMgoals.x); 
    mM13.ret(x + j);
    socket.send('CA#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',6,6,12,20');
 };

  var reset = function reset () {
      mM3.ret([])
      .bnd(() => mM4.ret(0)
      .bnd(mM8.ret)
      .bnd(cleanup))
  }

  var updateScoreboard = function updateScoreboard(v) {
    let ar2 = v.split("<br>");
    let keys = Object.keys(ar2);
    let ar = [];
    keys.map(k => {
      ar.push(h('div', ar2[k]))
    });
    return mMscoreboard.ret(ar);
  };

  var displayOff = function displayOff(x,a) {
      document.getElementById(a).style.display = 'none';
      return ret(x);
  };

  var displayInline = function displayInline(x,a) {
      if (document.getElementById(a)) document.getElementById(a).style.display = 'inline';
      return ret(x);
  };

  var newRoll = function(v) {
    socket.send('CA#$42,' + O.mMgroup.x.trim() + ',' + O.mMname.x.trim() + ',6,6,12,20' )
    return ret(v);
  };

  var refresh = function() {
    setTimeout( function () {
       document.location.reload(false);
     },4000);
  };

  const sources = {
    DOM: makeDOMDriver('#main-container'),
    WS: websocketsDriver,
    UNIT: unitDriver
  }

  Cycle.run(main, sources);


