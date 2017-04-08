var bC = require("./basicCard.js");
var cC = require("./closeCard.js");
var fs = require("fs");
var inquirer = require("inquirer");
var dataArray = [];
var choices = ["Exit", "Continue"];


bC.prototype = {
    textLog: function(a, b) {
        fs.appendFile("bC.txt", a + "," + b + ",", function(err) {
            if (err) {
                console.log("error");
            } else {
                console.log("content added");
            }
        })
    }
}

cC.prototype = {
    logClose: function(a, b) {
        if (this.parText === a) {
            console.log("You're close deletion doesn't work");
        } else {
            fs.appendFile("cC.txt", a + "," + b + "," + this.parText + ",", function(err) {
                if (err) {
                    console.log(err);
                }
                console.log("content added");
            })
        }
    }
}



//Using the cC.txt file

var cCGetInfo = function() {
        console.log("");
        console.log("");
        console.log("-----------------HAVE FUN------------------------------")
        console.log("");
        console.log("");

        fs.readFile("cC.txt", "utf8", function(err, response) {
                if (err) {
                    console.log(err);
                }
                var newResponse = response.toString();
                var newestResponse = newResponse.split(",");
                var popResponse = newestResponse.pop();
                var textArray = [];
                var clozeArray = [];
                var partialArray = [];

                for (var i = 0; i < newestResponse.length; i++) {
                    if (i % 3 === 0) {
                        textArray.push(newestResponse[i])

                    } else if (i % 3 === 1) {
                        clozeArray.push(newestResponse[i]);
                    } else {
                        partialArray.push(newestResponse[i]);
                    }
                }


                var questions = function() {
                    var x = Math.floor((Math.random() * textArray.length)); //takes random # from arraylength


                    var partialNum = function() { //  prints the  cloze deleted array item
                        console.log(clozeArray[x]);
                        myarray = textArray.splice(x, 1);
                        myarray = clozeArray.splice(x, 1);
                        myarray = partialArray.splice(x, 1);

                        console.log("");
                        console.log("------------------------------------------------------");
                        console.log("");

                    }

                    if (textArray[x] != undefined) {
                        setTimeout(partialNum, 1500); // calls the answer in 3 seconds
                        console.log(partialArray[x]); // calls the question immedialely
                        setTimeout(questions, 2000);
                    } else {
                        console.log("you're all out of Flashcards");
                        exit(cCGetInfo);
                    }
                }
                questions();


            }) // end to the read file
    } // end to the cc function for ccgetinfo


// USING THE bC.txt file 
// this is where the magic happens and we read from the txt file and present the user with the information
var gettingQuesAns = function() {

    console.log("");
    console.log("");
    console.log("-----------------HAVE FUN------------------------------")
    console.log("");
    console.log("");


    fs.readFile("bC.txt", "utf8", function(error, data) {
            var newData = data.toString();
            newestData = newData.split(",");
            var length = newestData.length;
            var newA = newestData.pop();
            var argArray1 = [];
            var argArray2 = [];

            // we're moving all indexes from the bc.txt file seperated by commas  and pushing them into 2 arrays since we add a question and answer each time to the txt file
            for (var i = 0; i < newestData.length; i++) {
                if (i % 2 === 0) {
                    // answers array
                    argArray1.push(newestData[i]);
                } else {
                    //questions array
                    argArray2.push(newestData[i]);
                }
            }


            var newQuestion = function() {
                    var x = Math.floor((Math.random() * argArray1.length));


                    // this function is made so we can set a time out on the 
                    var questions = function() {
                            console.log(argArray2[x]);

                            console.log("");
                            console.log("---------------------------------------------------");
                            console.log("");

                            argArray4 = argArray1.splice(x, 1);
                            // console.log(argArray1);
                            argArray4 = argArray2.splice(x, 1);
                        } // end to questions function

                    if (argArray2[x] != undefined) {
                        console.log(argArray1[x]);
                        setTimeout(questions, 1500);
                        setTimeout(newQuestion, 2000);
                    } else {
                        console.log("You've seen all the flashCards")
                        exit(gettingQuesAns);
                    }
                    // newQuestion();
                } // endsd newquestion function
            newQuestion();
        }) // readfile answers

}

function exit(repeatfunction) {
    inquirer.prompt([{
        name: "exit",
        message: "Would you like to Continue or Exit?",
        type: "rawlist",
        choices: choices
    }]).then(function(ans) {
        console.log(ans.exit);
        switch (ans.exit) {
            case "Continue":
                repeatfunction();
                break;
            case "Exit":
                switching();
                break;
        }
    });
}



function askingQuestion() {
    makequestion = function() {
        inquirer.prompt([{
            name: "front",
            message: "Write out your question.",
            type: "text"
        }, {
            name: "back",
            message: "Answer to the question.",
            type: "text"
        }]).then(function(a) {

            var president = new bC(a.front, a.back);
            president.textLog(a.front, a.back);
            exit(makequestion);

        });

    }
    makequestion();
}



function askingCCQuestion() {
    inquirer.prompt([{
        name: "text",
        message: "Write out the full question.",
        type: "text"
    }, {
        name: "cloze",
        message: "Enter the cloze-deleted portion of the question.",
        type: "text"
    }]).then(function(a) {
        var president = new cC(a.text, a.cloze);
        president.logClose(a.text, a.cloze);
        exit(askingCCQuestion);
    });
}



var switching = function() {

    var action = ["View Basic Flashcards", "View Cloze-deleted Flashcards", "Make Basic Flashcard", "Make Cloze-deleted Flashcard", "EXIT"];
    inquirer.prompt([{
        name: "type",
        type: "rawlist",
        message: "What would you like to do?",
        choices: action

    }]).then(function(a) {

        switch (a.type) {

            case "View Basic Flashcards":
                gettingQuesAns();
                break;
            case "View Cloze-deleted Flashcards":
                cCGetInfo();
                break;
            case "Make Basic Flashcard":
                askingQuestion();
                break;
            case "Make Cloze-deleted Flashcard":
                askingCCQuestion();
            case "EXIT":
                break;
        }
    });
}

switching();
