//var
function example1() {
    if (true) {
        var x = 10;
    }
    console.log(x); // Output: 10
}
console.log(example1())

//let
function example2() {
    if (true) {
        let x = 10;
    }
    console.log(x); // Error: x is not defined
}
// console.log(example2())

//const
function example3() {
    const x = 10;
    x = 20; // Error: Assignment to a constant variable
}
// console.log(example3())

function example4() {
    const obj = {
        prop: 10
    };
    obj.prop = 20; // Valid: Object properties can be modified
    console.log(obj.prop); // Output: 20
}
console.log(example4())

const obj = {
  a: 1,
  b: 2,
};
let result = "";
for (const i in obj) {
  result += `${i}:${obj[i]} \n`;
}
console.log(result);
console.log(obj["a"]);

// Arrow Functions

function square(num) {
  const res = num * num;
  return res;
}

const square2 = (num) => {
  return num * num;
};

const square3 = (num) => num * num;

console.log(square(2));
console.log(square2(2));
console.log(square3(2));

const a2 = "hello";
const greeting2 = (stri) => {
  return stri;
};
console.log(greeting2(a2));

const Obj = {
  name: "mj",
  age: 20,
  function() {
    console.log(this);
  },
};
console.log(Obj);

const Obj2 = {
  a: 9,
  obj: { ...Obj },
};
console.log(Obj2);

function newFunction() {
  console.log(this);
}
newFunction();

function newFunction() {
  this.localObject = {
    message: "Hello, local object!"
  };
  console.log(this.localObject);
}

newFunction();

var mbj = 20;
function mj(m) {
  console.log(m + mbj);
}
mj(10);
console.log(mbj); // throws error 'mbj is not defined' if mbj is declared inside function

//shadowing
let a = 10
if (true) {
	let a = 20; 
	console.log(a); 
}     
console.log(a);

//setTimeout()
setTimeout(() => {
  console.log("This message will be printed after 6 seconds.");
}, 6000);

//setInterval()
let counter = 1;
const intervalId = setInterval(() => {
  console.log(`Counter: ${counter} \n`);
  if (counter === 5) {
    clearInterval(intervalId); // Stop the interval after 5 iterations
  }
  counter++;
}, 1000);

//setImmediate()
setImmediate(() => {
  console.log("This message will be printed immediately.");
});

//callback functionma
const readline = require('readline');

function greeting(name) {
  console.log(`Hello, ${name}`);
}

function processUserInput(callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Please enter your name: ', (name) => {
    callback(name);
    rl.close();
  });
}

processUserInput(greeting);

//promise
const promise = new Promise((resolve, reject) => {
  // Simulating an asynchronous operation
  setTimeout(() => {
    resolve("Operation completed successfully!");
  }, 7000);
});

console.log(promise); // Output: Promise {<pending>}
promise.then((result) => {
  console.log(result); // Output: Operation completed successfully!
  console.log(promise); // Output: Promise {"Operation completed successfully!"}
});

const errorPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("An error occurred!");
  }, 9000);
});

errorPromise.catch((error) => {
  console.log(error); // Output: An error occurred!
  console.log(errorPromise); // Output: Promise {<rejected>: "An error occurred!"}
});
