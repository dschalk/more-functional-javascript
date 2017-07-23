"use strict";
import {run} from '@cycle/xstream-run';
import {h, p, span, h1, h2, h3, pre, button, br, div, label, input, hr, makeDOMDriver} from '@cycle/dom';
import code from './code.js';
// import {EventEmitter} from 'events'
console.log('If you can read this you are in main.js <@><@><@><@><@><@><@><@>');
var textA = h('textarea', 'You bet!' );
var formA = h('form#horses', 'You bet!' );
console.log('message from main.js >>> ret is', ret);


var v = rand();
var v2 = rand();
var combo = v + '<o>' + v2;
bind(pMname)(x => ret(v));
console.log('combo: ', combo);
var k = 0;
socket.onopen = setTimeout( function cow () {
  if (socket.readyState === 1) socket.send('CC#$42' + combo);
  else if (k < 15) {
    k+=1;
    cow();
  }
  else {console.log(
    'socket is not ready. socket.readyState:', socket.readyState );
    return;
  }
},200 );

socket.addEventListener('message', function (event) {
  console.log('<$><$><$><$><$><$><$><$><$> $$ Message from server: event.data ', event.data);
  console.log('<$><$><$><$><$><$><$><$><$> $$ socket.readyState', socket.readyState);
});

function main(sources) {
  console.log('0^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ got this far');

  const messages$ = sources.WS.map( e => {
    console.log('*********** INCOMING MESSAGE ***************************************');
    console.log(e);
    var ext = "XXXXXX"
    var V = e.data.split(',');
    console.log(V);
    var prefix = V[0];
    var group = V[1];
    var sender =  V[2];
    var e1 = V[3];
    var e2 = V[4];
    var e3 = V[5];
    var e4 = V[6];
    var score = V[7];
    var goals = V[8];
    mMZ10.bnd( () => {
 /*     gameMonad.s[1]+=1;
      buttonNode = bNode([e1,e2,e3,e4]);
      gameMonad.s[0].splice(gameMonad.s[1],0,[score,goals,0,[],[e1,e2,e3,e4]]); */
      gameMonad.run(score,goals,0,[],[e1,e2,e3,e4]);
    });
    mMZ11.bnd( () => {
      console.log('The message arrived', messages);
      var message = V.slice(3,V.length).join(', ');
      var str = sender + ': ' + message;
      messages.unshift(h('span', str ), h('br'));
      console.log('The message was added to messages', messages);
    });

    mMZ12.bnd( () => {
      retrn(mMgoals2,'The winner is ' + sender);
      setTimeout( function () {retrn(mMgoals2,'')},7000);
    });

    mMZ13.bnd( () => {
      retrn(mMgoals2,'A player named ' + sender +
        ' is currently logged in. Page will refresh in 4 seconds.')
      refresh() });

    mMZ14.bnd( () => {
      if (e1 === "no file" || typeof e1 == 'undefined') {
        console.log('"no file" or "undefined" arrived at mMZ17');
        taskMonad.s = [];
        taskMonad.html = "";
      }
      else {
        var str = e.data.substring(e.data.indexOf('@')+1, e.data.length) ;
        taskMonad.run2(str);
      }
    });

    mMZ15.bnd( () => {
      var ar = [];
      var g = e.data.split('<br>')
      g.shift()
      g.map(v => {
        ar.push(h('div', v));
      });     
      gameData = ar;
    });

    mMZ16.bnd( () => {                          // Prefix ZZ#$42
      var a = e1.replace(/(\r\n|\n|\r)/gm,"");   // Remove newlines
      retrn(mMcomments,commentMonad.run(e1));
    });

    mMZ17.bnd( () => {                          // Prefix RR#$42
      var str = mMcommentStr.x;

      if (e2 === "code1") {
        retrn(mMregister,'The registered name ' + e1 + ' and the associated password were recognized. ' ); 
        socket.send('GZ#$42,' + pMgroup.x + ',' + pMname.x + ',<@>' + str);
      }

      if (e2 === "code2") {
        retrn(mMregister,'The new name ' + e1 + ' was registered.' );  
        socket.send('GZ#$42,' + pMgroup.x + ',' + pMname.x + ',<@>' + str);
      }

      if (e2 === "code3") {
        retrn(pMname,sender);
        retrn(mMregister,'The password you entered is not the password that is registered for ' + e1 + '.' ); 
      }
    })

    mMZ19.bnd( () => {                          // Prefix ZN#$42  NEW COMMENT
      var a = commentMonad.s[0];
      var b = a + '<@>' + sender + '<o>' + e1 + '<@>'
      retrn(mMcomments,commentMonad.run(b));
    });

    mMZ20.bnd( () => {                 
      var ar = commentMonad.s[1].slice()
        .map(v => v = v.join('<o>'));
      ar[e1] = e2;   // The comment at index e1 becomes e2 
      var str = ar.join('<@>');
      retrn(mMcomments,commentMonad.run(str));
    });

    mMZ21.bnd( () => {                          // Prefix ZD#$42  DELETE A COMMENT
      var a = commentMonad.s[1].slice();        // commentMonad.s[1] is useful.
      a.splice(e1,1);                        // Remove a comment.
      var b = a.map(v => v.join('<o>'));        // re-stringify the comments.
      var c = b.join('<@>'); 
      retrn(mMcomments,commentMonad.run(c));      // Re-set the div ids and update the display.
    });

    mMZ22.bnd( () => {
      socket.send('<@><@><@><@><@><@><@> Boot <$><$><$><$><$><$><$>')
      socket.send('<@><@><@><@><@><@><@> Boot <$><$><$><$><$><$><$>')
      socket.send('<@><@><@><@><@><@><@> Boot <$><$><$><$><$><$><$>')
      socket.send('The browser is being refreshed. The name and group are', name,group);
      var ar = sender.split("<o>");
      retrn(pMcombo,sender)
      retrn(pMname,ar[0]);
      retrn(pMpassword,ar[1]);
      retrn(pMgroup,"solo")
      retrn(pMclicked,[])
      socket.send(`GZ#$42,solo,${ar[0]}`);
      console.log('The browser has been refreshed. The name and group are', name,group);
    });

    next( prefix, 'CA#$42', mMZ10)
    next( prefix, 'CD#$42', mMZ11)
    next( prefix, 'CE#$42', mMZ12)
    next( prefix, 'EE#$42', mMZ13)
    next( prefix, 'DD#$42', mMZ14)
    next( prefix, 'NN#$42', mMZ15)
    next( prefix, 'ZZ#$42', mMZ16)
    next( prefix, 'RR#$42', mMZ17)
    next( prefix, 'WW#$42', mMZ18)
    next( prefix, 'ZN#$42', mMZ19)
    next( prefix, 'ZE#$42', mMZ20)
    next( prefix, 'ZD#$42', mMZ21)
    next( prefix, 'CC#$42', mMZ22)
  });

  console.log('1^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ got this far');

  function next(x, y, instance, z) {
    if (x == y) {
      instance.release(z);
    }
  };

socket.onopen = function () {
  socket.readyState;
};

  var comment$ = sources.DOM.select('#comment').events('keydown');

  var commentAction$ = comment$.map(e => {
    if (e.keyCode == 13) {
      var com = e.target.value.replace(/,/g, "<<>>");
      var comm = com.replace(/(\r\n|\n|\r)/gm,"");   // Remove newlines
      socket.send(`GN#$42,${pMgroup.x},${pMname.x},<@>${pMname.x}<o>${comm}<@>`);
    }
  });

  var deleteClick2$ = sources.DOM
    .select('#deleteB').events('click');

  var deleteAction2$ = deleteClick2$.map(function (e) {
    var i = e.target.parentNode.id;
    console.log('In deleteAction2 ***   ***   ***   ***   ***   ***   ***   *** i is', i );
    socket.send(`GD#$42,${pMgroup.x},${pMname.x},${i}`);
  });

  var editB$ = sources.DOM
    .select('input#editB').events('keydown');

  var editBAction$ = editB$.map( function (e) {
    if (e.keyCode == 13) {
      console.log('Editing a comment. Here is e', e);
      var i = e.target.parentNode.id;
      var comment = e.target.value.replace(/,/g, "<<>>");
      console.log('Still in edit. Here is comment:', comment);
      socket.send('GE#$42,' + pMgroup.x + ',' + pMname.x + ',' + i + ',' + pMname.x + "<o>" + comment);
    }
  })

  var abcde = 'inline';
  var fghij = 'inline';

  var registerPress$ = sources.DOM
    .select('input.register').events('keypress');

  var registerPressAction$ = registerPress$.map(e => {
    retrn(mMerror,'');
    var str = e.target.value;
    var ar = str.split(',');
    if (e.keyCode === 13) {
      retrn(mMerror,'');
      if (ar.length != 2) {
        retrn(mMerror,' There should be one and only one comma' );
        return;
      }
      else {
        var name = ar[0];
        var x = ar.join('<o>');
        retrn(mMshowRegister,'none');
        bind(pMname)(x=>retrn(backupMonad,x))
        console.log('In registerPressAction$. str and ar are', str, ar );
        retrn(pMname,name);
        console.log('pMname.x is', pMname.x );
        socket.send(`RR#$42,${pMgroup.x},${pMoldName.x},${x}`); }
    }
  });

  var groupPress$ = sources.DOM
    .select('input#group').events('keypress');

  var groupPressAction$ = groupPress$.map(e => {
    if (e.keyCode === 13) {
      socket.send(`CO#$42,${pMgroup.x},${pMname.x},${e.target.value}`);
      retrn(pMgroup,e.target.value)
      gameMonad = new MonadState('gameMonad', [[[0,0,0,[],[0,0,0,0]],[0,0,0,[][0,0,0,0]]],0]);
      gameMonad = new MonadState('gameMonad', [[[0,0,0,[],[0,0,0,0]],[0,0,0,[][0,0,0,0]]],0]);
      socket.send(`CA#$42,${pMgroup.x},${pMname.x},6,6,12,20,0,0`);
      socket.send(`CG#$42,${e.target.value},${pMname.x},0,0`);
    }
  });

  var messagePress$ = sources.DOM
    .select('input.inputMessage').events('keydown');

  var messagePressAction$ = messagePress$.map(function (e) {
    if (e.keyCode === 13) {
      socket.send(`CD#$42,${pMgroup.x},${pMname.x},${e.target.value}`);
      console.log('In messagePressAction$ pMname.x is', pMname.x );
      console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
      e.target.value = '';
    }
  });

  var updatePlayers = function updatePlayers (data) {
    sMplayers.s.clear();
    var namesL = data.split("<br>");
    namesList = namesL.slice(1);
    updateScore(namesList);
    namesList.forEach(player => sMplayers.s.add(player.trim()));
  }

  function updateScore(v) {
    var g = [];
    for (let k of v) {
      g.push(h('div', '  ' + k));
    };
    return g
  };

  var rollClick$ = sources.DOM
    .select('#roll').events('click');

  var rollClickAction$ = rollClick$.map(() => {
    var a = gameMonad.fetch0() - 1;
    var b = gameMonad.fetch1();
    socket.send(`CA#$42,${pMgroup.x},${pMname.x},6,6,12,20,${a},${b}`);
  });

  var series$ = sources.DOM
    .select('input#series').events('keydown');

  var seriesAction$ = series$.map(e => {
    console.log('You bet, Jackareno');
    console.log('e is',e);
    console.log('e.target is',e.target);
    console.log('e.target.value is',e.target.value);
    if (e.keyCode === 13) {
      console.log(e.which, e.target.value);
      mMZ4.release(e.target.value);
      e.target.value = '';
    }
  });

  var numClick$ = sources.DOM
    .select('.num').events('click');

  var numClickAction$ = numClick$.map(e => {
    console.log("<@><@><@><@><@><@><@><@><@@@>>> In numClickAction$");
    console.log("<@><@><@><@><@><@><@><@><@@@>>> In numClickAction$");
    console.log("<@><@><@><@><@><@><@><@><@@@>>> In numClickAction$");
    console.log("gameMonad.s[1]", gameMonad.s[1]);
    // if (gameMonad.s[0][gameMonad.s[1]][3].length === 2) return;
    var s = gameMonad.s.slice();
    var s00 = s[0][s[1]][0];
    var s01 = s[0][s[1]][1];
    var s02 = s[0][s[1]][2];
    var s03 = s[0][s[1]][3].slice();
    var s04 = s[0][s[1]][4].slice();
    console.log('s03 and s04 before',s03,s04);
    var x = s04.splice(e.target.id, 1);
    s03.push(x[0]);
    console.log('x, s03 and s04 after ',x, s03, s04 );
    console.log('s03.length === 2 and s02 !== 0', s03.length === 2, s02 !== 0);
    if (s03.length === 2 && s02 !== 0) {
      s[1] = s[1]+1;
      gameMonad.run(s00, s01, s02, s03, s04 ); 
      console.log("IN THE IF BLOCK - Now calling updateCalc s03 and s02 are", s03, s02);
      updateCalc(s03,s02);
      return;
    }
    console.log('BYPASSING THE IF BLOCK - Calling run');
    gameMonad.run(s[0][s[1]][0], s[0][s[1]][1], s02, s03, s04); 
   });

  var opClick$ = sources.DOM
    .select('.op').events('click');

  var opClickAction$ = opClick$.map(e => {
    var s = gameMonad.s.slice();
    var s03 = s[0][s[1]][3].slice();
    if (s03.length === 2) {
      s[1] = s[1]+1;
      console.log("Now calling updateCalc. s03 and e.target.innerHTML are",s03,e.target.innerHTML);
      updateCalc(s03, e.target.innerHTML);
    }
    else {
      gameMonad.s[0][s[1]][2] = e.target.innerHTML
    }
  });

  var forwardClick$ = sources.DOM
    .select('#ahead.tao1').events('click')

  var backClick$ = sources.DOM
    .select('#back.tao100').events('click');

  var backAction$ = backClick$.map(() => {
    if (gameMonad.s[1] > 0) {
      (gameMonad.s[1])-=1
      let s = gameMonad.s[0][gameMonad.s[1]].slice();
      socket.send(`CG#$42,${pMgroup.x},${pMname.x},${s[0]},${s[1]}`);
      gameMonad.html = bNode(s[4]);
    }
  });

  var forwardAction$ = forwardClick$.map(() => {
    if (gameMonad.s[1] < gameMonad.s[0].length - 1) {
      (gameMonad.s[1])+=1 
      let s = gameMonad.s[0][gameMonad.s[1]].slice();
      socket.send(`CG#$42,${pMgroup.x},${pMname.x},${s[0]},${s[1]}`);
      gameMonad.html = bNode(s[4]);
    }
  });

  var fib2 = function fib2(v) {
    if (v[2] > 1) {
      retrn(mMfib,[v[1], v[0] + v[1], v[2] - 1]);
    }
    else {
      retrn(mM19,v[0]);
    }
  };

  var fibPress$ = sources.DOM
    .select('input#code').events('keydown');

  var fibPressAction$ = fibPress$.map(function (e) { if (e.target.value === '') {
    return;
  }
    ;
    if (e.keyCode === 13) {
      retrn(mM21,e.target.value);
      fib2([0, 1, e.target.value]);
    }
  });
  // *******************************************n****************************** ENDOM iginal Fibonacci END
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> START PRIME FIB

  const workerB$ = sources.WWB.map(m => {
    console.log('In workerB$ stream in the main thread. m, m[3] ', m, m.data[3] );
    if (m.data[3] === 'color') {
      retrn(fill1Monad,m.data[0]);
      retrn(fill2Monad,m.data[1]);
      retrn(fill3Monad,m.data[2]);
      retrn(mMprimeBlurb,m.data[5]);
      retrn(mMfibBlurb,m.data[4]);
      retrn(mMprimeFibBlurb,m.data[6]);
    }
    else {
      console.log('m.data[3] ********************', m.data[3] );
      retrn(mMelapsed,elapsed(m.data[0][3]))
        .bnd(v =>  console.log(v));
      retrn(mMres,m.data[0])
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
    .map(() => retrn(mMres,[mMres.x[0], '', mMres.x[2], mMres.x[3]]));


  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  Begin Easy

  var factorsPress$ = sources.DOM
    .select('input#factors_1').events('keydown');
  var factorsAction$ = factorsPress$.map(function (e) {
    console.log('&&&&&>>> ^ ^ ^   * * *   >>Cordial greetings from factorsAction$. e is', e );
    var factors = [];
    retrn(mMfactors3,'');
    if (e.keyCode === 13) {
      var num = e.target.value;
      if (!num.match(/^[0-9]+$/)) {
        retrn(mMfactors3,'This works only if you enter a number. ' + num + ' is not a number');
      }
      else {
        var n = parseInt(num, 10);
        workerC.postMessage([primesMonad.s, n]);
      }
    }
  });

  const workerC$ = sources.WWC.map(m => {
    console.log('Back in the main thread. m is', m );
    retrn(mMfactors,m.data[0]);
    retrn(mMfactors23,m.data[1]);
    window['primesMonad'] = new MonadState('primesMonad', m.data[2]);
  });


  var factorsP$ = sources.DOM
    .select('input#factors_5').events('keyup');

  var fA$ = factorsP$.map(function (e) {
    retrn(mMfactors7,'');
    var factors = [];
    if (e.keyCode === 13) {
      var ar = (e.target.value).split(',').map(v => parseInt(v,10));
      console.log('In fA$ ar is', ar );
      if (ar[0] !== ar[0] || ar[1] !== ar[1] || typeof ar[0] !== 'number' || typeof ar[1] !== 'number') {
        retrn(mMfactors7,'It works only if you enter two integers separated by a comma.');
        return;
      }
      else {
        //workerD.postMessage([primesMonad.s, ar, mMfactors6.x]);
        workerD.postMessage([primesMonad.s, ar, decompMonad.s, 'Happy, happy']);
      }
    }
  });

  const workerD$ = sources.WWD.map(m => {
    console.log('Back in the main thread. m is', m );
    retrn(mMfactors6,m.data[0][3]);
    window['primesMonad'] = new MonadState('primesMonad', m.data[0], primes_state);
    retrn(mMfactors8,m.data[1]);
  });


  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^  End Easy

  var factorsPress_b$ = sources.DOM
    .select('input#factors_1b').events('keydown');

  var factorsAction_b$ = factorsPress_b$.map(function (e) {
    console.log('Cordial greetings from factorsAction$_b$. e is', e );
    var factors = [];
    retrn(mMfactors3_b,'');
    if (e.keyCode === 13) {
      var num = e.target.value;
      if (!num.match(/^[0-9]+$/)) {
        retrn(mMfactors3_b,'This works only if you enter a number. ' + num + ' is not a number');
      }
      else {
        var n = parseInt(num, 10);
        workerE.postMessage([primesMonad.s, n, decompMonad.s]);
      }
    }
  });

  const workerE$ = sources.WWE.map(m => {
    // console.log('Back in the main thread. m is', m );
    retrn(mMfactors_b,m.data[0]);
    window['primesMonad'] = new MonadState('primesMonad', m.data[1]);
    window['decompMonad'] = new MonadState('decompMonad', m.data[2]);
  });

  var factorsP_b$ = sources.DOM
    .select('input#factors_5b').events('keyup');

  var fA_b$ = factorsP_b$.map(function (e) {
    retrn(mMfactors7,'');
    var factors = [];
    if (e.keyCode === 13) {
      var ar = (e.target.value).split(',').map(v => parseInt(v,10));
      console.log('In fA$ ar is', ar );
      if (ar[0] !== ar[0] || ar[1] !== ar[1] || typeof ar[0] !== 'number' || typeof ar[1] !== 'number') {
        retrn(mMfactors7,'It works only if you enter two integers separated by a comma.');
        return;
      }
      else {
        workerF.postMessage([primesMonad.s, ar, decompMonad.s]);
      }
    }
  });

  const workerF$ = sources.WWF.map(m => {
    console.log('Back in the main thread. m is', m );
    retrn(mMfactors6_b,m.data[2][3]);
    window['primesMonad'] = new MonadState('primesMonad', m.data[0], primes_state);
    window['decompMonad'] = new MonadState('decompMonad', m.data[2], primes_state);
    retrn(mMfactors8_b,m.data[1]);
  });

  var factorsP_c$ = sources.DOM
    .select('input#factors800').events('keyup');

  var fA_c$ = factorsP_c$.map(function (e) {
    console.log('In fa_c$ *************************************************************'),
      retrn(mMfactors800,'');
    var factors = [];
    var ar = (e.target.value).split(',').map(v => parseInt(v,10));
    if (e.keyCode === 13) {
      console.log('In fA_c$ ar is', ar );
      if (ar[0] !== ar[0] || ar[1] !== ar[1] || typeof ar[0] !== 'number' || typeof ar[1] !== 'number') {
        retrn(mMfactors7,'It works only if you enter two integers separated by a comma.');
        return;
      }
      else {
        console.log('In fA_c$ else block. ar is', ar );
        retrn(mMfactors800,simpleWay(ar[0], ar[1]));
      }
    }
  });

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ENDOM prime factors END
  // ?<>>><>><><><><>>>><><><  traversal  ><><><><><><>>><><><><><><><><><><><>< START traversal
  // document.getElementById('login').focus();
  // <>>><>><><><><>>>><><><  traversal  ><><><><><><>>><><><><><><><><><><><>< ENDOM traversal
  // <>>><>><><><><>>>><><><  traversal  ><><><><><><>>><><><><><><><><><><><>< START Itterator


  mMZ1.bnd(v => mMt1
    .bnd(add,v).bnd(w => {
      retrn(mMt1,w)
        .bnd(cube)
        .bnd(x => retrn(mMt3,w + ' cubed is ' + x))}));

  mMZ2.bnd(v => cube(v)
    .bnd(w => retrn(mMt3,v + ' cubed is ' + w)));

  var testZ = sources.DOM
    .select('#testZ').events('click');

  var testZAction$ = testZ.map(function () {
    mMZ1.release(1);
  });

  var testQ = sources.DOM
    .select('#testQ').events('click');

  var testQAction$ = testQ.map(() => {
    retrn(mMt1,0)
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
      retrn(mMquad4,'');
      retrn(mMquad6,'');
      retrn(mMquad5,a + " * x * x ")
      mMZ3.bnd(b => {
        retrn(mMquad6,b + ' * x ')
        mMZ3.bnd(c => {
          retrn(mMtemp,[a,b,c])
            .bnd(fmap, qS4,'mMtemp2')
            .bnd(result => {
              let x = result[0]
              let y = result[1]
              if (x === 0) {
                retrn(mMquad5,'No solution', mMtemp)
                retrn(mMquad6,' ');
                solve();
                return;
              }
              if (y === 0) {
                retrn(mMquad5,'No solution')
                retrn(mMquad6,' ')
                solve();
                return;
              };
              retrn(mMquad4,"Solutiions for " + a + ", " + b + " and " + c + " are " + x + " and  " + y)
              retrn(mMquad5,p(a).text + " * " + x + " * " + x + " + " + p(b).text +
                " * " + x + " " + p(c).text + " = 0")
              retrn(mMquad6,p(a).text + " * " + y + " * " + y + " + " + p(b).text +
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

  var process2 = function (str, index) {
    var ar = str.split(',');
    var task;
    if (ar.length === 1) {
      task = ar;
    }
    if (ar.length > 1) {
      task = ar.reduce(function (a, b) { return a + '$*$*$' + b; });
    }
    console.log('In process2. str, ar and task are', str, ar, task );
    var a = mMcurrentList.x.split(',');
    a[6 * index] = task;
    var b = a.reduce(function (a, b) { return a + ',' + b; });
    console.log('Still in process2. task, a and b are', task, a, b );
    task2(b);
  };

  // **********************************************************************END TODO LIST
  var captionClick$ = sources.DOM
    .select('#caption').events('click');

  var captionClickAction$ = captionClick$.map(function () {
    (get(mMcaptionDiv)  === 'none') ?
      retrn(eMcaptionDiv,'block') :
      retrn(mMcaptionDiv,'none')
  });

  var gameClick$ = sources.DOM
    .select('#game').events('click');

  var gameClickAction$ = gameClick$.map(function () {
    (get(mMgameDiv)  === 'none') ?
      retrn(mMgameDiv,'block') :
      retrn(mMgameDiv, 'none')
  });

  var clearPicked$ = sources.DOM
    .select('#clear').events('click');

  var clearAction$ = clearPicked$.map( () => {
    gameMonad.clearPicked();
  });

  var elemB$ = sources.DOM.select('input#message2').events('keyup')
    .map(e => {
      returmM10, (e.target.value);
      worker.postMessage([mM9.x, e.target.value]);
    });

  var pr$ = sources.DOM
    .select('#primeNumbers').events('keypress');

  var prAction$ = pr$.map(function (e) {
    if (e.keyCode === 13) {
      worker.postMessage(["CE#$42", primesMonad.s, e.target.value]);
    }
  });


  // Clicking the checkbox to indicate that a task has been finished.
  var cbx$ = sources.DOM.select('input#cbx').events('click');

  var cbxAction$ = cbx$.map(e => {
    console.log('************************************ event detected');
    var s = taskMonad.s.slice();
    console.log('1 in cbxAction$. s is', s );
    var index = e.target.parentNode.id;
    s[index][1] = eval(s[index][1]) === true ? false : true
    s.map(v => v[0] = v[0].replace(/','/g, "<<>>"));
    console.log('2 in cbxAction$. s is', s );
    var str = s.join('@');
    console.log('3 in cbxAction$. str is', str);
        socket.send(`TD#$42,${pMgroup.x},${pMname.x},@${str}`);
  });

  // Clicking the completed / not completed buttons.
  var chbox1Click$ = sources.DOM.select('#chbox1').events('click');

  var chbox1Action$ = chbox1Click$.map( e => {
    console.log('************************************ event detected');
    var s = taskMonad.s.slice();
    console.log('In chbox1Action. $$$$$$$$$$$$$$$$$$$$$ e and s are', e, s);
    var index = e.target.parentNode.id;
    s[index][1] = false;
    s.map(v => v[0] = v[0].replace(/,/g, "<<>>"));
    var str = s.join('@');
    console.log('In chbox1Action. str is', str);
        socket.send(`TD#$42,${pMgroup.x},${pMname.x},@${str}`);
  });

  var chbox2Click$ = sources.DOM.select('#chbox2').events('click');

  var chbox2Action$ = chbox2Click$.map( e => {
    console.log('****** in chbox2Action$ ****************************** event detected');
    var s = taskMonad.s.slice();
    console.log('In chbox2Action$. e and s are', e, s);
    var index = e.target.parentNode.id;
    s[index][1] = s[index][1] == true ? false : true
    s[index][4] = s[index][4] == "none" ? "line-through" : "none"
    s[index][0] = s[index][0].replace(/,/g, "<<>>");
    var str = s.join('@');
        socket.send(`TD#$42,${pMgroup.x},${pMname.x},@${str}`);
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
      socket.send(`TX#$42,${get(pMgroup)},${get(pMname)}`);
    }
    else {
      var s = taskMonad.s.slice();
      var index = e.target.parentNode.id;
      s.splice(index, 1);
      s.map(v => v[0] = v[0].replace(/,/g, "<<>>"));
      var str = s.join('@');
        socket.send(`TD#$42,${pMgroup.x},${pMname.x},@${str}`);
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
    s.map(v => v[0] = v[0].replace(/','/g, "<<>>"));
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
      s[index][0] = e.target.value
        .split(",")
        .join("<<>>")
      s[index][1] = false;
      s[index][4] = "none";
      var str = s.join('@');
        socket.send(`TD#$42,${pMgroup.x},${pMname.x},@${str}`);
    }
  });

  // Editting a comment.
  /*var edit4B$ = sources.DOM
    .select('.edit4B').events('keypress');

var edit4BAction$ = edit4B$.map(function (e) {
  console.log('************************************ event detected');
  console.log('In edit4BAction$. e is', e );
  var arr;
  var str;
  if (e.keyCode === 13) {
    var s = commentMonad.s.slice().split('@');
    s.push(pMname.x + '<o>' + e.target.value);
    var str = s.join('@');
    console.log('<*><*><*><*>*<*><*><*><*> In edit4BAction$. s and str are', s, str);
        socket.send(`TD#$42,${pMgroup.x},${pMname.x},@${str}`);
    showEditB = 'none';
  }
});   */

  // Creating a new task
  var newTask$ = sources.DOM
    .select('input#newTask').events('keydown');

  var newTaskAction$ = newTask$.map(function (e) {
    console.log('************************************ event detected, e',e);
    if (e.keyCode === 13) {
      var alert = '';
      var s = taskMonad.s.slice();
      s.map(v => v[0] = v[0].replace(/,/g, "<<>>"));
      console.log('In newTaskAction$. <><><><><><><> s is', s);
      var todo = [];
      var ar = e.target.value.split(',');
      console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
      console.log('************************* In newTaskAction$ *** ar is', ar );
      console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
      if (ar.length < 2) {
        retrn(mMalert, 'You should enter "author, responsible party, task" separated by commas');
        return;
      }
      else {
        console.log("****************<$><$><$><$><$>******************* START");
        console.log('ar,todo', ar,todo);
        todo[2] = ar.shift();
        console.log('ar,todo',ar,todo);
        todo[3] = ar.shift();
        console.log('ar,todo',ar,todo);
        todo[0] = ar.join('<<>>')
        console.log('ar,',ar,todo);
        todo[1] = false;
        console.log('ar,todo',ar,todo);
        console.log("***************<$><$><$><$><$>******************** END");
        s.push(todo);
        console.log('*&*&*&*&*&*&*&*&*** In newTaskAction$. s is', s );
        var str = s.join('@');
        console.log('<><><><><><><><><><><><><><><><><><> In newTaskAction$. str is', str);
        socket.send(`TD#$42,${pMgroup.x},${pMname.x},@${str}`);
        e.target.value = '';
      }
    }
  });

  console.log('Just before calcStream@');

  var chatClick$ = sources.DOM
    .select('#chat2').events('click')
    .map(() => showChatDiv = showChatDiv === "none" ? "block" : "none")

  var todoClick$ = sources.DOM
    .select('#todoButton').events('click')
    .map(() => showTodoDiv = showTodoDiv === "none" ? "block" : "none")

  var calcStream$ = xs.merge( seriesAction$, commentAction$, cbxAction$, chbox1Action$, chbox2Action$, messagePressAction$, fA_c$, forwardAction$, backAction$, prAction$, factorsAction_b$, fA$, factorsP$, fA_b$, factorsP_b$, clearprimes$, workerB$, workerC$, workerD$, workerE$, workerF$, clearAction$, factorsAction$, primeFib$, fibPressAction$, quadAction$, edit1Action$, edit2Action$, editBAction$, testWAction$, testZAction$, testQAction$, deleteAction$, deleteAction2$, newTaskAction$, chatClick$, gameClickAction$, todoClick$, captionClickAction$, groupPressAction$, rollClickAction$, registerPressAction$, messages$, numClickAction$, opClickAction$);
  return {
    DOM: calcStream$.map(function () {
      return h('div.main', [
        h('div.preContent', [
          h('br'),
          h('br'),
          h('div', 'JAVASCRIPT MONADS') ]), h('br'),
        h('div.image_3', [
          h('img.image_2', {props: {src: "logo.svg" }}  ),
          h('span', ' ' ),
          h('a', { props: { href: "https://cycle.js.org/", target: "_blank" } }, 'A Cycle.js application') ]),
        h('div.content', [
          h('span.tao', ' This project features two ways of binding operations: the bnd() method and the bind() function. bnd() and bind facilitate chaining function calls. They can be thought of as counterparts to Haskell\'s >>= operator (called "bind"). The project was created by, and is actively maintained by me, David Schalk. The code repository is at '),
          h('a', { props: { href: "https://github.com/dschalk/JS-monads-stable", target: "_blank" } }, 'JS-monads.'),
          h('br'),
          h('p', ' We begin with monads that don\'t have a bnd() method. Here is the definition of the monad constructor Monad: ' ),
          h('pre', `  function Monad(z = 'default', ID = 'tempMonad') {
    this.x = z;
    this.id = ID;
  }; ` ),
          h('p', ' m, m1, m2, m3, m4, m5, m6, and m7 are instances of Monad. They were created by running code such as "var m = new Monad(0, "m"). '),  
          h('p', ' Instances of Monad work in conjunction with the function bind (described below). The following demonstration shows bind(m) updating six monads by means of the six functions that are appended to it. functions provided to bind(m) can take any valid JavaScript values as arguments, but they must return instances of Monad. And although the functions return monads, each link in the chain is a function similar to the return value of bind(m), which might be whimsically viewed as a mysterious invisible monad, but it is certainly not an instance of Monad. ' ),
          h('pre', `  bind(m)(x=>ret(3))(cube,"$m2")(add,3,"$m3")(square,"$m4")
  (x=>ret(x/100),"$m5")(x=>ret(x*5),"$m6")(add,-3,"$m7")(terminate)

  console.log(m.x,m2.x,m3.x,m4.x,m5.x,m6.x,m7.x)
  Result: 3, 27, 30, 900, 9. 45, 42 ` ),

          h('p', ' Here is a description of what bind() does: Let m1, m2, and m3 represent the original m, updated m, and twice updated m. bind(m1) returns a function named "inner()". inner() operates on m1 along with the function and whatever arguments it receives, call them "func" and "args". m1 is not one of the arguments, it is built into inner. bind() is a type of higher order function known as a "closure".' ),
          h('p', ' inner(func, ...args) processes its arguments and m1, creates m2, and returns bind(m2) which immediately returns the function named "inner()". It is almost identical to the inner() we just saw, but this inner has access to m2, not m1. Let\'s call it "inner2" and let "func2" and "args2" be a function and possible arguments. ' ),
          h('p', ' inner2(func2, ...args2) produces twice updated m, which we named "m3", and returns bind(m3) which immediately returns a fresh version of inner(). The cycle continues until inner() is called with the argument "terminate".' ), 
          h('p', ' veteran functional programmers will read the definition of bind() (shown below) and see how it works right away. Others will need to give their brains time to develop neurons arranged in patterns corresponding to the "higher order functions" paradigm. ' ),  
          h('h3', 'Higher Order Functions' ),
          h('p', ' Understanding functions that take functions as arguments and return new functions can be confusing. But after a while, working with them becomes second nature and you are rewarded for your toil with powerful new tools for writing safe, succinct, and well-organized robust code. So here is bind() along with its helper functions: ' ),     
          h('pre', `    function bind (m) {
      if (!(m instanceof Monad)) {
        console.log('bnd operates only on instances of Monad')
        return;
      }
      var m = m;
      var inner = function (func, ...args) { 
        var y = func(m.x, ...args) 
        y.id = testPrefix(args, m.id)
        window[y.id] = new Monad(y.x, y.id);
        if (func.name === "terminate") {
          window[m.id] = new Monad (m.x, m.id);
          return window[m.id];
        }
        return bind(y); 
      };
      return inner
    }

    function testPrefix (x,y) {
      var t = y;  // y is the id of the monad calling testPrefix
      if (Array.isArray(x)) {
        x.map(v => {
          if (typeof v == 'string' && v.charAt() == '$') {
             t = v.slice(1);  
          }
        })
      }
      return t;
    } ` ),
          h('p', ' The ret() function is useful for defining instances of Monad. Here\'s an example: ' ),

          h('pre', `    bind(ret(2,"moocow"))(double)(double)(double)(double)(double,"$moocow") ` ),
          h('p', ' The result is 64, the number expected when you double 2 and continue doubling four more times. '),
          h('p', ' The Haskell monad laws are loosely analogous to the category theory criteria for monads. Here they are: '),
          h('pre', `  m >>= return \u2261 m   
  (return x) >>= f \u2261 f x 
  (m >>= f) >>= g \u2261 m >>= ( \\x -> (f x >>= g) `), 
          h('p', ' And here is ret() behaving as the left and right identity function inside of bind: ' ), 
          h('pre', `    bind(m)(ret,"m")(terminate).x === bind(ret(m.x))(terminate).x  `),
          h('p', ' Functions inside of bind() commute, as shown in this example: ' ),
          h('pre', `    bind(m)(v=>0)(v => add(v,5))(cube)(terminate) 
      === bind(m)(v=>0)(add,5)(v=>cube(v))(terminate) );  // true ` ),
          h('p', ' This doesn\'t prove anything. Neither Haskell\'s nor JavaScript\'s values and functions constitute a mathematical category. But commutative and the presence of an identity function are features of robust, useful code, so it is reassuring to see that we have them. ' ),
          h('h3', 'Numeric Series' ),
          h('p', ' Here\'s a function that produces a series of numbers of arbitrary length: ' ),
          h('pre', `  function series (n, func, base) {
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
  }  ` ),
          h('p', ' I ran series with the arguments 5000, x=>0.5+0.5*x*x, and 0.5 (shown below). ' ), 
          h('pre', `  var seriesArray = series(5000,x=>0.5+0.5*x*x, 0.5);
  console.log(seriesArray) ` ),
          h('span', ' The 5000 results start at 0.5 and approach the number 1. ' ),    
          h('span.red15', `0.5, 0.625, ... 0.99998000265, 0.99998000285`    ),
          h('span', ' are the first and final two numbers in the series. The function ran in 16 microseconds, but it took around one second to get the log display. ' ),
          h('br'),
          h('br'),
          h('p', ' A slightly modified version named series2 generates data for the demonstration below.  If you enter the starting number, you will be prompted to enter a fat arrow function (a function beginning with "x => ..."). After entering that, you will be prompted to enter the number of terms in your series. If you enter that and all goes well, the series will be displayed. If the server crashes, reload the browser and try again. ' ),
          h('span.tao', ' For example, '), 
          h('span.red15', '3' ),
          h('span', ' followed by ' ),
          h('span.red15', ' x=>ret(x+3) ' ),
          h('span', ' followed by ' ), 
          h('span.red15', '5' ),
          h('span', ' causes ' ),
          h('span.red15', '3, 6, 9, 12, 15, 18' ),
          h('span', ' to be displayed. ' ),
          h('br'),
          h('br'),
          h('span.red4', m22.x ), 
          h('br'),
          h('br'),
          h('input#series', ),
          h('br'),
          h('br'),
          h('span.red15', mMseries.x ),
          h('br'),
          h('br'),
          h('p', ' Snabbdom, xstream, and most of the monads and functions presented here are available in browser developer tools consoles and scratch pads. A production site would load these as modules, but this site is for experimentation and learning so many of its resources load as scripts designated in the index.html file. ' ),
          h('span.italic', ' These monads are like the Haskell monads in that they resemble the monads of category theory without actually being mathematical monads. See ' ),
          h('a', { props: { href: "http://math.andrej.com/2016/08/06/hask-is-not-a-category/", target: "_blank" } }, 'Hask is not a category.'),
          h('span', ' by Andrej Bauer and the ' ),
          h('a', { props: { href: '#discussion' } }, 'Discussion'),
          h('span', ' below. They provide a convenient interface for dealing with uncertainty and side effects in a purely functional manner. Adherence to the monad laws (see below) helps make the monads robust, versatile, and reliable tools for isolating and chaining sequences of JavaScript functions. ' ),
          h('p', ' The demonstrations include comments, shared todo lists, text messaging, and a simulated dice game with a traversable history (all group members see your score decrease or increase as you navigate backwards and forwards, optionally branching out from an earlier state). The game history is a persistent, immutable data structure. The comments and todo lists are persistent mutable data structures. '),
          h('p', ' The monad demonstrations range from showing the versatility and potential utility of members of the Monad class. Their bnd() methods accept functions which return instances of Monad, so     performing lengthy mathematical computations asynchronously in web workers. Monads encapsulate state. The error checking monad carries occurrences of NaN and runtime errors through sequences of computations much like the Haskell Maybe monad. ' ),
          h('span.tao', ' The game code is fairly concise and intuitive. A quick walk-through is presented ' ),
          h('a', { props: { href: '#gameExplanation' } }, 'here'),
          h('span', '. To see monadic functionality at work, I suggest that you take a look at the section captioned ' ),
          h('a', { props: { href: '#asyncExplanation' } }, 'Asynchronous Processes'),
          h('br'),
          h('p', ' But it might be best to first proceed down the page and see the examples of Monad instances manipulating data. If you are trying to wrap you head around the concept of pure, chainable functions, such as the functions in the Underscore and Jquery libraries, understanding Monad instances might finally put you in the comfort zone you seek. ' ),
          h('p', ' More and more, I am transforming this project into a showcase of functional reactive programming. I still have global objects holding things together, such as pMscore, pMname, and pMgroup. These are instances of Monad, so it is convenient to avoid mutation. pMscore,x) seems to replace the value held by pMscore with x, but underneath the hood an instance of Monad is created during each update. The next refactoring will put almost everything that updates into streams. "A foolish consistency is the hobgoblin of little minds" -- Emerson. JavaScript allows the mutation of objects. It, along with "eval" and other frowned-upon features, can be useful. ' ), 
          h('h3', 'The Game'),
          h('p', 'People who are in the same group, other than the default group named "solo", share the same todo list, chat messages, and simulated dice game. In order to see any of these, you must establish a unique identity on the server by logging in. The websockets connection terminates if the first message the server receives does not come from the sign in form. You can enter any random numbers, letters, or special characters you like. The server checks only to make sure someone hasn\'t already signed in with the sequence you have selected. If you log in with a name that is already in use, a message will appear and this page will be re-loaded in the browser after a four-second pause. '),
          h('p', ' Data for the traversable game history accumulates until a player scores three goals and wins. The data array is then erased and the application is ready to start accumulating a new history. '),
          h('p', ' Your user name for trying out the game, todo list, and chat demonstrations is a random permutation of the first 14 letters of the alphabet. In the comments section, near the bottom of this page, you can chose your own user name and a password. These facilitate leaving comments which can later be revised or removed.' ),
          code.monad,
          code.variations,
          code.variations2


        ]),
        h('img.image', {props: {src: "demo_000.png"}, style: {marginLeft: "auto", marginRight: "auto"}}),
        h('div.content', [ 

          h('br') ]),
        h('hr.len90', {style: { display: mMgameDiv2.x }}, ),
        h('br.len90', {style: { display: mMgameDiv2.x }}, ),
        h('div.heading',  {style: { display: mMgameDiv2.x }}, 'Game, Todo List, Text Messages' ),

        h('div#gameDiv2', {style: { display: mMgameDiv2.x }}, [
          h('br'),
          h('div#leftPanel', {style: { display: mMgameDiv2.x }}, [
            h('p', 'RULES: If clicking two numbers and an operator (in any order) results in 20 or 18, the score increases by 1 or 3, respectively. If the score becomes 0 or is evenly divisible by 5, 5 points are added. A score of 25 results in one goal. That can only be achieved by arriving at a score of 20, which jumps the score to 25. Directly computing 25 results in a score of 30, and no goal. Each time ROLL is clicked, one point is deducted. Three goals wins the game. '),
            h('p', {style: {color:'red', fontSize:  '20px'}}, mMgoals2.x ),
            gameMonad.html,
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
              h('div', 'Selected numbers: ' + gameMonad.s[0][gameMonad.s[1]][3]),
              h('div', 'Operator: ' + gameMonad.s[0][gameMonad.s[1]][2]),
              h('div', 'Index: ' + gameMonad.s[1]),
              h('button#clear', 'Clear selected numbers' ),
              h('p', ' When traversing the game history, any time there are two selected numbers you can click any operator to obtain a result; or you can clear the selected numbers and click numbers of your choice. You can do anything you want with displayed numbers, but if there is a previously selected operator and you click a second number (shown after "Selected numbers:"), a computation will be performed using the previously selected operator. If that happens and it isn\'t what you want, you can back up and select a different operator before clicking a second number.'),
              h('span', 'Change group: '),
              h('input#group', 'test' ),
              h('p', mMsoloAlert.x ),
            ])
          ]),

          h('div#rightPanel', { style: { display: 'block' } }, [
            h('br'),
            h('br'),
            h('br'),
            h('br'),
            h('br'),
            h('br'),
            h('button#todoButton.cow', 'TOGGLE TODO_LIST'),
            h('br'),
            h('br'),
            h('button#chat2.cow', 'TOGGLE CHAT'),
            h('br'),
            h('br'),
            h('br'),
            h('br'),
            h('div.game', 'Name: ' + pMname.x ),
            h('div.game', 'Group: ' + pMgroup.x ),
            h('br'),
            h('div', gameData ),
            h('br'),
            h('div#a100', ' _________________________________________________ ' ),



            h('p.italic', ' Join group "t" if you want to see some previously created tasks. ' ),
            h('div',  { style: { display: showTodoDiv } }, [
              h('div', "Peanut Butter" ),
              h('div', 'Enter author, responsible person, and task here: '),
              h('input#newTask') ]),
    h('br'),
    h('span#alert', mMalert.x ),
    h('br'),




    h('br'),
    h('div#chatDiv', { style: { display: showChatDiv } }, [
      h('div#messages', [
        h('span', 'Message: '),
        h('input.inputMessage'),
        h('div', messages  ),
        h('br'),
      ])
    ])
  ])
]),
h('div#a100', ' ____________________________________________________________________________________________________________ ' ),
h('div.content', [


 // **************************************************************************** START MONAD
   code.monad,
   code.variations ]),
h('img.image', {props: {src: "demo_000.png"}, style: {marginLeft: "auto", marginRight: "auto"}}),
   h('div.content', [ 
   code.variations2,


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
h('span', mMfibBlurb.x  ),
h('span', [
  h('svg', {attrs: {width: 50, height: 50}}, [
    h('circle', {attrs: {cx: 25, cy: 25, r: 20, stroke: 'purple', 'stroke-width': 4, fill: fill1Monad.x }})
  ])
]),

h('span', mMprimeBlurb.x  ),
h('span', [
  h('svg', {attrs: {width: 50, height: 50}}, [
    h('circle', {attrs: {cx: 25, cy: 25, r: 20, stroke: 'purple', 'stroke-width': 4, fill: fill2Monad.x }})
  ])
]),

h('span', mMprimeFibBlurb.x  ),
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
h('br'),


h('p', ' The second demonstration in this series decomposes numbers into its their prime factors. Testing with sequences of 9\'s, the first substantial lag occurs at 9,999,999 - unless a large array of prime numbers has already been generated in the previous demonstration or elsewhere. Here it is:' ),
h('input#factors_1'),
h('br'),
h('br'),
h('span', mMfactors.x ),
h('span.tao3', mMfactors23.x ),



  h('h2', 'COMMENTS' ),
  // h('div#com2',  { style: { display: abcde} }, ),

h('p', ' When this page loads in the browser, a user name is automatically generated in order to establish a unique websocket connection. This makes it possible to exchange text messages with other group members, play the game, and work on a shared todo list.'),

h('h2', 'More About State'),
h('p', ' Comments are distributed to all groups. If you want to leave a comment, you need to log in with some text containing one comma. What you enter before the comma will be your user name and what you put after the comma will be your password. This information will be permanently stored in a text file accessible by the Haskell server. The server, on start up, loads the file into a TVar to prevent clashes when two or more browsers simultaneously upload user names and passwords. The permanent file will make it possible for you to log in and modify or delete your comment in the future.' ),

h('p', ' If you enter user name that is already recorded with a different password, you will be asked to try again. Otherwise, you will be logged in as the user whose name you entered. If you enter a user name that has not been recorded, you will be logged in with that name when you register. Group membership and game scores will not be affected. '),

  h('br'),  
  h('h3', 'Register' ),
  h('span.red', mMregister.x ),
  h('input.register', {style: {display: mMshowRegister.x }} ),
  // h('a', { props: {href: "mailto:pyschalk@gmail.com"}}, 'email' ),
  // h('span', ' or send a personal tweet to @schalk1234' ),
  h('br' ),
  h('br' ),
  h('h3', 'COMMENTS' ),
  h('textarea#comment', ),
  h('br' ),
  h('br' ),
  h('div', mMcomments.x ),
  h('br'),
  h('p', ' When the server starts, the following code puts the comments file in a TVar ' ),
      code.comments0,
  h('p', ' When a browser loads, the server responds as follows: ' ),
      code.comments1, 
  h('p', ' The browser then processes the information it receives as follows: ' ),
      code.comments2,
  h('p', ' mMcomments.x is embedded in the virtual DOM code, so when a browser loads, the comments are automatically displayed. commentMonad (above) and its method "run" are defined below.' ),
      code.comments3,
  h('p', ' commentMonad.run places a string containing all of the comments in commentMonad.s[0]. It places in commentMonad.s[1] an array of the comments produced by splitting up the comments (attached by "<@>") and splitting the commenter from the comment (attached by "<O>"). This array of arrays is used to produce the html that is displayed, and to modify comments. There is no reason to use JSON or a Haskell parsing library. The JavaScript methods "join" and "split" make it easy to send and receive strings over a socket and parse them into arrays for display. Here is what the server does when it receives an id and modified comment:  ' ),
  h('p', ' Each comment is placed in a div with a unique numerical id. This id is used for deleting comments and for modifying them. Here is the code that executes when the server receives an id and revised comment: ' ),
      code.comments4,
  h('p', ' And here is what the browsers do with the index number and text broadcast by the server: ' ),
      code.comments5, 
  h('p', ' The code for deleting a comment is similar: ' ),
      code.comments6,
  h('br'),  











  
  
  
  h('a', { props: { href: '#top' } }, 'Back To The Top'),

  h('br#itterLink'),
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
h('button#testQ', 'mMt1,0).bnd(v => mMZ2.release(v)) '),
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
h('p', 'Run mMZ3.release(v) three times for three numbers. The numbers are a, b, and c in ax*x + b*x + c = 0. Remember to press <ENTER> after each number. '),
h('input#quad'),
h('p', 'Here is the code:'),
code.quad,
h('p', ' fmap (above) facilitated using qS4 in a monadic sequence. qS4 returns an array, not an instance of Monad, but fmap lifts qS4 into the monadic sequence. '),
h('p', ' The function solve() is recursive. It invokes itself after release() executes three times. The expression "solve()" resets solve to the top, where mMZ3.p becomes a function containing two nested occurrences of mMZ3.bnd. After mMZ3.release() executes, mMZ3.p becomes the function that is the argument to the next occurrence of mMZ3.bnd. That function contains yet another occurrence of mMZ3.bnd. MonadItter is syntactic sugar for nested callbacks. ' ),

// **************************************************************************
h('p#gameExplanation', ' ' ),
h('p', ' ' ),
h('p', ' ' ),
h('p', ' ' ),
h('p', ' ' ),

h('a', { props: { href: '#top' } }, 'Back To The Top'),

//************************************************************************** START GAME

h('h2', 'The Simulated Dice Game' ),
h('p', ' The game is controlled by gameMonad, which is an instance of MonadState. The state of the game after each click on one of the displayed numbers is saved in an array of five-member arrays comprised of three numbers and two arrays. ' ),
h('p', ' The array of state arrays is kept in gameMonad.s[0]. The elements of the five-member arrays correspond to score, goals, operator, selected numbers, and displayed numbers. ' ),
h('p', ' gameMonad.s[0][ganeMonad.s[1]] is the state in gameMonad.s[0] that is displayed in the browser. As the previous sentence implies, the index number of the displayed state is the value of gameMonad.s[1]. History traversal is accomplished by changing gameMonad.s[1]. Here is how the application responds to clicks of the BACK and FORWARD buttons:' ),
    code.backAction,
h('p', ' gameMonad methods are responsible for everything that happens when the BACK or FORWARD buttons are clicked. These methods do not obtain information outside of the scope of gameMonad, and their side effects are confined to sending websockets messages and updating the DOM. gameMonad was designed to be secure against unpredictable behavior caused by code outside of its scope, and to also not interfere with code that is outside of its scope. gameMonad is an object whose methods conform to functional programming best practices. ' ),
h('p', ' The traversal methods are additions to MonadState.prototype as defined in the monad.js file. monad.js is accessed only by functions working in the main thread. Web workers access an identical version of MonadState, only without the prototype additions. It is available to them in the script2.js file, which is never accessed by functions operating in the main thread. Here are the additions to MonadState.prototype: ' ),
    code.prototypeAdditions,
h('h3', 'Scoring' ),
h('p', ' One goal is awarded each time a player lands on the number 25. The limit for the number of score changes in one turn is two. If the number of increases were not limited, landing on 5 would launch you into an series of increases through all the multiples of five terminating with a stack overflow error message. As a consequence of this rule, only one five-point jump is allowed per turn. '),
h('p', ' Another way to increase a score, other than computing an number which equals 0 modulo 5, is to compute the number 20 for one additional point, or the number 18 for three additional points. A quick way to arrive at 20 is to start at -1, compute 18 twice, which takes you from -1 to 2 to 5 and jumps you to 10. Then click roll, which sets you back to 9, and compute 18 twice. That takes you from 9 to 12, to 15, jumping you to 20. You don\'t get another jump, so click ROLL and compute 20 or click ROLL three times and compute 18, taking your score from 19 or 17 to 20 and then on to 25 and back to 0, with an increase of one goal. If it is your third goal, you win the game. ' ),
h('p', ' Now let\'s take a look at the code that responds to number and operator clicks: ' ),
    code.num_op,
h('p', ' Three types of events cause a state array to be added to gameMonad.s[0]. Clicking a number removes the clicked number from the display, and the new state is preserved in gameMonad.s[0]. Clicking an operator when two numbers have been selected causes a computation to be made, adding a number to the display or, if the result of the computation is 18 or 20, causing a score increase and a new roll of the dice. Either way, the result is preserved in gameMonad.s[0]. Finally, clicking the ROLL button reduces the clicker\'s score by 1 and causes four new numbers to be displayed. The resulting state is spliced into the gameMonad.s[0] array. ' ),
h('p', ' Requests for new rolls include the name and group of the player making the request. That information is used by the server to deduct one point and to limit broadcast of the new roll to only members of the requesting player\'s group. The request also includes the requesting player\'s score and goals. These are returned by the server (with one point deducted) and are v[7] and v[8] in the messages$ stream. ' ),
h('p', ' Game traversal is controlled by changing the value of mMindex.x. Here is the code that is called when the BACK button is clicked: ' ),
    code.backAction,
h('p', ' numClickAction$ and opClickAction$ call updateCalc() when gameMonad.s[0][1]][3] contains two numbers and gameMonad.s[0][1][2] is no longer 0 (implying that an operator has been selected). updateCalc takes two arguments, the selected numbers and the selected operator. This is what happens when updateCalc receives that information: ' ),
    code.updateCalc,
h('p', '  If parseInt(calc(ar[0], op, ar[1]), 10) is not 18 or 20, updateCalc sets the operator back to 0 and empties the picked numbers array. It also pushes the result of the calculation into the display array. ' ),
h('p', ' If the calculation yields 18 or 20, score(result) is called. Here is the definition of score(): ' ),
    code.sco,
h('p', ' If the score is computed to be 25, the result of increasing goals by 1 determines how state is modified. If the result is not 3, goals is incremented and newRoll() is called with arguments score and goals. If the result is 3, a winner is declared and gameMonad.s reverts to [[[0,0,0,[],[0,0,0,0]]], 0]. ' ),
h('p', ' gameMonad does not use its bnd() method, but I stayed with the usual practice of preserving state in instances of MonadState. “A foolish consistency is the hobgoblin of little minds, adored by little statesmen and philosophers and divines." - Ralph Waldo Emerson. Very true, but keeping code easy to reason about is never foolish. ' ),

h('br'),
//************************************************************************** END GAME
h('h2', 'The Todo List' ),
h('p', ' The todo list is shared be the members of each group. It is stored by the server in a file bearing the groups name. Changing to a group causes that group\'s todo list to display. Changes made by one member are immediately seen by other members. ' ),
h('p', ' Tasks are held in taskMonad.s (Nested arrays of values) and in taskMonad.html (finished HTML residing in the virtual DOM). MonadState2 has the same basic definition as MonadState, but the run 2() method added to its prototype is not the same as MonadState.run. Rather than burden MonadState.prototype with both run() and run2(), I named taskMonad\'s constructor MonadState2. ' ),
h('p', ' When a todo is created, edited, marked as completed, or deleted, the modified list of all tasks is sent to the server, where the new version replaces the former version in the file named after the group and the new version is broadcast to all group members. Here is the code that runs when a todo list arrives at a browser: ' ),
    code.todo1,
h('p', ' And here is the code that creates, modifies and adds to a list of tasks. It is the entire contents of a file named "tasks.js", which is placed in script tags in index.html. Code in script tags is readily available in the browser consoles, unlike modules loaded in main.js. '),
    code.todo2,
h('p', ' Tasks can be marked a complete or not complete by clicking the checkbox or the complete / not complete buttons. When the checkbox is clicked, the index of the todo is determined and the value of a clone of taskMonad.s named "s" is changed at s[index][1]. If its value is true, it becomes false and if it is false, it becomes true. The color of the task and the line-through attribute are controlled by s[index][1]. Whether or not the completed or not completed button shows also depends on the value of s[index][1]. When one of those buttons is clicked, the value of s[index][1] is changed, causing the check mark in the checkbox to appear or disappear, changing the task color and its line-through attribute, and changing which button ("complete" or "not complete") displays.  ' ),

//************************************************************************** END GameTraversal


h('h2', ' MonadSet '),
h('p', ' The list of online group members at the bottom of the scoreboard is very responsive to change. When someone joins the group, changes to a different group, or closes a browser session, a message prefixed by NN#$42 goes out from the server providing group members with the updated list of group members. MonadSet acts upon messages prefixed by NN#$42. Here are the definitions of MonadSet and the MonadSet instance sMplayers '),
code.MonadSet,
  h('h3', ' Websocket messages'  ),
  h('p#demo', ' Incoming websockets messages trigger updates to the game display, the chat display, and the todo list display. The members of a group see what other members are doing; and in the case of the todo list, they see the current list when they sign in to the group. When any member of a group adds a task, crosses it out as completed, edits its description, or removes it, the server updates the persistent file and all members of the group immediately see the revised list.  '),
  h('p', 'The code below shows how incoming websockets messages are routed. For example, mMZ10.release() is called when a new dice roll (prefixed by CA#$42) comes in.   '),
  code.messages,
  h('p#cmment', ' The "mMZ" prefix designates instances of MonadItter. An instance\'s bnd() method assigns its argument to its "p" attribute. "p" runs if and when its release() method is called. The next() function releases a specified MonadItter instance when the calling monad\'s value matches the specified value in the expression. In the messages$ stream, the MonadItter instance\'s bnd methods do not take arguments, but next is capable of sending arguments when bnd() is called on functions requiring them. Here is an example: '),
  h('a#tdList2', { props: { href: '#itterLink' } }, 'release() with arguments'),
  h('br'),

  h('p', ' *************************************************************************** ' ),
  h('p', ' *************************************************************************** ' ),
  h('p', ' *************************************************************************** ' ),
  h('p', ' *************************************************************************** ' ),
  h('p', ' *************************************************************************** ' ),
  h('p', ' *************************************************************************** ' ),
  h('p', ' *************************************************************************** ' ),
  h('p', ' *************************************************************************** ' ),
  h('p', ' *************************************************************************** ' ),
  h('h2', 'Appendix - Under Construction ' ),
  h('h3', 'The functions that produce the examples' ),

  h('p', ' Here are the definitions of MonadEr, its helper functions, and the function that serve as parameters to the bnd() method in the demonstration. ' ),
    code.monadEr,
  h('p', ' and here is the code that produced the Chrome console log entries: ' ),
    code.errorDemo,
  h('span.tao', ' When  a MonadEr instance encounters a function or an argument in quotation marks of types "undefined" or "NaN", a string gets pushed into the instance\'s e attribute. After that, the  bnd() method will not process any function other than clean(). It will stop at the' ),
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

