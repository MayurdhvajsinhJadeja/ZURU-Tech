//if-else
console.log("========if-else========");
i = 1;
if (i % 2 == 0) {
  console.log("Even");
} else {
  console.log("Odd");
}

//ternary
console.log("========ternary========");
function evenOdd(number) {
  return number % 2 == 0 ? "Even" : "Odd";
}
console.log(evenOdd(i));

//switch case
console.log("======switch=case======");
switch (i % 2) {
  case 0:
    console.log("Even");
    break;
  case 1:
    console.log("Odd");
    break;
}

//while loop
console.log("=========while=========");
while (i < 10) {
  console.log(i);
  i++;
}
console.log(".....");
let n = 1;
while (n < 5) {
  if (n % 2 == 0) {
    console.log("Even");
  } else {
    console.log("Odd");
  }
  n++;
}

//for loop
console.log("==========for==========");
let str = "";
for (let i = 0; i < 9; i++) {
  str = str + i;
}
console.log(str);

//continue in for loop
console.log("====continue=in=for====");
for (let i = 0; i < 10; i++) {
  if (i === 3) {
    continue;
  }
  console.log(i);
}

//break in for loop
console.log("=====break=in=for======");
for (let i = 0; i < 10; i++) {
  if (i === 3) {
    break;
  }
  console.log(i);
}

//do-while loop
console.log("=======do-while========");
let j = 0;
do {
  console.log(j);
  j++;
} while (j < 5);

//even number series
console.log("==even=number=series===");
for (let number = 0; number < 20; number++) {
  if (number % 2 == 0) {
    console.log(number);
  }
}

//odd number series
console.log("===odd=number=series===");
for (let number = 0; number < 20; number++) {
  if (number % 2 != 0) {
    console.log(number);
  }
}

//armstrong number
console.log("====armstrong=number====");
let num = 153;
let sum = 0;
let temp = num;
while (temp > 0) {
  let rem = temp % 10;
  sum = sum + rem * rem * rem;
  temp = parseInt(temp / 10);
}
if (num == sum) {
  console.log(num + " is an Armstrong Number");
} else {
  console.log(num + " is not an Armstrong Number");
}

//star pattern using for loop
console.log("====star=pattern====");
let rows = 5;
let starf = "";
for (let i = 1; i <= rows; i++) {
  for (let j = 1; j <= rows; j++) {
    starf += "*";
  }
  starf += "\n";
}
console.log(starf);

//star pattern using while loop
console.log("====star=pattern====");
let row = 5;
let starw = "";
let ni = 1;
while (ni <= row) {
  let nj = 1;
  while (nj <= row) {
    starw += "*";
    nj++;
  }
  starw += "\n";
  ni++;
}
console.log(starw);

//star pattern 'M' using for loop
console.log("===star=pattern=M===");

let rowM = 5;
let starM = "";

for (let i = 1; i <= rowM; i++) {
  for (let j = 1; j <= rowM; j++) {
    if (
      j == 1 ||
      j == rowM ||
      (i == j && i <= rowM / 2 + 1) ||
      (i == rowM - j + 1 && i <= rowM / 2)
    ) {
      starM += "*";
    } else {
      starM += " ";
    }
  }
  starM += "\n";
}
console.log(starM);

//array
console.log("=======array========");
const fruits = [];
console.log(fruits);
fruits.push("banana", "apple");
console.log("after pushing 2 items", fruits.length);
console.log(fruits);
fruits.pop();
console.log("after pop", fruits.length);
console.log(fruits);

console.log("...");
fruits[8] = "mango";
console.log(fruits[8]); // 'mango'
console.log(Object.keys(fruits)); // ['0','1','8']
console.log(fruits.length); // 9

console.log("...");
const elements = ["Fire", "Air", "Water"];
console.log(elements.join());
console.log(elements.join(""));
console.log(elements.join("-"));

console.log("...");
const array1 = [1, 2, 3, 4];
const map1 = array1.map((x) => x * x);
console.log("Array 1      -", array1);
console.log("Mapped Array -", map1);

//sorting array
console.log("...");
const stringArray = ["Blue", "Humpback", "Beluga"];
const numberArray = [40, 1, 5, 200];
const numericStringArray = ["80", "9", "700"];
const mixedNumericArray = ["80", "9", "700", 40, 1, 5, 200];

function compareNumbers(a, b) {
  return a - b;
}

stringArray.sort(); // ['Beluga', 'Blue', 'Humpback']

console.log(numberArray.sort()); // [1, 200, 40, 5]
console.log(numberArray.sort(compareNumbers)); // [1, 5, 40, 200]

console.log(numericStringArray.sort()); // ['700', '80', '9']
console.log(numericStringArray.sort(compareNumbers)); // ['9', '80', '700']

console.log(mixedNumericArray.sort()); // [1, 200, 40, 5, '700', '80', '9']
console.log(mixedNumericArray.sort(compareNumbers)); // [1, 5, '9', 40, '80', 200, '700']

