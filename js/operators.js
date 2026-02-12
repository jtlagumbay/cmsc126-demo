// /**
//  * Operators
//  * terms: operand, unary, binary, operator
//  */

let total = 10 - 5;
let debt = ++total;
// console.log(total, debt);
// console.log(5 % 2);
// console.log(8 % 3);
// console.log(8 % 4);

// console.log(2 ** 2); // 2² = 4
// console.log(2 ** 3); // 2³ = 8
// console.log(2 ** 4); // 2⁴ = 16

// console.log(4 ** (1 / 2)); // 2 (power of 1/2 is the same as a square root)
// console.log(8 ** (1 / 3)); // 2 (power of 1/3 is the same as a cubic root)

// console.log(6 - "2"); // 4, converts '2' to a number
// console.log("6" / "2"); // 3, converts both operands to number

// console.log(+true); // 1
// console.log(+false); // 1
// console.log(+""); // 0

// /**
//  * logical operators
//  *  */
// // &&, ||, !=, ==,
let number1 = 5,
  number2 = 10;
// console.log(number1 > 10 || number1 <= 20);

// /**
//  * coalescing operator
//  * ??
//  * for undefined or null values
//  */

let user;
// user = getUser();
let effectiveUser = user ?? "Anonymous";
// console.log(effectiveUser);

// // Precendence
let result = (typeof 3 + 2 ** 3 * 4 > 50 && !false) || "5" - 1 + 2 * 3;
console.log(result);
