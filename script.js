/** 101. Symmetric Tree */
var isSymmetric = function(root) {
    const isMirror = (n1, n2) => {
        if (!n1 && !n2) return true;

        if (!n1 || !n2) return false;

        return n1.val === n2.val && isMirror(n1.left, n2.right) && isMirror(n1.right, n2.left);
    };

    return isMirror(root.left, root.right);
};


/** 100 - Same Tree  Ninary tree node*/
var isSameTree = function (p, q) {
    if (!p && !q) return true;

    if ( p && q && p.val === q.val) {
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }

    return false;
}

/** 234. Palindrome Linked List */
var isPalindrome = function(head) {
    let arr = [];

    while (head !== null) {
        arr.push(head.val);
        head = head.next;
    }

    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        if (arr[left] !== arr[right]) {
            return false;
        }
        left++;
        right--;
    }

    return true;    
};

/** 206. Reverse Linked List 
 * 1 -> 3 -> 4   --->    4 -> 3 -> 1
*/
var revertList = function(head) {
    let node = null;

    while (head) {
        const temp = head.next; //3
        head.next = node;  // null <- 1
        node = head;
        head = temp;
    }
    return node;
}

var reverseListRecursive = function(head) {
    if (!head || !head.next) {
        return head;
    }

    var newHead = reverseListRecursive(head.next);
    head.next.next = head;
    head.next = null;
    return newHead;    
};

/**203. Remove Linked List Elements */
var removeElements = function(head, val) {
    let ans = new ListNode(0, head);
    let dummy = ans;

    while (dummy) {
        while (dummy.next && dummy.next.val === val) {
            dummy.next = dummy.next.next;
        }
        dummy = dummy.next;
    }

    return ans.next;    
};


/** 160. Intersection of Two Linked Lists */
var getIntersectionNode = function(headA, headB) {
    let pointerA  = headA;
    let pointerB  = headB;
    
     // continue until both pointers are on the same node
    while (pointerA  !== pointerB) {
         // move to next node, or switch to headB if end reached
        pointerA  = pointerA  ? pointerA.next : headB;
         // move to next node, or switch to headA if end reached
        pointerB = pointerB ? pointerB.next : headA;
    }
    
      // either intersection node or null
    return pointerA;    
};

/** 141 Linked List Cycle  - Floyd’s cycle
 * slow pinter move 1 position, fast pointer move 2 position,
 * and if it's cycle they always goint to meet ( true cycle)
 */
var hasCycle = function(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) { //if any fast or fast.mext means list has NULL and finish, not cycle
        fast = fast.next.next;
        slow = slow.next;

        if (fast === slow){
            return true;
        }
    }
    return false;
}

