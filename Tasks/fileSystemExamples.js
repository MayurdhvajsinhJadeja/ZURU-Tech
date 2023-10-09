var fs = require('fs');
var fsp = require('fs/promises');
const path = require('path');

//file
async function writeFileUsingPromise() {
    var data = "Hello, this is a test file!";
    await new Promise((resolve, reject) => {
        fs.writeFile('write.txt', data, 'utf8', function (err) {
            if (err) reject(err);
            console.log("write.txt file created successfully!");
            resolve();
        });
    });
}

// Get the file contents before the append operation   
console.log("\nFile Contents of file before append:",
    fs.readFileSync("file1.txt", "utf8"));

fsp.appendFile("file1.txt", "\nhello")
    .then(function () {
        console.log("\nFile Contents of file after append:",
            fs.readFileSync("example_file.txt", "utf8"))
    })
    .catch(function (err) { console.log(err); });

async function writeMultipleFilesUsingPromise() {
    const files = ['file1.txt', 'file2.txt', 'file3.txt'];
    const promises = files.map(file => {
        const data = `Hello, this is ${file}!`;
        return new Promise((resolve, reject) => {
            fs.writeFile(file, data, 'utf8', function (err) {
                if (err) reject(err);
                console.log(`${file} created successfully!`);
                resolve();
            });
        });
    });
    await Promise.all(promises);
    console.log('All files created successfully!');
}
// Append data to file
var data = "\nLearn Node.js";
async function appendFileUsingPromise() {
    await new Promise((resolve, reject) => {
        fs.appendFile('write.txt', data, 'utf8', function (err) {
            if (err) reject(err);
            console.log("Data is appended to file successfully.");
            resolve();
        });
    });
}

async function deleteFile() {
    await new Promise((resolve, reject) => {
        fs.unlink('input.txt', function (err) {
            if (err) reject(err);
            console.log("file deleted successfully.");
            resolve();
            console.log("write.txt file content: " + data.toString());
        });
    });
}

fs.readFile('write.txt', function (err, data) {
    if (err) {
        return console.error(err);
    }
    console.log("write.txt file content: " + data.toString());
});


// Using fs.exists() method 
fs.existsSync('input.txt', (exists) => {
    if (exists) deleteFile();
});

writeMultipleFilesUsingPromise();
writeFileUsingPromise();
appendFileUsingPromise();

// Rename the file 
// fs.renameSync('helloworld.txt', 'input.txt');


//dir
fs.mkdir(path.join(__dirname, 'test'),
    { recursive: true }, (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('Directory created successfully!');
    });

// Getting information for a file 
fs.stat("write.txt", (error, stats) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Stats object for: write.txt");
        console.log(stats);

        // Using methods of the Stats object 
        console.log("Path is file:", stats.isFile());
        console.log("Path is directory:", stats.isDirectory());
    }
});

// Getting information for a directory 
fs.stat("test", (error, stats) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Stats object for: test.txt");
        console.log(stats);

        // Using methods of the Stats object 
        console.log("Path is file:", stats.isFile());
        console.log("Path is directory:", stats.isDirectory());
    }
});

if (fs.existsSync("test")) {
    fsp.writeFile("test/write2.txt", "world")
        .then(function () {
            console.log("\nFile Contents:",
                fs.readFileSync("test/write2.txt", "utf8"))
        })
        .catch(function (err) { console.log(err); });
}