/** Boggle word check.

None of these work, I give up for now.

Given a 5x5 boggle board, see if you can find a given word in it.

In Boggle, you can start with any letter, then move in any NEWS direction.
You can continue to change directions, but you cannot use the exact same
tile twice.

So, for example::

    N C A N E
    O U I O P
    Z Q Z O N
    F A D P L
    E D E A Z

In this grid, you could find `NOON* (start at the `N` in the top
row, head south, and turn east in the third row). You cannot find
the word `CANON` --- while you can find `CANO` by starting at the
top-left `C`, you can 't re-use the exact same `N` tile on the
front row, and there's no other `N` you can reach.

*/

function makeBoard(boardString) {
  /** Make a board from a string.

    For example::

        board = makeBoard(`N C A N E
                           O U I O P
                           Z Q Z O N
                           F A D P L
                           E D E A Z`);

        board.length   // 5
        board[0]       // ['N', 'C', 'A', 'N', 'E']
    */

  const letters = boardString.split(/\s+/);

  const board = [
    letters.slice(0, 5),
    letters.slice(5, 10),
    letters.slice(10, 15),
    letters.slice(15, 20),
    letters.slice(20, 25),
  ];

  return board;
}

function find(board, word) {
  /** Can word be found in board? */
  // TODO
  word = word.split("");

  function findCoordinates(y=0, x=0, coordinates=[]) {
    while(y < board.length) {
      while(x < board.length) {
        if(board[y][x] === word[0]) {
          coordinates.push([y, x]);
          return findCoordinates(y, x + 1, coordinates);
        };
        return findCoordinates(y, x + 1, coordinates);
      }
      return findCoordinates(y + 1, 0, coordinates)
    }
    return coordinates;
  }

  const coordinates = findCoordinates(0, 0);

  function _find(i) {
    if(i === coordinates.length) return false;
    let found = findNext(board, word, coordinates[i][0], coordinates[i][1], 1);
    if(!found) return _find(i + 1);
    return found;
  }
  return _find(0);
}



// // #1 works
// function _findNext(board, word, [...found], charIdx) {
//   console.log("word in _findNext", word);
//   let i = 0;
//   console.log("in _findNext *** found=", found);
//   console.log("char=", word[charIdx]);
//   while(i < found.length) {
//     let isFound = findNext(board, word, [...found], found[i][0], found[i][1], charIdx + 1);
//     if(!isFound) i++;
//     else {
//       return isFound;
//     }
//   }
//   return false;
// }

// // #1 works
// function findNext(board, word, found=[], y, x, i=1) {
//   console.log("word in findNExt", word);
//   if(i === word.length) return true; 
//   if(y > 0 && board[y - 1][x] === word[i]) {
//     found.push([y - 1, x]);
//     // return findNext(board, word, y - 1, x, i + 1);
//   }
//   if(y < board.length - 1 && board[y + 1][x] === word[i]) {
//     found.push([y + 1, x]);
//     // return findNext(board, word, y + 1, x, i + 1);
//   }
//   if(x > 0 && board[y][x - 1] === word[i]) {
//     found.push([y, x - 1]);
//     // return findNext(board, word, y, x - 1, i + 1);
//   }
//   if(x < board.length - 1 && board[y][x + 1] === word[i]) {
//     found.push([y, x + 1]);
//     // return findNext(board, word, y, x + 1, i + 1);
//   }
//   console.log("found", found);
//   if(found.length === 0) return false;
//   // for(let idx = 0; idx < found.length; idx ++) {
//   //   let isFound = findNext(board, word, found, found[idx][0], found[idx][1], i + 1);
//   //   if(!isFound) idx ++;
//   //   return isFound;
//   // }
//   return _findNext(board, word, found, i);
//   return false;
// }

// #2 no work
// function _findNext(board, word, y, x, charIdx) {
//   console.log("word in _findNext", word);
//   let found = findNext(board, word, y, x, charIdx);
//   if(!found) return false;
//   let i = 0;
//   console.log("char=", word[charIdx]);
//   while(i < found.length) {
//     let next = findNext(board, word, found[i][0], found[i][1], charIdx);
//     if(!next) i++;
//     else {
//       return isFound;
//     }
//   }
//   return false;
// }