/** 83. Remove Duplicates from Sorted List */
var deleteDuplicates = function(head) {
    let current = head;

    while (current && current.next) {
        if (current.val === current.next.val) {
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }

    return head;
};

/** 21. Merge Two Sorted Lists */
/**
 * 
 list1 --> [1] -> [2] -> [4] -> null

 list1 = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 4,
      next: null
    }
  }
}
 */
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

var mergeTwoLists = function(list1, list2) {
  let dummy = new ListNode(0);
  let current = dummy;

  while(list1 && list2){
    if (list1.val <= list2.val){
        current.next = list1;
        list1= list1.next;
    } else {
        current.next = list2;
        list2 = list2.next;
    }
    current = current.next;
  } 
    if (list1 !== null) {
        current.next = list1;
    } else {
        current.next = list2;
    }

    return dummy.next;
}


let list1 = new ListNode(1, new ListNode(2, new ListNode(4)));
let list2 = new ListNode(1, new ListNode(3, new ListNode(4)));

mergeTwoLists(list1, list2);

/** 232. Implement Queue using Stacks */
class MyQueue4 {
    constructor() {
        this.inStack = [];
        this.outStack = [];
    }

    push(x) {
        this.inStack.push(x);
    }

    pop() {
        if (this.outStack.length === 0) {
            while (this.inStack.length > 0) {
                this.outStack.push(this.inStack.pop());
            }
        }
        return this.outStack.pop();
    }

    peek() {
        if (this.outStack.length === 0) {
            while (this.inStack.length > 0) {
                this.outStack.push(this.inStack.pop());
            }
        }
        return this.outStack[this.outStack.length - 1];
    }

    empty() {
        return this.inStack.length === 0 && this.outStack.length === 0;
    }
}

var MyQueue3 = function() {
    this.input = [];
    this.output = [];
};

MyQueue3.prototype.push = function(x) {
    this.input.push(x);    
};

MyQueue3.prototype.pop = function() {
    this.peek();
    return this.output.pop();    
};

MyQueue3.prototype.peek = function() {
    if (!this.output.length) {
        while (this.input.length) {
            this.output.push(this.input.pop());
        }
    }

    return this.output[this.output.length - 1];    
};

MyQueue3.prototype.empty = function() {
    return !this.input.length && !this.output.length;    
};

/** 225. Implement Stack using Queues */
/**
 * Stack (LIFO)
push(x) → put element on top
pop() → remove the top element
top() → see the top element
empty() → check if stack is empty
 * 
 * Queues (FIFO)
push(x) → add to the back
pop() → remove from the front
peek() → see the front
empty() → check if empty
 */
class MyStack {
    constructor() {
        this.q = [];
    }

    push(x){
        this.q.push(x);
        for (let i=0; i < this.q.length -1; i++){
            this.q.push(this.q.shift())
        }
    }

    pop() {
        return this.q.shift()
    }

    top(){
        return this.q[0];
    }

    empty(){
        return this.q.length === 0;
    }
}

class MyStack2 {
    constructor() {
        this.q = [];
    }

    push(x) {
        this.q.push(x);
        for (let i = 0; i < this.q.length - 1; i++) {
            this.q.push(this.q.shift());
        }
    }

    pop() {
        return this.q.shift();
    }

    top() {
        return this.q[0];
    }

    empty() {
        return this.q.length === 0;
    }
}

/** 20. Valid Parentheses */
var isValid = function(s) {
    const stack = [];
    const map = { 
        ')':'(',  // key : value
        '}':'{',
        ']':'['
    };

    for (let ch of s){
        if ( ch === '(' || ch === '{' || ch === '[') {
            stack.push(ch);
        } else {
            if (stack.pop() !== map[ch]) {
                return false;
            }
        }
    }

    return stack.length === 0;

};


/** 704. Binary Search */
var search = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) return mid;

        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1; //not found
};

/** 35. Search Insert Position*/
 nums = [1,3,5,6]; target = 7 ;//Output: 2

var searchInsert = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (nums[mid] === target) return mid;

        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return left;
} 

var searchInsert2 = function(nums, target) {
    
    for (let i = 0; i < nums.length; i++){ 
            if ( nums[i] >= target ) 
                return i;    
         }
         return nums.length;
};

console.log(searchInsert(nums, target));

/** 415. Add Strings */
 num1 = "11", num2 = "123"  //Output: "134"
var addStrings = function(num1, num2) {
    let i = num1.length -1;
    let j = num2.length -1;
    let carry = 0;
    let res = '';
   // res= (Number(num1)+ Number(num2)).toString();
   while (i >= 0 || j >= 0 || carry) {
        let digit1 = i >= 0 ? num1[i] - '0' : 0;
        let digit2 = j >= 0 ? num2[j] - '0' : 0;

        let sum = digit1 + digit2 + carry;

        result.push(sum % 10);     // current digit
        carry = Math.floor(sum / 10);

        i--;
        j--;
    }

    return result.reverse().join('');
};

//console.log(addStrings(num1, num2));

/**  412. Fizz Buzz*/

var fizzBuzz = function(n) {
    const res = [];

    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) {
            res.push("FizzBuzz");
        } else if (i % 3 === 0) {
            res.push("Fizz");
        } else if (i % 5 === 0) {
            res.push("Buzz");
        } else {
            res.push(i.toString());
        }
    }

    return res;    
};

/** 387. First Unique Character in a String */

var firstUniqChar = function(s) {
    const freq = {};

    for (const ch of s){
        freq[ch] = (freq[ch] || 0)+1;
    }
    for (let i= 0; i < s.length; i++){
        if (freq[s[i]] === 1) {
            return i;
        }  
    }
    return -1;
};

/** 383. Ransom Note */
const ransomNote = "aa";
 const magazine = "ab";
var canConstruct1 = function(ransomNote, magazine) {
    for (let i = 0; i < ransomNote.length; i++){
          if (magazine.includes(ransomNote[i])) {
            magazine =   magazine.replace(ransomNote[i], '') ;
          } else {return false}
    }
    return true;
    
};
//console.log(canConstruct(ransomNote,magazine));

var canConstruct = function(ransomNote, magazine) {
   const count = {};

   for( const ch of magazine) {
       count[ch] = ( count[ch] || 0) +1;
   }
   for(const ch of ransomNote) {
    if (!count[ch]) return false;
    count[ch]--;
   }
   return true;
}

