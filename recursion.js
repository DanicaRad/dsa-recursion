/** product: calculate the product of an array of numbers. */

function product(nums, i=0) {
  while(i < nums.length) {
    return nums[i] * product(nums, i + 1);
  }
  return 1;
}

/** longest: return the length of the longest word in an array of words. */

function longest(words) {
  let word = words[0]

  function _longest(words, i=0) {
    if(i === words.length) return;
    if(word.length < words[i].length) {
      word = words[i];
    }
    _longest(words, i + 1);
  }
  _longest(words, 0);
  return word.length;
}

/** everyOther: return a string with every other letter. */

function everyOther(str) {
  let everyOtherStr = "";

  function _everyOther(str, i=0) {
    if(i === str.length) return;
    if( i % 2 === 0) everyOtherStr += str[i];
    _everyOther(str, i +1);
  }
  _everyOther(str, 0);
  return everyOtherStr;
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str, reversedStr="", i=1) {
  if(i > str.length) return str === reversedStr;
  reversedStr += str[str.length - i];
  return isPalindrome(str, reversedStr, i + 1);
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, i=0) {
  if(i === arr.length) return -1;
  if(arr[i] === val) return i;
  return findIndex(arr, val, i + 1);
}

/** revString: return a copy of a string, but in reverse. */

function revString(str) {
  let reversedStr = "";
  function _revString(str, i=1) {
    if(i > str.length) return reversedStr;
    reversedStr += str[str.length - i];
    _revString(str, i + 1);
  };
  _revString(str, 1);
  return reversedStr;
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  let strings = [];
  function _gatherStrings(obj) {
    let values = Object.values(obj);
    for(let val of values) {
      if(typeof val === 'string') {
        strings.push(val);
      } else {
        _gatherStrings(val)
      }
    }
  }
  _gatherStrings(obj);
  return strings;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val, left=0, right=arr.length) {
  if(left > right) {
    return - 1;
  }
  let middle = Math.floor((right + left) / 2);
  if(arr[middle] === val) {
    return middle;
  }
  if(arr[middle] > val) {
    return(binarySearch(arr, val, left, middle - 1));
  }
  return binarySearch(arr, val, middle + 1, right);
}


module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
