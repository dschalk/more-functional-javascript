
  h('h2', ' MonadEr - An Error-Catching Monad ' ),
  h('p', ' Instances of MonadEr function much the same as instances of Monad, but when an instance of MonadEr encounters an error, it ceases to perform any further computations. Instead, it passes through every subsequent stage of a sequence of MonadEr expressions, reporting where it is and repeating the error message. It will continue to do this until it is re-instantiated or until its bnd() method runs on the function clean(). ' ),
  h('p', 'Functions used as arguments to the MonadEr bnd() method can be placed in quotation marks to prevent the browser engine from throwing reference errors. Arguments can be protected in the same manner. Using MonadEr can prevent the silent proliferation of NaN results in math computations, and can prevent browser crashes due to attempts to evaluate undefined variables. ' ),
  h('p.tao1b', ' The monad laws hold for MonadEr instances. The following relationships were verified in the Chrome console: ' ),
  h('pre', `    ret3(0,'t',[])  // t is now an instance of MonadEr with t.x = 0 and t.e = [].

    ret(t,3).bnd(cube3).x === cube(3).x
    ret3(3).bnd(cube3).x === cube3(3).x

    t.bnd(t.ret) === t
    t.bnd(ret) === t

    ret(t,0).bnd(add3, 3).bnd(cube3).x ===
    ret(t,0).bnd(v => add3(v,3).bnd(cube3)).x  ` ),



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