/** 28. Find the Index of the First Occurrence in a String */
/** Input: haystack = "sadbutsad", needle = "sad"
Output: 0
Explanation: "sad" occurs at index 0 and 6. 

for (let i = 0; i <= text.length - pattern.length; i++)
*/
 haystack = "sddbutsad", needle = "sad"
var strStr = function(haystack, needle) {
   //return haystack.indexOf(needle);
   for (let i = 0;  i <= haystack.length - needle.length; i++) {
      
    if ( haystack.slice(i, i + needle.length) === needle) {
        return i;
       }
   }
   return -1;
};

//console.log(strStr(haystack,needle));

/** ARRAY */
var arr = [1,2,3];
arr2 = new Array(3).fill(0); //[0,0,0]

arr.push(4); //[1,2,3,4] → add to END
arr.unshift(0) //[0,1,2,3,4] → add to START

arr.pop();          // remove LAST
arr.shift();        // remove FIRST

const res = arr.slice(1,3 );      //  (start, end);
                                   // start = where to BEGIN (included ) 
                                   // end = where to STOP (NOT included )

arr.includes(2)  ;
arr.indexOf(2)     ;
arr.find(x => x > 2)   ;
arr.findIndex(x => x > 2);

for (let i = 0; i < arr.length; i++) {}

for (const val of arr) {}     // values
for (const i in arr) {}       // indexes
arr.forEach(v => {});

arr.map(x => x*2);
arr.filter(x => x > 2);
//arr.reducer((acc,x) => acc + x, 0);

arr.sort((a,b) => a - b); // ascending

arr.reverse();
const unique = [...new Set(arr)]; //Remove duplicates


/** STRING */
const str = 'hello';
str.length;
str[0]; // h

str.toUpperCase();
str.toLowerCase();
str.trim();

str.slice(1,4); // ell
str.replace("h", "y"); 
str.replaceAll("l", "x");

//const arr = str.split(""); // ['h','e','l','l','o']
arr.join("");              // back to string

str.includes("el"); // true
str.replace(/[^a-z0-9]/g, '');

/** OBJECT */
const obj = { name: "Maryna", city:'Prague'};

Object.hasOwn(obj, "name"); 
for (const key in obj) {}

Object.keys(obj)
Object.values(obj)
Object.entries(obj)

/** SET */
const set = new Set([1,2,3]);

set.add(4);
set.delete(2);
set.has(3);

[...set];

/** MAP */
const map = new Map();  // key, value

map.set("a", 1);
map.get("a");
map.has("a");
map.delete("a");

for ( const [key, value] of map) {}

//map[x] = (map[x] || 0) + 1;


/** 14. Longest Common Prefix*/

var longestCommonPrefix = function(strs) {
     if (strs.length === 0) return '';

     let prefix = strs[0];
     
     for (let i = 1; i< strs.length; i++ ) {
        while( !strs[i].startsWith(prefix)){
            prefix = prefix.slice(0,-1);

            if (prefix === '') return '';
        }
     }

    return prefix;
};
strs = ["flower","flow","flight"];
console.log(longestCommonPrefix(strs));

/** 125. Valid Palindrome */
/** Input: s = "A man, a plan, a canal: Panama"
   Output: true
   Explanation: "amanaplanacanalpanama" is a palindrome. */

/**  219. Contains Duplicate II */
/** Input: nums = [1,2,3,1], k = 3
    Output: true */

    var isPalindrome = function(s) {
        s = s.toLowerCase().replace(/[^a-z0-9]/g,'');

        let left = 0;
        let right = s.length -1;

        while (left < right){
            if (s[left] !== s[right]) {return false}
            left ++;
            right --;

        }
        return true;

};
s = "A man, a plan, a canal: Panama";
console.log(isPalindrome(s));

    var containsNealyDuplicates = function(nums, k){
        const window = new Set();

        for (let i = 0; i < nums.length; i++){

             if (window.has(nums[i]))  return true;

            window.add(nums[i]);

            if (window.size > k) {
                window.delete(nums[i-k]);
            } 
        }
        return false;
    }

    
    var containsNealyDuplicates2 = function(nums, k){
        const map = new Map();

        for (let i = 0; i < nums.length; i++){
            if (map.has(nums[i]) && (i - map.get(nums[i]) <= k))   {
                return true;
            }
          map.set(nums[i], i);
        }
        return false;
    }