console.log("=oops=in=javascript=");
// Using a constructor
function person(first_name, last_name) {
  this.first_name = first_name;
  this.last_name = last_name;
}
// Creating new instances of person object
let person1 = new person("Mukul", "Latiyan");
let person2 = new person("Rahul", "Avasthi");

console.log(person1.first_name, person1.last_name);
console.log(`${person2.first_name} ${person2.last_name}`);

console.log("...");
// Object.create() example a
// simple object with some properties
const coder = {
  isStudying: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I coding?: ${this.iscoding}.`);
  },
};
// Object.create() method
const me = Object.create(coder);
// "name" is a property set on "me", but not on "coder"
me.name = "Mayurdhvaj";
// Inherited properties can be overwritten
me.iscoding = "Yes";
me.printIntroduction();

console.log("...");
// Defining class using es6
class Vehicle {
  constructor(name, maker, engine) {
    this.name = name;
    this.maker = maker;
    this.engine = engine;
  }
  getDetails() {
    return `The name of the bike is ${this.name}. It has a ${this.engine}. The maker is ${this.maker}`;
  }
}

// Making object with the help of the constructor
let bike1 = new Vehicle("Hayabusa", "Suzuki", "1340cc");
let bike2 = new Vehicle("Ninja", "Kawasaki", "998cc");

console.log("Bike 1:", bike1.getDetails());
console.log("Bike 2:", bike2.getDetails());

console.log("Abstraction...");
class ImplementAbstraction {
  // method to set values of internal members
  set(x, y) {
    this.a = x;
    this.b = y;
  }

  display() {
    console.log(`a = ${this.a}`);
    console.log(`b = ${this.b}`);
  }
}

const obj = new ImplementAbstraction();
obj.set(10, 20);
obj.display();

console.log("Encapsulation...");
class Encapsulate {
  constructor() {
    this.name = "Mayurdhvaj";
    this.age = 19;
  }
  // getter method
  get getAge() {
    return this.age;
  }
  // setter method
  set setAge(age) {
    this.age = age;
  }
}
const obj1 = new Encapsulate();
console.log("was:", obj1.getAge);
obj1.setAge = 20;
console.log("is:", obj1.getAge);

console.log("Inheritance...");
class Parent {
  constructor() {
    this.name = "Mayurdhvaj";
    this.age = "20";
  }
}
// inheritance from Parent
class Child extends Parent {
  constructor() {
    super();
  }
}
const obj2 = new Child();
console.log(obj2.name);
console.log(obj2.age);

console.log("Functions in JS....");
function outerFunction() {
  var outerVariable = "I am from the outer scope";

  function innerFunction() {
    console.log(outerVariable); // Accessing the outerVariable from the outer scope
  }

  return innerFunction;
}

var closure = outerFunction(); // Assigning the inner function to a variable
closure(); // Calling the inner function

console.log("........");
console.log(42 / +0); // Infinity
console.log(42 / -0); // -Infinity
console.log(1 / Infinity); // 0

console.log("======datatype======");
console.log("Boolean...");
const x = false;
if (x) {
  console.log("Its True");
} else {
  console.log("Its False");
}

const good = Boolean(1 > 2); // use this
const good2 = !!"five"; // or this
const bad = new Boolean(5); // don't use this!
console.log(good);
console.log(good2);
console.log(bad);

console.log("....");
const x1 = new Boolean(false);
if (x1) {
  console.log(x1);
}

const y1 = new Boolean(true);
if (y1) {
  console.log(y1);
}

console.log("Number...");
m = "Mayurdhvaj";
if (isNaN(m) == true) {
  console.log("is NaN");
} else {
  console.log("Is not NaN");
}

console.log(Number("123.45"))
console.log(parseInt("123.45"))

console.log("String....")
const st = "Hello World";
console.log(st.toLocaleLowerCase());

const st2 = "İstanbul";
console.log(st2.toLowerCase());

console.log("Array....")
const arr = [1, 2, 3, 4, 5];
arr.push(6);

arr2 = new Array()
console.log(arr2.indexOf(0))
console.log(arr2)
console.log("....")
console.log(undefined == null); // will print "true"
console.log(undefined === null); // will print "false"

console.log("....")
const arr4 = new Array(4);
arr4[0] = 1;
arr4[1] = 2;
arr4[2] = 3;
arr4[3] = 4;



console.log(arr4.length);
console.log(arr4)
arr4.push(5)
console.log(arr4.length)

//If you declare an array using const in JavaScript, 
//the size of the array itself cannot be changed. However, you can still modify the elements within the array.

console.log("Objects....")
const Obj11 = {
  name1: "Mayurdhvaj",
}

const obj21 = {...Obj11};

const {name} = obj21
obj21.name = "Mayur";
console.log(name);

console.log("....")
function sumof(a,b,...theArgs) {
  let total = 0;
  for (const arg of theArgs) {
    total += arg;
  }
  return total+a+b;
}

console.log(sumof(1, 2, 3));
// Expected output: 6

console.log(sumof(1, 2, 3, 4));
// Expected output: 10