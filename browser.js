// /**
//  * Statements
//  * Statements are syntax constructs and commands that perform actions.
//  * 
//  * Statements can be separated with a semicolon.
//  * 
//  */

// console.log("I am a statement separated with a semicolon.");

// // semi-colon is not required when a line break exists.
// // new line implies a semi-colon
// console.log("hello from browser")
// console.log("start learning")

// // statements does not always have to be in a new line.
// console.log("what is ");
// console.log("your name");

// // There are cases when a newline does not mean a semicolon. For example:
// console.log(5 +
//     5 
//     + 
//     10
// )

// // Sample of error:
// alert("Hello");
// [1, 2].forEach(alert);
// semi-colon is needed here so machine reads it as separate statement.

/**
 * Comments
 * 
 * This is a multi-line comment
 */

// this is a single-line comment. the rest of this line is a comment.

// console.log('there can also be comments after a statement.') // after the two forward slashes, engine reads it as comment. so even if i put a console.log('does this work?') it will not work.

/**
 * 
 * Variables
 * 
 */

// variable declaration
let message;
// console.log(message);

// variable assignment
message = 'I am here.'
// console.log(message);

let name = 'John', age = 25, year = 4;
// console.log(name, age, year);


/**
 * old 'var'
 * 
 *  */ 

// var ignores code block
if (age >= 25) {
    var valid = true;
    let type;

    type = 'adult'
    // console.log(valid, type)
}

// console.log(valid) // ReferenceError: type is not defined

// If a code block is inside a function, then var becomes a function-level variable:
// var declarations are processed when the function starts

function sayHi() {
  if (true) {
      phrase = "Hello";
      
      var phrase;
  }

  console.log(phrase); // works
}

// sayHi();
// console.log(phrase); // ReferenceError: phrase is not defined


// var tolerates declaration
// let user;
// let user; // SyntaxError: 'user' has already been declared

var user = "Pete";

var user = "John"; // this "var" does nothing (already declared)
// ...it doesn't trigger an error

// console.log(user); // John

// constants - unchanging variable
const myBirthday = '18.04.1982';

// myBirthday = '01.01.2001'; // TypeError: Assignment to constant variable.

// UPPERCASE CONSTANTS: use constants as aliases for difficult-to-remember values that are known before execution
const COLOR_WHITE = '#FFFFFFF';

// LOWERCASE CONSTANTS: constants not known before execution;
// const pageLoadTime = computePageLoadTime();

// You can put any type in a variable:
let input = 'abc';
console.log(typeof (input))

input = 123;

console.log(typeof(input))