/** 345. Reverse Vowels of a String */
var reverseVowels = function(s) {
    const vowels = new Set(['a','e','i','o','u','A','E','I','O','U']);
    const arr = s.split('');
    let left = 0;
    let right = arr.length -1;

    while (left < right){
        while (left < right && !vowels.has(arr[left])) left ++;
        while (left < right && !vowels.has(arr[right])) right --;

        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    return arr.join('');
};

s = "leetcode";
console.log(reverseVowels(s));


/**  what s = 'hello' as string ->  "hello".split('').reverse().join('')
 *    let arr = s.split('');
 *    ..... the same
 *    return arr.join('')
 * 
*/



/** 344 Reverse String */
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    let left = 0;
    let right = s.length -1;

while (left < right){
     [s[left], s[right]]= [s[right],s[left]];
     left++;
     right--
}
return s;
};
s = ["h","e","l","l","o"];
//console.log(reverseString(s));


/** Two Sum order arr */
var twoSumOrdered = function(numbers, target){
    let left = 0;
    let right = numbers.length - 1;
    
    while (left < right) {
        let total = numbers[left] + numbers[right];

        if ( total === target){
            return [left + 1, right +1];
        }
        else if (total > target) {
             //sum to big -> move to left
             right--
        } else { 
            //sum to small -> move to right
            left ++
        }  
    }

}

numbers = [2, 3, 4, 8, 11]
target = 12
//console.log(twoSumOrdered(numbers, target))

var removeElement = function(nums, val) {
    let k = 0;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== val) {
            nums[k] = nums[i];
            k++;
        }
    }

    return k;    
};

/* 26. Remove Duplicates from Sorted Array   ---> in-place */
/** Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5, nums = [0,1,2,3,4,_,_,_,_,_] */

var removeDuplicates = function(nums) {
    if (nums.length === 0) return 0;

    let i = 1; // first avaible position for unique number

    for (let j = 1; j < nums.length; j++){
        if(nums[j] !== nums[i-1]){
            nums[i]=nums[j];
            i++;
        }
    }
    return i;
};


/**  Memoizzation */

const memo = {} ; //HashMap

function climpStairs(n){
    if (n in memo) return memo[n];

    if (n <=2) return n;

    const result = climpStairs(n-1) + climpStairs(n-2);
    memo[n] = result;

    return result;
}

/** Tabulation  */
function climpStairs(n){
   const ways = [];  // [0,0,0,0,0]
   ways[1] = 1;
   ways[2] = 2;

   for( let i = 3; i <= n; i++){
    ways[i] = ways[i-1] + ways[i-2]; 
   }
    return ways[n]
}



/** 121. Best Time to Buy and Sell Stock */
/** Input: prices = [7,1,5,3,6,4]   Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.

Input: prices = [7,6,4,3,1]   Output: 0
Explanation: In this case, no transactions are done and the max profit = 0. */

prices = [7,1,5,3,6,4] 
var maxProfit = function(prices) {
   let maxProfit = 0;
   let minPrice  = prices[0];

    for (const price of prices){
        minPrice  = Math.min(price, bestToBuy);
        const profit = price - minPrice;
        maxProfit = Math.max(profit, maxProfit)
       
    }

    return maxProfit;  
};
//console.log(maxProfit(prices));

/** 119. Pascal's Triangle II  
 * Input: rowIndex = 3
 Output: [1,3,3,1]
*/


var getRow = function(rowIndex) {
    const result = [];

for (let row = 0; row <= rowIndex; row ++) {
   const currentRow = new Array(row +1).fill(1);

    for (let i = 1; i<row; i++){
     currentRow[i]= result[row-1][i-1] + result[row-1][i]

    }

    result.push(currentRow);
}

    return result[rowIndex];
   
};
//console.log(getRow(4));

var getRow2 = function(rowIndex) {
    let row = [1];

    for (let i = 1; i <= rowIndex; i++) {
        row.push(1);

        for (let j = i - 1; j > 0; j--) {
            row[j] = row[j] + row[j - 1];
        }
    }

    return row;
};
//console.log(getRows2(4));
/** 118. Pascal's Triangle
 Input: numRows = 5
Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
*/
 /**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
    const result = [];

    for (let row = 0; row < numRows; row ++){
        currentRow = new Array(row+1).fill(1);

        for (let col = 1; col < row; col++){
            currentRow[col]= result[row-1][col-1] + result[row-1][col]
        }
        /**for (let i = 1; i < row; i++) {
            currentRow[i] = result[row-1][i-1] + result[row-1][i];
        } */

        result.push(currentRow);
    }

    return result;
};
 
