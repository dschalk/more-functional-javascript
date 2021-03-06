"use strict";
import {run} from '@cycle/xstream-run'
import {h, p, span, h1, h2, h3, pre, br, div, label, input, hr, makeDOMDriver} from '@cycle/dom';
import code from './code.js';
// import {EventEmitter} from 'events'
console.log('If you can read this you are in main.js <@><@><@><@><@><@><@><@>');
var textA = h('textarea', 'You bet!' );
var formA = h('form#horses', 'You bet!' );

function workerBDriver () {
  return xs.create({
    start: listener => { workerB.onmessage = msg => listener.next(msg)},
    stop: () => { workerB.terminate() }
  });
};

function workerCDriver () {
  return xs.create({
    start: listener => { workerC.onmessage = msg => listener.next(msg)},
    stop: () => { workerC.terminate() }
  });
};

function workerDDriver () {
  return xs.create({
    start: listener => { workerD.onmessage = msg => listener.next(msg)},
    stop: () => { workerD.terminate() }
  });
};

function workerEDriver () {
  return xs.create({
    start: listener => { workerE.onmessage = msg => listener.next(msg)},
    stop: () => { workerE.terminate() }
  });
};

function workerFDriver () {
  return xs.create({
    start: listener => { workerF.onmessage = msg => listener.next(msg)},
    stop: () => { workerF.terminate() }
  });
};

function workerDriver () {
  return xs.create({
    start: listener => { worker.onmessage = msg => listener.next(msg)},
    stop: () => { worker.terminate() }
  });
};

/*function eM2Driver () {
  return xs.create({
    start: listener => { mM2.on = msg => listener.next(msg)},
    stop: () => { mM2.removeAllListeners() }
  });
};

function mMstreamDriver () {
  return xs.create({
    start: listener => { mMstream.x.on = msg => listener.next(msg)},
    stop: () => { mMstream.removeAllListeners() }
  });
};*/

socket.onmessage = function (event) {
    console.log('Socket message',event);
};

socket.onmessage = function (event) {
    console.log(event);
};

socket.onclose = function (event) {
    console.log('<><><> New message <><><> ', event);
};

function updateTasks (obArray) {
  var todoData = [];
  for (let ob of obArray) {
  todoData = todoData.concat([
    h('span.task3', `{ style: { color: ${ob.color}, textDecoration: ${ob.textDecoration} } }, 'Task: ' + ${ob.task}`),
    h('br'),
    h('button#edit1', 'Edit'),
    h('input#edit2', `{ props: { type: textarea, value: ${ob.task}}}`),
    h('span#author.tao', `Author: ${ob.author}  /  Responsibility: ${ob.responsible}`),
    h('br'),
    h('input#cb', `{ props: { type: 'checkbox', checked: ${ob.checked }}},
           {style: { color: ${ob.color}, textDecoration: ${ob.textDecoration}}}` ),
    h('label.cbox',   { props: { for: '#cb' } }, 'Completed'   ),
    h('button.delete', 'Delete'),
    h('br'),
    h('hr') ])
    }
};


