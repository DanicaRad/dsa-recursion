/* dump(s) - returns split square as string 
dump([0, 0, 0, [1, 1, 1, 1]]) // 0 0 0 1 1 1 1
*/

function dump(s) {
  if (s === 0 || s === 1) {
    return s.toString();
  } else {
    // Array.map(fn) - return new array of [fn(item1), fn(item2), ...]
    return s.map(n => dump(n)).join(" ");
  }
}

function validate(s) {
  if( s === 0 || s === 1) return true;
  else if(s.length !== 4) return false;
  else return s.every(i => validate(i));               
};

function simplify(s) {
  if(validate(s)) {
    if(s === 1 || s === 0) return s;
    // map through each element until no more nested arrays
    s = s.map(i => simplify(i));
    // check innermost array for all 0 or 1, simplify, move to next element in array
    if(Number.isInteger(s[0]) && s.every(i => i === s[0])) {
      return s[0];
    }
    return s;
  }
}

function add(s1, s2) {
  if(Number.isInteger(s1)) {
    if(Number.isInteger(s2)) {
      if(s1 === 1 || s2 === 1) return 1;
      return 0;
    }
    else if(s1 === 1) {
      return s2.map(s => add(s, s1));
    } else {
      return s2;
    }
  }
  if(Number.isInteger(s2)) {
    if(s2 === 1) {
      return s1.map(s => add(s, s2));
    }
    return s1;
  }
  return s1.map((s, i) => add(s, s2[i]));
}

module.exports = {
  dump,
  validate,
  simplify,
  add
}