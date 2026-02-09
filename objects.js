/**
 * Objects
 */

let user = {
  // an object
  name: "John", // by key "name" store value "John"
  age: 30, // by key "age" store value 30
  block: "B",
  "UP Mail": "jpcruz@email.com",
  greeting: function () {
    console.log(`Hello, I'm ${this.name}`);
  },
};
// console.log(user.age);
// console.log(user["name"]);
// console.log(user["UP Mail"]);
// console.log(user["address"]);

// add property
user.address = "Liadlaw Hall";
// console.log(user);

// delete property
delete user.address;
// console.log(user);
// multiword property names

// computed properties
// let key = prompt("what would you like to know?");
// alert(user[key]);

// let key = "age";
// console.log(user.key);
// console.log(user[key]);

// property existence
// console.log("address" in user);
// console.log("age" in user);

// object method

// user.greeting();

// for..in
// for (key in user) {
//   console.log(user[key]);
// }

// Object.keys, Object.values, Object.entries
// console.log(Object.keys(user));
// console.log(Object.values(user));
// console.log(Object.entries(user));

/**
 * Objects are stored and copied by reference
 */

let admin = user;
// admin.name = "eric";

// console.log(user.name);
// console.log(admin.name);

// Destructuring
// let { name, age, ...rest } = user;
// console.log(name, age);

// console.log(rest);

// you can add default value for a property

/**
 * Arrays
 * special type of object
 * copied by reference
 */

let fruits1 = ["apple", "orange", "banana", "watermelon"];

// .length
// console.log(fruits1.length)

// index, at,
// console.log(fruits1.lastIndexOf("apple"));
// console.log(fruits1.at(1));
// console.log(fruits1[1]);

// push, shift, unshift, pop
// fruits1.pop();
// console.log(fruits1);

// for..of
// for (let i = 0; i < fruits1.length; i++) {
//   console.log(fruits1[i]);
// }

// comparison
let fruits1Copy = fruits1;
let fruits2 = ["apple", "orange"];
// console.log(fruits1 == fruits1Copy);
// console.log(fruits1 == fruits2);

// splice
// fruits1.splice(1, 2);
// console.log(fruits1);

// concat
// let fruits3 = fruits1.concat(fruits2);
// console.log(fruits1);
// console.log(fruits3);

// indexOf, lastIndexOf

// .filter
const removeAppleAndOrange = (fruit) => {
  return fruit != "apple" && fruit != "orange";
};
let filteredFruits1 = fruits1.filter(removeAppleAndOrange);
// console.log(fruits1);
// console.log(filteredFruits1);
// .map

const newFruits = fruits1.map((fruit, index) => {
  return index + fruit;
});

// console.log(newFruits);
// .sort

// destructuring
// let [a, c] = fruits1;
// console.log(a, c);

/**
 * JSON
 * .stringify
 * .parse
 */
const USER_KEY = "currentUser";
localStorage.setItem(USER_KEY, user);
// console.log(user);
// console.log(localStorage.getItem(USER_KEY));

// let userJson = JSON.stringify(user);
// console.log(userJson);
// console.log(typeof userJson);
// localStorage.setItem(USER_KEY, userJson);

// console.log(localStorage.getItem(USER_KEY));

// let userRaw = localStorage.getItem(USER_KEY);
// console.log(userRaw);

// let userParsed = JSON.parse(userRaw);
// console.log(userParsed.name);

/**
 * try catch
 */

function saveUser() {
  try {
    localStorage.setItem("user");
    console.log("saved");
  } catch (e) {
    console.log(e);
  }

  console.log("done");
}

saveUser();
