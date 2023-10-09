const fs = require('fs/promises');
const path = require('path');
const os = require('os');

async function getFilesAndFolders(directoryPath) {
    const result = {};
    const contents = await fs.readdir(directoryPath);

    for (const item of contents) {
        const itemPath = path.join(directoryPath, item);
        const stats = await fs.stat(itemPath);
        if (stats.isFile()) {
            result[item] = 'file';
        } else if (stats.isDirectory()) {
            result[item] = await getFilesAndFolders(itemPath);
        }
    }

    return result;
}

var spawn = require("child_process").spawn

function listDrives() {
    const list = spawn('cmd');

    return new Promise((resolve, reject) => {
        list.stdout.on('data', function (data) {
            // console.log('stdout: ' + String(data));
            const output = String(data)
            const out = output.split("\r\n").map(e => e.trim()).filter(e => e != "")
            if (out[0] === "Name") {
                resolve(out.slice(1))
            }
            // console.log("stdoutput:", out)
        });

        list.stderr.on('data', function (data) {
            // console.log('stderr: ' + data);
        });

        list.on('exit', function (code) {
            console.log('child process exited with code ' + code);
            if (code !== 0) {
                reject(code)
            }
        });

        list.stdin.write('wmic logicaldisk get name\n');
        list.stdin.end();
    })
}

listDrives().then((data) => console.log(data))


// async function searchFilesByName(dir, name, paths = []) {
//     try {
//         const files = await fs.readdir(dir);

//         for (const file of files) {
//             var filePath = path.join(dir, file);

//             // Skip the "System Volume Information" directory and others as needed
//             try {

//                 const stat = await fs.stat(filePath);

//                 if (stat.isFile() && file === name) {
//                     paths.push(filePath);
//                 } else if (stat.isDirectory()) {
//                     await searchFilesByName(filePath, name, paths);
//                 }
//             } catch (error) {
//                 // Handle specific errors like "EPERM" here if needed

//                 console.error(`Error processing: ${filePath}`);

//             }
//         }

//         return paths.length > 0 ? paths : null;
//     } catch (error) {
//         console.error(`Error reading directory: ${dir}`);
//         return null;
//     }
// }


async function main() {
    const filesAndFolders = await getFilesAndFolders('E:/public');
    // const searchFile = await searchFilesByName('C://', 'Screenshot 2023-10-06 181914.png');
    console.log(JSON.stringify(filesAndFolders, null, 2));
    // console.log(searchFile);
}

main();