// Set four monads to 0.
retrn(m,0)(x=>x,"$m2")(x=>x,"$m3")
console.log(m.x, m2.x, m3.x)
// Set m.x === 2 and square it three times.
retrn(m,2)(square,"$m2")(square,"$m3")
console.log(m.x, m2.x, m3.x)
// Re-set the four monads to 0.
retrn(m,0)(x=>x,"$m2")(x=>x,"$m3")
console.log(m.x, m2.x, m3.x)
// Send m.x to be squared twice.
retrn(m,2)(v=>square(v),"$m2")(square,"$m3")
console.log(m.x, m2.x, m3.x)



