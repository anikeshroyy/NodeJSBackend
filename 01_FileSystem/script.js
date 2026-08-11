const { log } = require('node:console')
const fs = require('node:fs')

const content = "Test file creation using writeFile"

// ------------------- Creating File Asynchronosly 
fs.writeFile("./test.txt", content, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("File Created");
    }
})

// ------------------- Adding Content in created file or existing file synchronosly
const updatedContent = " This is the updated content"
try {
    fs.appendFileSync('test.txt', updatedContent)
    console.log("File Updated");
} catch (err) { console.log(err) };

//-------------------- Reading file data using readfile
fs.readFile("./test.txt", 'utf-8', (data, err) => {
    if (err) { console.error(err); }
    console.log(data)
})

fs.rename("newTest.html", "test.txt", (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log("file Renamed")
})