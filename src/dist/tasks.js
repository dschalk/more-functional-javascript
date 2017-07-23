var rep = new RegExp('<<>>', 'g');
var rep2 = new RegExp(',', 'g');

function MonadState2(g, state) {
  console.log('someone called MonadState2 (tasks) with g and state', g, state);
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
  var showCheck, showColor, showTextDecoration;
  var st = str.replace(/<<>>/g, ',');
  var newAr = str.split('<@>');
  console.log('str,st,newAr',str,st,newAr);
  this.s[0] = str;
  this.s[1] = newAr;
  this.s[2] = [];
  console.log('In run >>>>>>>>>>>>>>>>>>>> this.s is', this.s );
  // "two",false,"alfred","jane","none"
  var arr = this.s.slice();
  console.log('In MonadState2.run2. <o><o><o><o><o><o><o> arr is', arr );
  var nodeObject = [];
  var n = -1
  arr.map(a => {
    n+=1
    showCheck = a[1] ? "none" : "inline"
    showUnCheck = a[1] ? "inline" : "none"
    showColor = a[1] ? "green" : "yellow"
    showTextDecoration = a[1] ? "lineThrough" : "none"
    this.s[2].push(h('div#' + n +'.todo', [
      
      h('span.task3', { props: { color: showColor}, style: {textDecoration: showTextDecoration } }, 'Task: ' + a[0]),
      h('br'),
      h('span.tao4', { for: 'cbx', style: {display: showCheck}}, 'The task is not completed' ),
      h('span.tao4', { for: 'cbx', style: {display: showUnCheck}}, 'The task is completed' ),
      h('input#cbx', {attrs: {type: 'checkbox'}} ), 
      h('br'),
      h('span.tao', 'Author: ' + a[2] + ' / ' + 'Responsibility: ' + a[3]),
      h('br'),
      h('button#edit1', {props: {innerHTML: 'edit'}}),
      h('input#edit2', { props: { type:'textarea', value: a[0] }}),
      h('button#delete', 'delete'),
      h('br'),
      h('button#chbox1', {style: {display: showUnCheck}}, 'change to not completed'),
      h('button#chbox2', {style: {display: showCheck}}, 'change to completed'),
      h('hr')   
    ])) 
  });  
};



