// #2 no work
// function findNext(board, word, y, x, i=1) {
//   let found = [];
//   console.log("word in findNExt", word);
//   if(i === word.length) return true; 
//   if(y > 0 && board[y - 1][x] === word[i]) {
//     found.push([y - 1, x]);
//     // return findNext(board, word, y - 1, x, i + 1);
//   }
//   if(y < board.length - 1 && board[y + 1][x] === word[i]) {
//     found.push([y + 1, x]);
//     // return findNext(board, word, y + 1, x, i + 1);
//   }
//   if(x > 0 && board[y][x - 1] === word[i]) {
//     found.push([y, x - 1]);
//     // return findNext(board, word, y, x - 1, i + 1);
//   }
//   if(x < board.length - 1 && board[y][x + 1] === word[i]) {
//     found.push([y, x + 1]);
//     // return findNext(board, word, y, x + 1, i + 1);
//   }
//   // console.log("found", found);
//   if(found.length === 0) return false;
//   return found;
// }


// ORIGINAL WORKS BUT NO FOR NOOOOOS
// function findNext(board, word, y, x, i=1) {
//   if(i === word.length) return true; 
//   if(y > 0 && board[y - 1][x] === word[i]) {
//     return findNext(board, word, y - 1, x, i + 1);
//   }
//   if(y < board.length - 1 && board[y + 1][x] === word[i]) {
//     return findNext(board, word, y + 1, x, i + 1);
//   }
//   if(x > 0 && board[y][x - 1] === word[i]) {
//     return findNext(board, word, y, x - 1, i + 1);
//   }
//   if(x < board.length - 1 && board[y][x + 1] === word[i]) {
//     return findNext(board, word, y, x + 1, i + 1);
//   }
//   return false;
// }

function _find(board, word, x, y, i) {
  if(word[i] === board[y][x]) {
    return true;
  }
  return false;
}

// attempt #3
function findNext(board, word, seen, y, x, i=1) {
  if(i === word.length) return true; 
  const found = []
  if(y > 0 && board[y - 1][x] === word[i]) {
    found.push([y - 1, x]);
    return findNext(board, word, y - 1, x, i + 1);
  }
  if(y < board.length - 1 && board[y + 1][x] === word[i]) {
    found.push([y + 1, x]);
    return findNext(board, word, y + 1, x, i + 1);
  }
  if(x > 0 && board[y][x - 1] === word[i]) {
    found.push([y, x - 1]);
    return findNext(board, word, y, x - 1, i + 1);
  }
  if(x < board.length - 1 && board[y][x + 1] === word[i]) {
    found.push([y, x + 1]);
    return findNext(board, word, y, x + 1, i + 1);
  }
  if(found.length > 0) {
    seen.push(found);
    if(_find(board, word, seen, seen[i][0], seen[i][1], i + 1)) {
      return(findNext(board, word, seen, seen[i][0], seen[i][1], i + 1));
    }
    
    return true;
  }
  return false;
}

function _find(board, word, seen, )

// EXAMPLE TEST

// For example::

const board = makeBoard(`N C A N E
                         O U I O P
                         Z Q Z O N
                         F A D P L
                         E D E A Z`);

// `NOON` should be found (0, 3) -> (1, 3) -> (2, 3) -> (2, 4)::

console.log(find(board, "NOON"), true);

// `NOPE` should be found (0, 3) -> (1, 3) -> (1, 4) -> (0, 4)::

console.log(find(board, "NOPE"), true);

// `CANON` can't be found (`CANO` starts at (0, 1) but can't find
// the last `N` and can't re-use the N)::

console.log(find(board, "CANON"), false);

// You cannot travel diagonally in one move, which would be required
// to find `QUINE`::

console.log(find(board, "QUINE"), false);

// We can recover if we start going down a false path (start 3, 0)::

console.log(find(board, "FADED"), true);

// An extra tricky case --- it needs to find the `N` toward the top right,
// and then go down, left, up, up, right to find all four `O`s and the `S`::

const board2 = makeBoard(`E D O S Z
                          N S O N R
                          O U O O P
                          Z Q Z O R
                          F A D P L`);

console.log(find(board2, "NOOOOS"), true);

module.exports = {
  makeBoard,
  find,
  findNext
}