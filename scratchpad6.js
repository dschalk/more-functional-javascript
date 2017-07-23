

ted = (f,arr) => {
  var a = []
  arr.map(x => a.push(f(x)))
  return a
}
console.log(ted(x=>x*x*x,[1,2,3,4,5,6,7]))