function main(sources) {

  const worker$ = sources.WW.map(v => {
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
      if (typeof v.data[1] === 'string') {
        console.log('Major malfunction in worker.js  Reporting from main thread', v.data[1] )
      }
      else {
        mMres.ret(v.data[0]);
        primesMonad = new MonadState('primesMonad', v.data[1])
      }
    });
    next(v.data[0], 'CA#$41', mMZ21)
    next(v.data[0], 'CB#$41', mMZ22)
    next(v.data[0], 'CC#$41', mMZ23)
    next(v.data[0], 'CD#$41', mMZ24)
    next(v.data[0], 'CE#$41', mMZ25)
    });

  const messages$ = sources.WS.map( e => {
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
};

function testComments (data)  {
    var a1 = data.split('@');
    var a2 = a1[1];
    var arr = a2.split('\n');
    mM26.ret([]);
    for (let k of arr) {
      mM26.bnd(push, k, 'mM26');
      mM26.bnd(push, h('br'), 'mM26');
    }
};

var comClick$ = sources.DOM.select('textarea#comment').events('click');

var comClickAction$ = comClick$.map( e => {
  if (e.target.value !== '') socket.send(`TG#$42,${get(pMgroup)},${get(pMname)},@${e.target.value}\n*****************************`);
})

  var loginPress$ = sources.DOM
      .select('input.login').events('keypress');

  var loginPressAction$ = loginPress$.map(e => {
    var v = e.target.value;
    if (e.keyCode === 13) {
      pMname.ret(v);
      pMgroup.ret('solo');
      socket.send('CC#$42' + v );
      pMclicked.ret([]);
      socket.send('TG#$41,solo,' + v);
      mMdice.ret('block');
      mMrightPanel.ret('block');
      mMrightPanel2.ret('none');
      mMgameDiv2.ret('block')
      mMlogin.ret('none');
      mMlog1.ret('none');
      mMlog2.ret('block');
      mMcaptionDiv.ret('block')
      mMchatDiv.ret('block')
      mMtodoDiv.ret('block')
      mMgameDiv.ret('block')
      mMchat.ret('inline')
      mMcaption.ret('inline');
      mMgame.ret('inline')
      mMtodo.ret('inline')
      mMcom2.ret('none')
      mMcom3.ret('block')
      socket.send(`CG#$42,${pMgroup.x},${pMname.x},0,0`);
      socket.send(`TG#$40,${pMgroup.x},${pMname.x}`);
    };
  });

  var groupPress$ = sources.DOM
      .select('input#group').events('keypress');

  var groupPressAction$ = groupPress$.map(e => {
      if (e.keyCode === 13) {
        socket.send(`CO#$42,${pMgroup.x},${pMname.x},${e.target.value}`);
        pMgroup.ret(e.target.value)
        .bnd(gr =>
        socket.send(`CG#$42,${pMgroup.x},${pMname.x},0,0`));
      }
  });

  var messagePress$ = sources.DOM
      .select('input.inputMessage').events('keydown');

  var messagePressAction$ = messagePress$.map(function (e) {
      if (e.keyCode === 13) {
          socket.send(`CD#$42,${pMgroup.x},${pMname.x},${e.target.value}`);
          e.target.value = '';
      }
  });

  var updatePlayers = function updatePlayers (data) {
        sMplayers.s.clear();
        var namesL = data.split("<br>");
        namesList = namesL.slice(1);
        updateScoreboard2(namesList);
    namesList.forEach(player => sMplayers.s.add(player.trim()));
  }

  function updateScoreboard2(v) {
    var ar = [];
    for (let k of v) {
        ar.push(['  ' + k]);
    };
    pMdata.ret(ar);
  };

  var rollClick$ = sources.DOM
    .select('#roll').events('click');

  var rollClickAction$ = rollClick$.map(() => {
    var a = gameMonad.fetch0().valueOf() - 1;    // Lose one point for clicking ROLL.
    var b = gameMonad.fetch1().valueOf();
    socket.send(`CA#$42,${pMgroup.x},${pMname.x},6,6,12,20,${a},${b}`);
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

  var forwardClick$ = sources.DOM
      .select('#ahead.tao1').events('click')

  var backClick$ = sources.DOM
      .select('#back.tao100').events('click');

var backAction$ = backClick$.map(() => {
  if (gameMonad.s[1] > 0) {
    gameMonad.dec();
  }
});

var forwardAction$ = forwardClick$.map(() => {
  if (gameMonad.s[1] < gameMonad.s[0].length - 1) {
    gameMonad.inc();
  }
});

  var fib2 = function fib2(v) {
      if (v[2] > 1) {
          mMfib.ret([v[1], v[0] + v[1], v[2] - 1]);
      }
      else {
          mM19.ret(v[0]);
      }
  };

  var fibPress$ = sources.DOM
      .select('input#code').events('keydown');

  var fibPressAction$ = fibPress$.map(function (e) {
      if (e.target.value === '') {
          return;
      }
      ;
      if (e.keyCode === 13) {
          mM21.ret(e.target.value);
          fib2([0, 1, e.target.value]);
      }
  });
  // *******************************************n****************************** ENDOM iginal Fibonacci END
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START PRIME FIB

  const workerB$ = sources.WWB.map(m => {
    if (m.data[3] === 'color') {
      fill1Monad.ret(m.data[0]);
      fill2Monad.ret(m.data[1]);
      fill3Monad.ret(m.data[2]);
      mMprimeBlurb.ret(m.data[5]);
      mMfibBlurb.ret(m.data[4]);
      mMprimeFibBlurb.ret(m.data[6]);
    }
    else {
      mMelapsed.ret(elapsed(m.data[0][3]))
      .bnd(v =>  console.log(v));
      mMres.ret(m.data[0])
      window['primesMonad'] = new MonadState('primesMonad', m.data[1], primes_state);
    }
  });

  var fibKeyPress5$ = sources.DOM
      .select('input#fib92').events('keyup');

  var primeFib$ = fibKeyPress5$.map(e => {
    workerB.postMessage([primesMonad.s, e.target.value]);
  });

  var clearprimes$ = sources.DOM
    .select('#clearprimes').events('click')
    .map(() => mMres.ret([mMres.x[0], '', mMres.x[2], mMres.x[3]]));


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  Begin Easy

  var factorsPress$ = sources.DOM
      .select('input#factors_1').events('keydown');
  var factorsAction$ = factorsPress$.map(function (e) {
    var factors = [];
    mMfactors3.ret('');
    if (e.keyCode === 13) {
      var num = e.target.value;
      if (!num.match(/^[0-9]+$/)) {
        mMfactors3.ret('This works only if you enter a number. ' + num + ' is not a number');
      }
      else {
        var n = parseInt(num, 10);
        workerC.postMessage([primesMonad.s, n]);
      }
    }
  });

  const workerC$ = sources.WWC.map(m => {
    mMfactors.ret(m.data[0]);
    mMfactors23.ret(m.data[1]);
    window['primesMonad'] = new MonadState('primesMonad', m.data[2]);
  });


  var factorsP$ = sources.DOM
    .select('input#factors_5').events('keyup');

  var fA$ = factorsP$.map(function (e) {
    mMfactors7.ret('');
    var factors = [];
    if (e.keyCode === 13) {
      var ar = (e.target.value).split(',').map(v => parseInt(v,10));
      if (ar[0] !== ar[0] || ar[1] !== ar[1] || typeof ar[0] !== 'number' || typeof ar[1] !== 'number') {
        mMfactors7.ret('It works only if you enter two integers separated by a comma.');
        return;
      }
    else {
        //workerD.postMessage([primesMonad.s, ar, mMfactors6.x]);
        workerD.postMessage([primesMonad.s, ar, decompMonad.s, 'Happy, happy']);
      }
    }
  });

  const workerD$ = sources.WWD.map(m => {
    mMfactors6.ret(m.data[0][3]);
    window['primesMonad'] = new MonadState('primesMonad', m.data[0], primes_state);
    mMfactors8.ret(m.data[1]);
  });


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  End Easy

  var factorsPress_b$ = sources.DOM
      .select('input#factors_1b').events('keydown');

  var factorsAction_b$ = factorsPress_b$.map(function (e) {
    var factors = [];
    mMfactors3_b.ret('');
    if (e.keyCode === 13) {
      var num = e.target.value;
      if (!num.match(/^[0-9]+$/)) {
        mMfactors3_b.ret('This works only if you enter a number. ' + num + ' is not a number');
      }
      else {
        var n = parseInt(num, 10);
        workerE.postMessage([primesMonad.s, n, decompMonad.s]);
      }
    }
  });

  const workerE$ = sources.WWE.map(m => {
    mMfactors_b.ret(m.data[0]);
    window['primesMonad'] = new MonadState('primesMonad', m.data[1]);
    window['decompMonad'] = new MonadState('decompMonad', m.data[2]);
  });

  var factorsP_b$ = sources.DOM
    .select('input#factors_5b').events('keyup');

  var fA_b$ = factorsP_b$.map(function (e) {
    mMfactors7.ret('');
    var factors = [];
    if (e.keyCode === 13) {
      var ar = (e.target.value).split(',').map(v => parseInt(v,10));
      if (ar[0] !== ar[0] || ar[1] !== ar[1] || typeof ar[0] !== 'number' || typeof ar[1] !== 'number') {
        mMfactors7.ret('It works only if you enter two integers separated by a comma.');
        return;
      }
    else {
        workerF.postMessage([primesMonad.s, ar, decompMonad.s]);
      }
    }
  });

  const workerF$ = sources.WWF.map(m => {
    mMfactors6_b.ret(m.data[2][3]);
    window['primesMonad'] = new MonadState('primesMonad', m.data[0], primes_state);
    window['decompMonad'] = new MonadState('decompMonad', m.data[2], primes_state);
    mMfactors8_b.ret(m.data[1]);
  });

    var factorsP_c$ = sources.DOM
      .select('input#factors800').events('keyup');

    var fA_c$ = factorsP_c$.map(function (e) {
      mMfactors800.ret('');
      var factors = [];
      var ar = (e.target.value).split(',').map(v => parseInt(v,10));
      if (e.keyCode === 13) {
        if (ar[0] !== ar[0] || ar[1] !== ar[1] || typeof ar[0] !== 'number' || typeof ar[1] !== 'number') {
          mMfactors7.ret('It works only if you enter two integers separated by a comma.');
          return;
        }
      else {
        mMfactors800.ret(simpleWay(ar[0], ar[1]));
        }
      }
    });

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ENDOM prime factors END
  // ?<>>><>><><><><>>>><><><  traversal  ><><><><><><>>><><><><><><><><><><><>< START traversal
  document.onload = function (event) {
    console.log('onload event: ', event);
    mMitterfib5.release(200);
  }

    // document.getElementById('login').focus();
  // <>>><>><><><><>>>><><><  traversal  ><><><><><><>>><><><><><><><><><><><>< ENDOM traversal
  // <>>><>><><><><>>>><><><  traversal  ><><><><><><>>><><><><><><><><><><><>< START Itterator


   mMZ1.bnd(v => mMt1
  .bnd(add,v).bnd(w => {
    mMt1.ret(w)
    .bnd(cube)
    .bnd(x => mMt3.ret(w + ' cubed is ' + x))}));

  mMZ2.bnd(v => cube(v)
  .bnd(w => mMt3.ret(v + ' cubed is ' + w)));

  var testZ = sources.DOM
      .select('#testZ').events('click');

  var testZAction$ = testZ.map(function () {
      mMZ1.release(1);
  });

  var testQ = sources.DOM
      .select('#testQ').events('click');

  var testQAction$ = testQ.map(() => {
    mMt1.ret(0)
    .bnd(v => mMZ2.release(v))});

  var testW = sources.DOM
      .select('#testW').events('keypress');

  var testWAction$ = testW.map(function (e) {
      if (e.keyCode === 13) {
          mMZ2.release(e.target.value);
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
      mMquad4.ret("Solutiions for " + a + ", " + b + " and " + c + " are " + x + " and  " + y)
      mMquad5.ret(p(a).text + " * " + x + " * " + x + " + " + p(b).text +
              " * " + x + " " + p(c).text + " = 0")
      mMquad6.ret(p(a).text + " * " + y + " * " + y + " + " + p(b).text +
              " * " + y + " " + p(c).text + " = 0")
      solve();   // Continuing the endless loop.
      }) }) }) })
  };
  solve();

  var quad$ = sources.DOM
      .select('#quad').events('keypress');

  var quadAction$ = quad$.map(function (e) {
      if (e.keyCode === 13) {
          mMZ3.release(e.target.value);
          document.getElementById('quad').value = null;
      }
  });


