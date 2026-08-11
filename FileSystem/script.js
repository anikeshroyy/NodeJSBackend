const { log } = require('node:console')
const fs = require('node:fs')

const content = " This is append file creation using node js"

// ------------------- Creating File Asynchronosly 
fs.writeFile("test.txt", content, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("File Created");
    }
})

// ------------------- Adding Content in created file or existing file synchronosly
try {
    fs.appendFileSync('test.txt', content)
    console.log("File Updated");
} catch (err) { console.log(err) };

fs.readFile("test.txt", content, r)