/**
 * Conditional
 *
 */

// if statements
function generation(year) {
  return year >= 2013 ? "alpha" : year >= 1997 ? "genz" : "oldies";
}

// console.log(generation(2005));

/**
 * Arrow Function
 */

const generationCopy = (year) => {
  return year >= 2013 ? "alpha" : year >= 1997 ? "genz" : "oldies";
};
// console.log(generationCopy(2020));

/**
 * Switch
 */
// function generationCopy(year) {
//   switch (year) {
//     case year >= 2013:
//       return "alpha";
//     case year >= 1997:
//       return "genZ";
//     default:
//       return "oldies";
//   }
// }
// console.log(generationCopy(2020));
/**
 * Loops
 */

let i = 0;
while (i < 3) {
  console.log(i);
  i++;
}

for (let i = 0; i < 3; i++) {
  console.log(i);
}