//console.log(generate(5));
 /** 53 Maximum Subarray
  * Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
At every position in the array we ask one question:
Is it better to:  1)  start a new subarray here  or 2)  extend the previous subarray
  *   */
 /**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    res = nums[0];
    total = 0;

    for ( const n of nums){
        if (total < 0) total = 0;

        total += n;
        res = Math.max(res,total)
    }
    return res;

};

function maxSubArray2(nums) {
  let current = nums[0];
  let best = nums[0];

  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }

  return best;
}


//console.log(maxSubArray2( [-2,1,-3,4,-1,2,1,-5,4]))

 
 
 /* 283. Move Zeroes */
/** Input: nums = [0,1,0,3,12] //
 
 // right scans the array from left to right 
 // left marks the position where the next non-zero should be placed
Output: [1,3,12,0,0] */
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

//const nums = [0, 1, 0, 3, 12];
//const nums = [2,5,9,0,0,6];

var moveZeroes = function (nums) {
  let left = 0;

  for (let right = 0; right < nums.length; right++) {
    if (nums[right] !== 0) {
      [nums[right], nums[left]] = [nums[left], nums[right]];
      left++;
    }
  }

  return nums;
};

//console.log(moveZeroes(nums));

/** 350 Intersection of Two Arrays II */
//nums1 = [1,2,2,1], nums2 = [2,2] // res  [2,2]
nums1 = [4,9,5], nums2 = [9,4,9,8,4]  // res [9,4]

var intersect = function(nums1, nums2) {
    seen = new Map();
    res = [];
  //Map is built on smaller array --> ptimize memory 
    for(const n of nums1){
        seen.set(n, (seen.get(n) || 0 ) + 1)
    }
   // console.log("first rount:", seen);

    for (const x of nums2){
        if ( seen.has(x) && seen.get(x) > 0){
            res.push(x);
            seen.set(x, (seen.get(x) -1))
        }     
    }
    return res
};

//console.log(intersect(nums1, nums2));
/** 349. Intersection of Two Arrays */
 /**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
nums1 = [1,2,2,1], nums2 = [2,2]  //res [2]
//nums1 = [4,9,5], nums2 = [9,4,9,8,4]  // res [9,4]
var intersection = function(nums1, nums2) {
   
    res = [];
   /* seen = new Map();

    for(const n of nums1){
        if(!seen.has(n))
        seen.set(n)
    }
        */
    seen = new Set(nums1);

    for(const x of nums2){
        if ( seen.has(x)){
            res.push(x);
           seen.delete(x);
        }
    }
   return res;
};
 
//console.log(intersection(nums1, nums2));
 
 
 /** 242 Valid Anagram
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
s = "anagram", t = "nagaram"
var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;

   const seen = new Map();
   // s
    for (const ch of s){
        seen.set(ch, (seen.get(ch) || 0) + 1);
    }
    //t
    for (const ch of t){
        if(!seen.has(ch))return false;

        seen.set(ch, seen.get(ch)-1)
        if (seen.get(ch) < 0) return false;
    }
 return true;
};

//console.log(isAnagram(s,t));
 
 
 
 /**
 * @param {number[]} nums
 * @return {boolean}
 */
/* 
Input: nums = [1,2,3,1]
Output: true
*/

var containsDuplicate = function(nums) {
    seen = new Map();

    for(let i = 0; i < nums.length; i++){

        if(seen.has(nums[i]))
            return true;
        else 
        seen.set(nums[i]);     
    }
    return false;
};
 numsA = [1,2,3,1];
//console.log(containsDuplicate(numsA));
 numsB = new Set(numsA); 

var containsDuplicate = function(nums) {
    return new Set(nums).size !== nums.length;
};

//console.log(containsDuplicate([1,2,3,2])); 
 
 
 
 /** Two Sums  - HashMap */
 /**
**Input:** nums = [2,7,11,15], target = 9
**Output:** [0,1]
**Explanation:** Because nums[0] + nums[1] == 9, we return [0, 1].
  */
 /**
  * * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
//nums = [ 2,7,11,15], target = 9

var twoSum = function(nums, target) {
    const seen = new Map(); // key-value pairs  (2 -> 0 ; 7-> 1; 11 -> 2; 15->3)

    for (let i = 0; i < nums.length ; i++){
        const need = target - nums[i];

        if (seen.has(need))     
            return [i, seen.get(need)]

        seen.set(nums[i], i) 
    }
    
};

//console.log(twoSum(nums, target));



