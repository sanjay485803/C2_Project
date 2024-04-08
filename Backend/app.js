
// we are requiring our app first
const express = require("express");
const app = express();
const bodyP = require("body-parser");
const compiler = require("compilex");    //we RUN the CODE using COMPILEX that's why we first need to requiring
const options = { stats: true }  ////print stats on console

// INITILIZE the compiler
compiler.init(options);

// LOCAL FILE we are using
app.use(bodyP.json());
app.use("/codemirror-5.65.9", express.static("C:/Users/sanja/Desktop/ChatCoder_IITP/codemirror-5.65.9"));


app.use("/codemirror-5.65.9", express.static(__dirname + "/codemirror-5.65.9"));


//  HOST index.html using app.js  file and also delete a file which is created after running app inside temp folder
//we make get req
app.get("/", function (req, res) {
    compiler.flush(function () {
        console.log("deleted")
    })
    res.sendFile(__dirname + "/index.html")
});




//Now this is a main part of our app, make post req and give MultiLingual coding facilities
//we make post req and TAKE CODE FROM USER along with INPUT
app.post("/compile", function (req, res) {
    var code = req.body.code
    var input = req.body.input
    var lang = req.body.lang
    // ERROR HANDLING usinG TRY and CATCH and providing lang Cpp, Java, Python
    try {

        if (lang == "Cpp") {
            if (!input) {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPP(envData, code, function (data) {
                    //CHECK DATA
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
            else {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    //CHECK DATA
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
        }
        else if (lang == "Java") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compileJava(envData, code, function (data) {
                    //CHECK DATA
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                })
            }
            else {
                //if windows  
                var envData = { OS: "windows" };
                //else
                compiler.compileJavaWithInput(envData, code, input, function (data) {
                    //CHECK DATA
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                })
            }
        }
        else if (lang == "Python") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compilePython(envData, code, function (data) {
                    //CHECK DATA
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error, provide valid input which give meaning result please !! " })
                    }
                });
            }
            else {
                var envData = { OS: "windows" };
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    //CHECK DATA
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error"})
                    }
                });
            }
        }
    }
    catch (e) {
        console.log("error")
    }
});

// on WHICH - PORT it's Listen
app.listen(3030);






