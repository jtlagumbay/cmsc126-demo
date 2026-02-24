class User {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log(`hello ${this.name}`);
  }

  computeGrade() {}
}

class Faculty extends User {
  constructor(name, role) {
    super(name); // call parent constructor
    this.department = role;
  }

  showDepartment() {
    console.log(`Department: ${this.department}`);
  }
}

// Usage:
let users = [new User("John"), new User("Jane")];
console.log(users);

let admin = new Faculty("Oscar", "DCS");
users[0].sayHi();
admin.sayHi();
admin.showDepartment();

/**
 * Abstraction
 */

class InputForm {
  constructor(id, placeholder = "Enter text", buttonText = "Submit") {
    // Create container with id
    this.container = document.createElement("div");
    if (id) this.container.id = id;

    // Create input
    this.input = document.createElement("input");
    this.input.type = "text";
    this.input.placeholder = placeholder;

    // Create button
    this.button = document.createElement("button");
    this.button.textContent = buttonText;
    // this.button.onclick = save;
    // Append input and button to container
    this.container.appendChild(this.input);
    this.container.appendChild(this.button);
  }

  // Append to a parent element
  appendTo(parent) {
    parent.appendChild(this.container);
  }

  save() {
    // save to localstorage
  }
}

// // --- Usage ---
const nameForm = new InputForm("NAME", "Name", "Save");
nameForm.appendTo(document.body);

const ageForm = new InputForm("AGE", "Age", "Save");
ageForm.appendTo(document.body);