// *******************************************************************BEGIN TODO LIST

    var task2 = function task2(str) {
        socket.send(`TD#$42,${get(pMgroup)},${get(pMname)},@${str}`)
    };

    function comment2(str) {
        socket.send(`TD#$42,${get(pMgroup)},${get(pMname)},@${str}`)
    };

    var newTask$ = sources.DOM
        .select('input.newTask').events('keydown');

    var newTaskAction$ = newTask$.map(function (e) {
        var ob = {};
        var alert = '';
        var task = '';
        if (e.keyCode === 13) {
            var ar = e.target.value.split(',');
            if (ar.length < 3) {
              mMalert.ret('You should enter "author, responsible party, task" separated by commas');
              return;
            }
            var ar2 = ar.slice(2);
            if (ar2.length === 1) {
                task = ar[2];
            }
            if (ar2.length > 1) {
                task = ar2.reduce(function (a, b) { return a + '$*$*$' + b; });
            }
            if ((get(mMar2).filter(function (v) { return (v.task === task); }).length) > 0) {
                mMalert.ret(task + " is already listed.");
            }
            else if (ar.length > 2) {
                mMcurrentList.bnd(addString, task + ',yellow, none, false,' + ar[0] + ',' + ar[1], mMcurrentList);
                task2(get(mMcurrentList));
                e.target.value = '';
                mMalert.ret('');
            }
        }
    });

  function testTask (v2, v3, data)  {
    if (v3 === 'no file' || v3 === 'empty') {
      mMtaskList.ret([]);
      taskL = h('span' );
      return;
    }
    if (get(pMgroup) != 'solo' || get(pMgroup) === 'solo' &&  get(pMname) === v2) {
      process(data);
    }
  };

  var process = function (str) {
      var a = str.split(",");
      if (a === undefined) {
          return;
      };

      if (a.length < 9) {
          return;
      };

      var ar = a.slice(3);
      var s = ar.reduce(function (a, b) { return a + ',' + b; });
      var tempArray = [];
      mMcurrentList.ret(s);
      process3(ar);
  };

    var process3 = function (a) {
      var ar5 = [];
      if (a.length % 6 === 0) {
        var keys = rang(0, a.length / 6);
        keys.map( _ => {
          ar5.push({
            task: convertBack(a.shift()),
            color: a.shift(),
            textDecoration: a.shift(),
            checked: a.shift() === 'true',
            author: a.shift(),
            responsible: a.shift()
          });
        });
      }
      mMar2.ret(ar5);
      process4(ar5);
    };

    var process4 = function (a) {
        var tempArray = [];
        var keys = Object.keys(a);
        for (var k in keys) {
            tempArray.push(h('div.todo', [
                h('span.task3', { style: { color: a[k].color, textDecoration: a[k].textDecoration } }, 'Task: ' + a[k].task),
                h('br'),
                h('button#edit1', 'Edit'),
                h('input#edit2', { props: { type: 'textarea', value: a[k].task }, style: { display: 'none' } }),
                h('span#author.tao', 'Author: ' + a[k].author + ' / ' + 'Responsibility: ' + a[k].responsible),
                h('br'),
                h('input#cb', { props: { type: 'checkbox', checked: a[k].checked }, style: { color: a[k].color,
                        textDecoration: a[k].textDecoration } }),
                h('label.cbox', { props: { for: '#cb' } }, 'Completed'),
                h('button.delete', 'Delete'),
                h('br'),
                h('hr')]));
        }

        mMtaskList.ret(tempArray);
        taskL = tempArray;
    };

    var colorClick$ = sources.DOM
        .select('#cb').events('click');

    var colorAction$ = colorClick$.map(function (e) {
        var ind = getIndex(e);
        var index = parseInt(ind, 10);
        var s = get(mMcurrentList);
        var ar = s.split(',');
        var n = 6 * index + 3;
        var j = 6 * index + 2;
        var k = 6 * index + 1;
        var checked = ar[n];
        if (checked === 'true') {
            ar[n] = 'false';
            ar[k] = 'yellow';
            ar[j] = 'none';
        }
        else {
            ar[n] = 'true';
            ar[k] = 'lightGreen';
            ar[j] = 'line-through';
        }
        task2(ar.reduce(function (a, b) { return a + ',' + b; }));
    });

    var edit1$ = sources.DOM
        .select('#edit1').events('click');

    var edit1Action$ = edit1$.map(function (e) {
        var index = getIndex2(e);
        get(mMtaskList)[index].children[3].elm.style.display = 'block';
    });

    var edit2$ = sources.DOM
        .select('#edit2').events('keypress');

    var edit2Action$ = edit2$.map(function (e) {
        var v = noComma(e.target.value);
        var index = getIndex2(e);
        if (e.keyCode === 13) {
            process2(v, index);
            mMtaskList.x[index].children[3].elm.style.display = 'none';
        updateScoreboard2(namesList);
        }
    });

    var process2 = function (str, index) {
        var a = mMcurrentList.x.split(',');
        a[6 * index] = str;
        var b = a.reduce(function (a, b) { return a + ',' + b; });
        task2(b);
    };

    var deleteClick$ = sources.DOM
        .select('.delete').events('click');

    var deleteAction$ = deleteClick$.map(function (e) {
        var index = parseInt(getIndex(e), 10);
        var s = get(mMcurrentList);
        var ar = s.split(',');
        if (ar.length < 7) {
          task2('empty');
          socket.send( `TX#$42,${get(pMgroup)},${get(pMname)}` );
          return;
        }
        var str = '';
        ar.splice(index * 6, 6);
        task2(ar.reduce(function (a, b) { return a + ',' + b; }));
    });

