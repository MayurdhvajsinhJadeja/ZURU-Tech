// Node.js program to demonstrate the 
// fsPromises.appendFile() method 

// Import the filesystem module 
const fs = require('fs');
const fsPromises = require('fs/promises');

// Get the file contents before the append operation 
console.log("\nFile Contents of file before append:",
    fs.readFileSync("input.txt", "utf8"));

fsPromises.appendFile("input.txt", " world")
    .then(function () {
        console.log("\nFile Contents of file after append:",
            fs.readFileSync("input.txt", "utf8"))
    })
    .catch(function (err) { console.log(err); });

fsPromises.writeFile("inputnew.txt", " hello")
    .then(function () {
        console.log("\nFile Contents of file after append:",
            fs.readFileSync("inputnew.txt", "utf8"))
    })
    .catch(function (err) { console.log(err); }); 