// **********************************************************************END TODO LIST
    var chatClick$ = sources.DOM
        .select('#chat2').events('click');

    var chatClickAction$ = chatClick$.map(function () {
        var el = document.getElementById('chatDiv');
        (el.style.display === 'none') ?
            el.style.display = 'inline' :
            el.style.display = 'none';
    });

    var captionClick$ = sources.DOM
        .select('#caption').events('click');
    var captionClickAction$ = captionClick$.map(function () {
        var el = document.getElementById('captionDiv');
        (el.style.display === 'none') ?
            el.style.display = 'inline' :
            el.style.display = 'none';
    });

    var todoClick$ = sources.DOM
        .select('#todoButton').events('click');

    var todoClickAction$ = todoClick$.map(function (e) {
        var el = document.getElementById('todoDiv');
        (el.style.display === 'none') ?
            el.style.display = 'inline' :
            el.style.display = 'none';
    });

    var gameClick$ = sources.DOM
        .select('#game').events('click');

    var gameClickAction$ = gameClick$.map(function () {
        var el = document.getElementById('gameDiv');
        (el.style.display === 'none') ?
            el.style.display = 'inline' :
            el.style.display = 'none';

       // updateScoreboard2(namesList)
        var el2 = document.getElementById('gameDiv2');
        (el2.style.display === 'none') ?
            el2.style.display = 'inline' :
            el2.style.display = 'none';
    });

    var todoClick$ = sources.DOM
        .select('#todoButton').events('click');

    var todoClickAction$ = todoClick$.map(function (e) {
        (get(mMtodoDiv)  === 'none') ?
            mMtodoDiv.ret('block') :
            mMtodoDiv.ret('none')
    });

    var chatClick$ = sources.DOM
        .select('#chat2').events('click');

    var chatClickAction$ = chatClick$.map(function () {
        (get(mMchatDiv)  === 'none') ?
            mMchatDiv.ret('block') :
            mMchatDiv.ret('none')
    });

    var captionClick$ = sources.DOM
        .select('#caption').events('click');

    var captionClickAction$ = captionClick$.map(function () {
        (get(mMcaptionDiv)  === 'none') ?
            mMcaptionDiv.ret('block') :
            mMcaptionDiv.ret('none')
    });

    var gameClick$ = sources.DOM
        .select('#game').events('click');

    var gameClickAction$ = gameClick$.map(function () {
        (get(mMgameDiv)  === 'none') ?
            mMgameDiv.ret('block') :
            mMgameDiv.ret('none')
    });

    var clearPicked$ = sources.DOM
        .select('#clear').events('click');

    var clearAction$ = clearPicked$.map( () => {
      gameMonad.clearPicked();
    });

var elemB$ = sources.DOM.select('input#message2').events('keyup')
  .map(e => {
  mM10.ret(e.target.value);
  worker.postMessage([mM9.x, e.target.value]);
});

mMrightPanel.ret('none');

var pr$ = sources.DOM
    .select('#primeNumbers').events('keypress');

var prAction$ = pr$.map(function (e) {
    if (e.keyCode === 13) {
      worker.postMessage(["CE#$42", primesMonad.s, e.target.value]);
    }
});

function tNode (author, responsible, task, ch, dec, col) {
  var todo = h('div', [
    h('div',  { style: { color: col, textDecoration: dec, checked: ch } }, task),
    h('p', 'Author: ' + author + ', Responsible Person: ' + responsible ),
  ]);
  return todo;
};

function MonadState3(g, state) {
  this.id = g;
  this.s = state;
  this.c = new MonadEmitter();
  this.d = "task";
  this.bnd = (func, ...args) => func(this.s, ...args);
  this.ret = function (a) {
    return window[this.id] = new MonadState(this.id, a);
  };
  this.c.on(a, (b)  => {
    this.s.push(b);
    todoNode = this.s.map(v => tNode(v));
    // window[this.id] = new MonadState3(this.id, list)
    }
  )
};

var todoMonad = new MonadState3('todoMonad',
  [[ 'dummy task', 'yellow', 'none', false, 'default author', 'default responsible' ]]
);

  var calcStream$ = xs.merge( comClickAction$, messagePressAction$, fA_c$, forwardAction$, backAction$, prAction$, factorsAction_b$, fA$, factorsP$, fA_b$, factorsP_b$, clearprimes$, worker$, workerB$, workerC$, workerD$, workerE$, workerF$, clearAction$, factorsAction$, primeFib$, fibPressAction$, quadAction$, edit1Action$, edit2Action$, testWAction$, testZAction$, testQAction$, colorAction$, deleteAction$, newTaskAction$, chatClickAction$, gameClickAction$, todoClickAction$, captionClickAction$, groupPressAction$, rollClickAction$, loginPressAction$, messages$, numClickAction$, opClickAction$);
  return {
  DOM: calcStream$.map(function () {
  return h('div.main', [
    h('div.preContent', [
    h('br'),
      h('br'),
      h('div', 'FUNCTIONAL REACTIVE PROGRAMMING'),
      h('div', 'WITH CUSTOM MONADS AND CYCLE.JS') ]),
      h('br'),
      h('div.image_3', [
      h('img.image_2', {props: {src: "logo.svg" }}  ),
      h('span', ' ' ),
      h('a', { props: { href: "https://cycle.js.org/", target: "_blank" } }, 'A Cycle.js application') ]),
  h('div.content', [
      h('p', ' Front-end web developers might be interested in seeing how I encapsule procedures and state in objects whose methods conform to a JavaScript version of the Haskell monad laws. It is fascinating to see how reactivity is achieved in Cycle.js. The Haskell server might also be of interest. '),
h('p', 'People who are developing a feel for function reactive programming can cut through to its essence by seeing it implemented in various contexts. The combination of Lodash, Immutable.js, and RxJS running in Node.js is one possibility. Here we demonstrate how a front-end developer can create monads to suit their purposes, and obtain amazing reactivity by implementing them in a Cycle.js framework. ' ),

  h('span.tao1b', 'You can comment at ' ),
      h('a', { props: { href: 'https://redd.it/60c2xx' }}, 'Reddit' ),
      h('span.tao1b', ' or in the ' ),
      h('a', {props: { href: '#comment' }}, 'comments' ),
      h('br'),
      h('p', ' Snabbdom, Xstream, EventEmitter, and most of the monads and functions presented here are available in browser developer tools consoles and scratch pads. A production site would load these as modules, but this site is for experimention and learning. ' ),
      h('span#italic', ' These monads are like the Haskell monads in that they resemble the monads of category theory without actually being mathematical monads. See ' ),
      h('a', { props: { href: "http://math.andrej.com/2016/08/06/hask-is-not-a-category/", target: "_blank" } }, 'Hask is not a category.'),
          h('span', ' by Andrej Bauer and the ' ),
          h('a', { props: { href: '#discussion' } }, 'Discussion'),
          h('span', ' below. They provide a convenient interface for dealing with uncertainty and side effects in a purely functional manner. Adherence to the monad laws (see below) helps make the monads robust, versatile, and reliable tools for isolating and chaining sequences of javascript functions. State is modified in monads without mutating anything outside of them.' ),

          h('p', ' The demonstrations include persistent, shared todo lists, text messaging, and a simulated dice game with a traversable history (all group members see your score decrease or increase as you navegate backwards and forwards). Monads are shown performing lengthy mathematical computations asycronously in web workers. Monads encapsulate state. The error checking monad carries occurances of NaN and runtime errors through sequences of computations much like the Haskell Maybe monad. ' ),
      h('span.tao', 'This project was created by, and is actively maintained by David Schalk. The code repository is at '),
      h('a', { props: { href: "https://github.com/dschalk/JS-monads-stable", target: "_blank" } }, 'https://github.com/dschalk/JS-monads-stable. '),
h('span', 'The master branch is a Motorcycle.js application using the Most.js library. That branch has been abandoned. This is a Cycle.js application using Xstream instead of Most. The primary branch is named "xstream". '),
      h('br'),
      h('br'),
      h('span.tao', ' The game code is fairly concise and intuitive. A quick walk-through is presented ' ),
      h('a', { props: { href: '#gameExplanation' } }, 'here'),
      h('span', '. To see monadic functionality at work, I suggest that you take a look at the section captioned ' ),
      h('a', { props: { href: '#asyncExplanation' } }, 'Asynchronous Processes'),
      h('br'),
      h('p', ' But it might be best to first proceed down the page and see the examples of Monad instances manipulating data. If you are trying to wrap you head around the concept of pure, chainable functions, such as the functions in the Underscore and Jquery libraries, understanding Monad instances might finally put you in the comfort zone you seek. ' ),
h('br'),
h('h3', 'The Game'),
h('p', 'People who are in the same group, other than the default group named "solo", share the same todo list, chat messages, and simulated dice game. In order to see any of these, you must establish a unique identity on the server by logging in. The websockets connection terminates if the first message the server receives does not come from the sign in form. You can enter any random numbers, letters, or special characters you like. The server checks only to make sure someone hasn\'t already signed in with the sequence you have selected. If you log in with a name that is already in use, a message will appear and this page will be re-loaded in the browser after a four-second pause. '),
h('p', ' Data for the traversable game history accumulates until a player scores three goals and wins. The data array is then erased and the application is ready to start accumulating a new history. '),

h('div#log1',  {style: { display: mMlog1.x }}, [
h('p', 'IN ORDER TO SEE THE GAME, TODOLIST, AND CHAT DEMONSTRATIONS, YOU MUST ENTER SOMETHING TO ESTABLISH A WEBSOCKET CONNECTION.'),
h('span', 'Name: '),
h('input.login', )]),
h('p', mM6.x ),
]),
h('hr.len90', {style: { display: mMgameDiv2.x }}, ),
h('br.len90', {style: { display: mMgameDiv2.x }}, ),
h('div.heading',  {style: { display: mMgameDiv2.x }}, 'Game, Todo List, Text Messages' ),

h('div#gameDiv2', {style: { display: mMgameDiv2.x }}, [
  h('br'),
  h('div#leftPanel', {style: { display: mMgameDiv2.x }}, [
    h('p', 'RULES: If clicking two numbers and an operator (in any order) results in 20 or 18, the score increases by 1 or 3, respectively. If the score becomes 0 or is evenly divisible by 5, 5 points are added. A score of 25 results in one goal. That can only be achieved by arriving at a score of 20, which jumps the score to 25. Directly computing 25 results in a score of 30, and no goal. Each time RL is clicked, one point is deducted. Three goals wins the game. '),
    h('br'),
    buttonNode,
    h('br'),
    h('button#4.op', 'add'),
    h('button#5.op', 'subtract'),
    h('button#6.op', 'mult'),
    h('button#7.op', 'div'),
    h('button#8.op', 'concat'),
    h('br'),
    h('br'),
    h('div#dice', { style: { display: mMdice.x } }, [
      h('button#roll.tao1', 'ROLL'),
      h('button#back.tao100', 'BACK'),
      h('button#ahead.tao1', 'FORWARD'),
      h('div.tao', `Selected numbers: ${gameMonad.fetch3().join(', ')} ` ),
      h('div.tao', `Operator: ${gameMonad.fetch2()} ` ),
      h('div.tao', 'Index: ' + gameMonad.s[1] ),
      h('button#clear', 'Clear selected numbers' ),
      h('div#log2', { style: { display: mMlog2.x } }, [
          h('span', 'Change group: '),
          h('input#group')]),
      h('p', mMsoloAlert.x ),
    ])
  ]),

  h('div#rightPanel', { style: { display: mMrightPanel.x } }, [
    h('br'),
    h('br'),
    h('br'),
    h('br'),
    h('br'),
    h('br'),
    h('button#todoButton', { style: { fontSize: '16px', display: 'inline' } }, 'TOGGLE TODO_LIST'),
    h('br'),
    h('br'),
    h('button#chat2', { style: { fontSize: '16px', display: 'inline' } }, 'TOGGLE CHAT'),
    h('br'),
    h('br'),
    h('br'),
    h('br'),
//    h('div.game', 'Name: ' + pMname.x ),
//    h('div.game', 'Group: ' + pMgroup.x ),
    h('pre.game', `Currently online:
(Name score | goals) `  ),
    h('div.game', {props: {color: "gold"}}, '' + pMdata.x  ),
    h('br'),
    h('br'),
    h('div#a100', ' _________________________________________________ ' ),
    h('br'),
    h('div#todoDiv',  { style: { display: mMtodoDiv.x } }, [
      h('div#taskList', taskL  ),
      h('div', 'Enter author, responsible rerson, and task here: '),
      h('br'),
      h('input.newTask') ]),
    h('br'),
    h('span#alert', mMalert.x ),
    h('br'),
    h('span#alert2'),

    h('br'),
    h('div#chatDiv', { style: { display: mMchatDiv.x } }, [
      h('div#messages', [
        h('span', 'Message: '),
        h('input.inputMessage'),
        h('div', messages  ),
        h('br'),
      ])
    ])
  ])
]),
// h('div#a100', ' ____________________________________________________________________________________________________________ ' ),
h('div.content', [


 // **************************************************************************** START MONAD
   code.monad,
    code.variations,
 // **************************************************************************** END MONAD
   code.cycle,
h('p#asyncExplanation', ' ' ),
h('p', ' ' ),
h('p', ' ' ),
h('p', ' ' ),
h('p', ' ' ),
h('p', ' ' ),
h('p', ' ' ),
h('p', ' ' ),
h('p', ' ' ),
h('p', ' ' ),
h('p', ' ' ),
 // ************************************************** OOOOOOOOOOOOOO ********    BEGIN ASYNC

  h('a', { props: { href: '#top' } }, 'Back To The Top'),

  h('h2', ' Asynchronous Processes ' ),
    code.async1,

h('br'),
h('span', `${mMfibBlurb.x}`  ),
h('span', [
  h('svg', {attrs: {width: 50, height: 50}}, [
    h('circle', {attrs: {cx: 25, cy: 25, r: 20, stroke: 'purple', 'stroke-width': 4, fill: fill1Monad.x }})
  ])
]),

h('span', `${mMprimeBlurb.x}`  ),
h('span', [
  h('svg', {attrs: {width: 50, height: 50}}, [
    h('circle', {attrs: {cx: 25, cy: 25, r: 20, stroke: 'purple', 'stroke-width': 4, fill: fill2Monad.x }})
  ])
]),

h('span', `${mMprimeFibBlurb.x}`  ),
h('span', [
  h('svg', {attrs: {width: 50, height: 50}}, [
    h('circle', {attrs: {cx: 25, cy: 25, r: 20, stroke: 'purple', 'stroke-width': 4, fill: fill3Monad.x }})
  ])
]),
h('br'),

h('p.red',  'The elapsed time is ' + mMelapsed.x + ' milliseconds.' ),
h('input#fib92'),
h('br'),
h('span#PF_7.red6', 'Fibonacci Numbers'),
h('br'),
h('span#PF_9.turk', mMres.x[0]  ),
h('br'),
h('span#PF_8.red6', 'Prime Fibonacci Numbers'),
h('br'),
h('span#primeFibs.turk', mMres.x[2]  ),
h('br'),
h('span#PF_21.red6', 'The largest generated prime number.'),
h('br'),
h('span#PF_22.turk', mMres.x[1]  ),
h('bpr'),


h('p', ' The second demonstration in this series decomposes numbers into its their prime factors. Testing with sequences of 9\'s, the first substantial lag occurs at 9,999,999 - unless a large array of prime numbers has already been generated in the previous demonstration or elsewhere. Here it is:' ),
h('input#factors_1'),
h('br'),
h('br'),
h('span', mMfactors.x ),
h('span.tao3', mMfactors23.x ),

h('p', ' Next, two comma-separated numbers are decomposed into arrays of their prime factors, and those arrays are used to compute their lowest common multiple (lcm). For example, the lcm of 6 and 9 is 18 because 3*6 and 2*9 are both 18. The lcm of the denominators of two fractions is useful in fraction arithmetic; specifically, addition and subtraction. On my desktop computer, two seven digit numbers resulted in a lag of a few seconds when prime numbers had not been previously generated. ' ),

h('input#factors_5'),

h('br'),
h('br'),
h('div.tao3', mMfactors7.x ),
h('span', `The least common multiple of  ${mMfactors8.x[0]} and ${mMfactors8.x[1]} is ` ),
h('span.tao3', `${mMfactors8.x[2]}` ),
h('br'),
h('span', `The largest common factor of ${mMfactors8.x[0]} and ${mMfactors8.x[1]} is ` ),
h('span.tao3', `${mMfactors8.x[3]}` ),
h('br'),
h('div', `TEST: ${mMfactors8.x[0]} * ${mMfactors8.x[1]} === ${mMfactors8.x[2]} * ${mMfactors8.x[3]} `  ),
h('span', 'RESULT: ' ),
h('span.tao3', `${ (mMfactors8.x[0]  *  mMfactors8.x[1])  ===  (mMfactors8.x[2]  *  mMfactors8.x[3]) }` ),

    code.hardWay,

h('label', ' Enter a number here: ' ),
h('input#factors_1b'),
h('br'),
h('br'),
h('div.tao3', mMfactors_b.x ),

    code.hardWay2,
h('div.tao3', mMfactors7_b.x ),
h('span', `The least common multiple of  ${mMfactors8_b.x[0]} and ${mMfactors8_b.x[1]} is ` ),
h('span.tao3', `${mMfactors8_b.x[2]}` ),
h('br'),
h('span', `The largest common factor of ${mMfactors8_b.x[0]} and ${mMfactors8_b.x[1]} is ` ),
h('span.tao3', `${mMfactors8_b.x[3]}` ),
h('br'),
h('div', `TEST: ${mMfactors8_b.x[0]} * ${mMfactors8_b.x[1]} === ${mMfactors8_b.x[2]} * ${mMfactors8_b.x[3]} `  ),
h('span', 'RESULT: ' ),
h('span.tao3', `${ (mMfactors8_b.x[0]  *  mMfactors8_b.x[1])  ===  (mMfactors8_b.x[2]  *  mMfactors8_b.x[3]) }` ),
  h('h3', ' The Easy Way ' ),
  h('p', ' This has been a demonstration of MonadState and MonadState transformers. If you really want the least common multiple or the largest common factor of two positive integers, there is no need to generate prime numbers. The next and final demonstration in this section does not use a web worker. The computations block the main thread, but only for a few microseconds.' ),
  h('br' ),
  h('input#factors800'),
  h('br' ),
  h('span', `The least common multiple of  ${mMfactors800.x[0]} and ${mMfactors800.x[1]} is ` ),
  h('span.tao3', `${mMfactors800.x[2]}` ),
  h('br'),
  h('span', `The largest common factor of ${mMfactors800.x[0]} and ${mMfactors800.x[1]} is ` ),
  h('span.tao3', `${mMfactors800.x[3]}` ),
  h('br'),
  h('div', `TEST: ${mMfactors800.x[0]} * ${mMfactors800.x[1]} === ${mMfactors800.x[2]} * ${mMfactors800.x[3]} `  ),
  h('span', 'RESULT: ' ),
  h('span.tao3', `${ (mMfactors800.x[0]  *  mMfactors800.x[1])  ===  (mMfactors800.x[2]  *  mMfactors800.x[3]) }` ),
h('p', ' The code for the previous demonstrations is available at the Github repository, and will soon be available here in an appendex. primesMonad and the functions primarily involved in its transformation are shown below: ' ),
  code.primes,
  h('p', ' primesMonad state updates are generated in workerB.js and stored in the main thread. Users set new upper bounds on the size of the largest Fibonacci number in the series to be considered by entering a number in a browser input box. Here is the rele2ant code: ' ),
  code.primes3,
h('p', ' The user\'s selected number along with the current state of primesMonad (primesMonad.s) gets posted to workerB, which gets functionality beyond its prototype from workerB.js, which orchestrates preparation of the return message that will be posted back to the main thread. workerB.js delegates the job to functions in script2.js by calling: ' ),
    code.primes4,
h('p', ' execF prepares the Fibonacci series and sends its state, along with the state of primesMonad that it received from workerB.js, to fpTransformer. execP is called with the current state and the largest Fibonacci number that had been recently produced by execF as arguments. The updated state is an array with four elements, [new upper bound, new series, largest prime produced in the current browser session, largest series]. If the new result is larger than any previous one, the first and second elements of the state array are identical to the third and fourth. Otherwise, they are smaller. As is apparent in the following code, primesMonad is re-created in the main thread using the state array that was posted by workerB. ' ),
    code.primes2,
  h('h2', ' MonadEr - An Error-Catching Monad ' ),
  h('p', ' Instances of MonadEr function much the same as instances of Monad, but when an instance of MonadEr encounters an error, it ceases to perform any further computations. Instead, it passes through every subsequent stage of a sequence of MonadEr expressions, reporting where it is and repeating the error message. It will continue to do this until it is re-instantiated or until its bnd() method runs on the function clean(). ' ),
  h('p', 'Functions used as arguments to the MonadEr bnd() method can be placed in quotation marks to prevent the browser engine from throwing reference errors. Arguments can be protected in the same manner. Using MonadEr can prevent the silent proliferation of NaN results in math computations, and can prevent browser crashes due to attempts to evaluate undefined variables. Sometimes crashes are desired when testing code, but MonadEr provides instant feedback pinpointing the exact location of the error. ' ),
  h('p', ' The following demonstration shows the Chrome console log entries that result from running ' ),
  h('pre', `    t.bnd('add3', 3, '$t2').bnd(cube3, '$t3')
    t.bnd('add3','three', '$t2').bnd(cube3, '$t3')
    t.bnd('add3','Math.sqrt(-1)', '$t2').bnd(cube3, '$t3')
    t.bnd('addd3', 3, '$t2').bnd(cube3, '$t3' ` ),
  h('br'),
  h('img.image', {props: {src: "error2.png"}}  ),
  h('br'),
  h('p.tao1b', ' The monad laws hold for MonadEr instances. The following relationships were verified in the Chrome console: ' ),
  h('pre', `    ret3(0,'t',[])  // t is now an instance of MonadEr with t.x = 0 and t.e = [].

    t.ret(3).bnd(cube3).x === cube(3).x
    ret3(3).bnd(cube3).x === cube3(3).x

    t.bnd(t.ret) === t
    t.bnd(ret) === t

    t.ret(0).bnd(add3, 3).bnd(cube3).x ===
    t.ret(0).bnd(v => add3(v,3).bnd(cube3)).x  ` ),
  h('br'),
  h('br'),
  h('a', { props: { href: '#top' } }, 'Back To The Top'),
h('h2', 'MonadItter'),
code.monadIt,
h('p', ' MonadItter instances don\'t link to one another. They exist to facilitate the work of instances of Monad, MonadState, etc. Here\'s how they work: '),
h('p', 'For any instance of MonadItter, say "it", "it.bnd(func)" causes it.p === func. Calling the method "it.release(...args)" causes p(...args) to run, possibly with arguments supplied by the caller. '),
h('p',' As shown later on this page, MonadItter instances control the routing of incoming websockets messages. In one of the demonstrations below, they behave much like ES2015 iterators.'),
h('h3', ' A Basic Itterator '),
h('p', 'The following example illustrates the use of release() with an argument. It also shows a lambda expressions being provided as an argument for the method mMZ1.bnd() (thereby becoming the value of mMZ1.p), and then mMZ1.release providing an arguments for the function mMZ1.p. The code is shown beneith the following two buttons. '),
h('button#testZ', 'mMZ1.release(1)'),
h('p.code2', mMt3.x  ) ,
h('span', 'Refresh button: '),
h('button#testQ', 'mMt1.ret(0).bnd(v => mMZ2.release(v)) '),
h('br'),
    code.testZ,
h('span.tao', ' The expression mMt3.x sits permanently in the Motorcycle virtual DOM description. You can call '),
h('span.green', 'mMZ2.release(v)'),
h('span', ' by entering a value for v below: '),
h('br'),
h('span', 'Please enter an integer here: '),
h('input#testW'),
h('p', ' cube() is defined in the Monad section (above). If you click "mMZ1.release(1)" several times, the code (above) will run several times, each time with v === 1. The result, mMt3.x, is shown below the button. mMZ1.p (bnd()\'s argument) remains constant while mMZ1.release(1) is repeatedly called, incrementing the number being cubed each time. '),
                  h('p', ' Here is another example. It demonstrates lambda expressions passing values to a remote location for use in a computation. If you enter three numbers consecutively below, call them a, b, and c, then the quadratic equation will be used to find solutions for a*x**2 + b*x + c = 0. The a, b, and c you select might not have a solution. If a and b are positive numbers, you are likely to see solutions if c is a negative number. For example, 12, 12, and -24 yields the solutions 1 and -2. '),
h('p#quad4.red2', mMquad4.x  ),
h('p#quad5.red2', mMquad5.x  ),
h('p#quad6.red2', mMquad6.x  ),
h('p', 'Run mMZ3.release(v) three times for three numbers. The numbers are a, b, and c in ax*x + b*x + c = 0: '),
h('input#quad'),
h('p', 'Here is the code:'),
code.quad,
h('p', ' fmap (above) facilitated using qS4 in a monadic sequence. qS4 returns an array, not an instance of Monad, but fmap lifts qS4 into the monadic sequence. '),
h('p', ' The function solve() is recursive. It invokes itself after release() executes three times. The expression "solve()" resets solve to the top, where mMZ3.p becomes a function containing two nested occurrances of mMZ3.bnd. After mMZ3.release() executes, mMZ3.p becomes the function that is the argument to the next occurrance of mMZ3.bnd. That function contains yet another occurrance of mMZ3.bnd. MonadItter is syntactic sugar for nested callbacks. ' ),

// **************************************************************************
h('p#gameExplanation', ' ' ),
h('p', ' ' ),
h('p', ' ' ),
h('p', ' ' ),
h('p', ' ' ),

h('a', { props: { href: '#top' } }, 'Back To The Top'),

//************************************************************************** START GAME

h('h2', 'The Simulated Dice Game' ),
h('p', ' The game is controlled by gameMonad, which is an instance of MonadState. The state of the game after each click on one of the displayed numbers is saved in an array of five member arrays comprised of three numbers and two arrays corresponding to score, goals, operator, selected numbers, and displayed numbers. The current state of the game is the index of one of the states in gameMonad.s[0]. The index number is held in gameMonad.s[1]. History traversal is accomplished by changing gameMonad.s[1]. Here is how the application responds to clickes of the BACK and FORWARD buttons:' ),
    code.backAction,
h('p', ' Traversal does not involve any outside of gameMonad. gameMonad methods are responsible for everything that happens when the BACK or FORWARD buttons are clicked. These methods are additions to MonadState in monad.js file, which is accessed only in the main thread. Web workers use the definition of MonadState in script2.js. Its prototype is not burdened with methods the web workers don\'t need. Here are the additions to MonadState.prototype: ' ),
    code.prototypeAdditions,
h('p', ' One goal is awarded each time a player lands on the number 25. The limit for the number of score changes in one turn is two. If the number of increases were not limited, landing on 5 would launch you into an series of increases through all the multiples of five terminating with a stack overflow error message. As a consequence of this rule, only one five-point jump is allowed per turn. '),
h('p', ' Another way to increase a score, other than computing an number which equals 0 modulo 5, is to compute the number 20 for one additional point, or the number 18 for three additional points. A quick way to arrive at 20 is to start at -1, compute 18 twice, which takes you from -1 to 2 to 5 and jumps you to 10. Then click roll, which sets you back to 9, and compute 18 twice. That takes you from 9 to 12, to 15, jumping you to 20. You don\'t get another jump, so click ROLL and compute 20 or click ROLL three times and compute 18, taking your score from 19 or 17 to 20 and then on to 25 and back to 0, with an increase of one goal. If it is your third goal, you win the game. ' ),
h('p', ' Now let\'s back up and take a look at the code that responds to number and operator clicks: ' ),
    code.num_op,
h('p', ' A new state is added to gameMonad.s whenever a number is clicked, and also when the ROLL button is clicked. Here is the code that responds to clicking ROLL, along with the code that handles the message that consequently arrives from the server: ' ),
    code.newRoll,
h('p', ' Requests for new rolls include the name and group of the player making the request. That information is used by the server to deduct one point and to limit broadcast of the new roll to only members of the requesting player\'s group. The request also incudes the requesting player\'s score and goals. These are returned by the server (with one point deducted) and are v[7] and v[8] in the messages$ stream. ' ),
h('p', ' Game traversal is controlled by changing the value of mMindex.x. Here is the code that is called when the BACK button is clicked: ' ),
    code.backAction,
h('p', ' numClickAction$ and opClickAction$ call updateCalc() when gameMonad.s[mMindex.x][3] contains two numbers and gameMonad.s[mMindex.x][2] is no longer 0 (implying that an operator has been selected). updateCalc takes two arguments, the selected numbers and the selected operator. This is what happens when updateCalc receives that information: ' ),
    code.updateCalc,
h('p', '  parseInt(calc(ar[0], op, ar[1]), 10) is not 18 or 20, updateCalc sets the operator back to - and empties the picked numbers array. I also pushes the result of the calculation into the display array. updateNums does the rest. ' ),
h('p', ' If the calculation yields 18 or 20, score(result) is called. Here is the definition of score() ' ),
    code.score,
h('p', ' If the score is computed to be 25, the result of increasing goals by 1 determines how state is modified. If the result is not 3, goals is incremented and newRoll() is called with arguments score and goals. If the result is 3, a winner is declared and gameMonad.s reverts to [[0,0,0,[],[0,0,0,0]]]). ' ),
h('p', ' The monadic functionality of gameMonad was not needed. Although a simpler object could have been used, I stuck with my usual practice of preserving state in instances of MonadState. I don\'t like to unnecessarily create additional things to think about. ' ),

//************************************************************************** END GAME




//************************************************************************** END GameTraversal


h('h2', ' MonadSet '),
h('p', ' The list of online group members at the bottom of the scoreboard is very responsive to change. When someone joins the group, changes to a different group, or closes a browser session, a message prefixed by NN#$42 goes out from the server providing group members with the updated list of group members. MonadSet acts upon messages prefixed by NN#$42. Here are the definitions of MonadSet and the MonadSet instance sMplayers '),
code.MonadSet,
  h('h3', ' Websocket messages'  ),
  h('p#demo', ' Incoming websockets messages trigger updates to the game display, the chat display, and the todo list display. The members of a group see what other members are doing; and in the case of the todo list, they see the current list when they sign in to the group. When any member of a group adds a task, crosses it out as completed, edits its description, or removes it, the server updates the persistent file and all members of the group immediately see the revised list.  '),
  h('p', 'The code below shows how incoming websockets messages are routed. For example, mMZ10.release() is called when a new dice roll (prefixed by CA#$42) comes in.   '),
  code.messages,
  h('p', ' The "mMZ" prefix designates instances of MonadItter. An instance\'s bnd() method assigns its argument to its "p" attribute. "p" runs if and when its release() method is called. The next() function releases a specified MonadItter instance when the calling monad\'s value matches the specified value in the expression. In the messages$ stream, the MonadItter instance\'s bnd methods do not take argumants, but next is capable of sending arguments when bnd() is called on functions requiring them. Here is an example: '),
  h('a#tdList2', { props: { href: '#itterLink' } }, 'release() with arguments'),
  h('span#comment', '' ),
  h('br'),
  h('br'),
  h('br'),
  h('h2', 'COMMENTS' ),
  h('div#com2',  { style: { display: mMcom2.x } }, [
  h('span', 'In order to write a comment, please log in here: '),
  h('input.login', )]),
  h('br'),

  h('div#com2',  { style: { display: mMcom3.x } }, [
  h('label#label', 'Click the Comment Box to Save Comment' ),
  h('br'),
  h('textarea#comment', ),
  h('div', mM26.x ) ]),


  h('br'),
  h('br'),
  h('a', { props: { href: '#top' } }, 'Back To The Top'),

  h('h2', 'Appendix - Under Construction ' ),
  h('h3', 'The functions that produce the examples' ),

  h('p', ' Here are the definitions of MonadEr, its helper functions, and the function that serve as parameters to the bnd() method in the demonstration. ' ),
    code.monadEr,
  h('p', ' and here is the code that produced the Chrome console log entries: ' ),
    code.errorDemo,
  h('span.tao', ' When  a MonadEr instance encounters a function or an argument in quotation marks of types "undefined" or "NaN", a string gets pushed into the instance\'s e attribue. After that, the  bnd() method will not process any function other than clean(). It will stop at the' ),
  h('span.turk', 'if (e.length > 0)' ),
  h('span', 'block. clean() resets an instance to normal functioning mode by setting its e attribute back to []. ' ),

  h('br'),
  h('p'),
  h('p'),
  h('p', '.'),
  h('p', '.'),
  h('p', '.'),
  h('p', '.'),
  h('p', '.'),
  h('p'),
  h('p'),
  h('p'),
  h('p'),
  h('p')
        ])
      ])
    })
  }
}

const sources = {
  DOM: makeDOMDriver('#main-container'),
  WS: websocketsDriver,
  WWB: workerBDriver,
  WWC: workerCDriver,
  WWD: workerDDriver,
  WWE: workerEDriver,
  WWF: workerFDriver,
  WW: workerDriver
}
run(main, sources);
