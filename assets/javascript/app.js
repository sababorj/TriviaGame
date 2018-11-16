// Declare an array to store item objects, each item object has question, answersOptions, correctAnswer, and a picture
var itemArray = [
    {
        question: "What is the official language of Iran?",
        answersOptions: ["Farsi", "Arabic", "Urdu", "French"],
        correctAnswer: "Farsi",
        picture: "assets/images/talking.png"
    },
    {
        question: "What race do Iranian people belong to?",
        answersOptions: ["Asian", "Hispanic", "Arab", "Caucasian"],
        correctAnswer: "Caucasian",
        picture: "assets/images/people.png"
    },
    {
        question: "How old is Iran?",
        answersOptions: ["3000 years old", "2500 years old", "7000 yearold", "4500 years old"],
        correctAnswer: "2500 years old",
        picture: "assets/images/age.png"
    },
    {
        question: "What is the original religion of Iran?",
        answersOptions: ["buddhism", "Islam", "Zoroastrianism", "Judaism"],
        correctAnswer: "Zoroastrianism",
        picture: "assets/images/religion.png"
    },
    {
        question: "What is the meaning of the word Iran?",
        answersOptions: ["Land of the persians", "Land of the Aryans", "Land of the God", "Land of brave men"],
        correctAnswer: "Land of the Aryans",
        picture: "assets/images/iran.png"
    },
    {
        question: "What the Iran's famous product?",
        answersOptions: ["Pistachios", "Persian rug", "Saffron", "All of the above"],
        correctAnswer: "All of the above",
        picture: "assets/images/product.png"
    },
    {
        question: "What the capital of Iran?",
        answersOptions: ["Rasht", "Esfahan", "Tehran", "Shiraz"],
        correctAnswer: "Tehran",
        picture: "assets/images/tehran.png"
    }
]

// initialize final result values
var correct = 0;
var incorrect = 0;
var unAnswered = 0;

// click on start
$("#startButton").on("click", function () {
    $("#start").hide();
    game(0);
})


// main game function
function game(questionNumber) {

    // present a timer in the page 
    $(".timer").empty();
    var timeLeft = 10;
    $(".timer").append(`<h3 id="time">Time Remaining: ${timeLeft} Seconds</h3>`);
    // run the timer 
    var timerid = setInterval(decrease, 1000);
    function decrease() {
        timeLeft--;
        $("#time").text(`Time Remaining: ${timeLeft} Seconds`);
        if (timeLeft === 0) {
            timeForResult(false, questionNumber);
        }
    }

    // present the item 
    $(".item").append(`<h3 id="question">${itemArray[questionNumber].question}</h3>`);
    for (var i = 0; i < 4; i++) {
        $(".item").append(`<button class="answerButton" value="${i}" >${itemArray[questionNumber].answersOptions[i]}</button>`);
    }

    // handeling user's answers
    $(".answerButton").on("click", function () {
        var j = parseInt($(this).val());
        chosenanswer = itemArray[questionNumber].answersOptions[j];
        timeForResult(chosenanswer, questionNumber)
    })

    // result for each question
    function timeForResult(answer, questionNumber) {
        clearInterval(timerid);
        $(".item").empty();

        // time out unanswered result
        if (!answer) {
            unAnswered++;
            $(".item").append(`<h3> Out of Time </h3>`);
            $(".item").append(`<h2> The correct answer was: ${itemArray[questionNumber].correctAnswer} </h2>`);
        }
        // correct answer result 
        else if (answer === itemArray[questionNumber].correctAnswer) {
            $(".item").append(`<h3> Correct! </h3>`);
            correct++;
        }
        // incorrect answer result
        else {
            incorrect++
            $(".item").append(`<h3> Nope! </h3>`);
            $(".item").append(`<h2> The correct answer was: ${itemArray[questionNumber].correctAnswer} </h2>`);
        }
        $(".item").append(`<img src="${itemArray[questionNumber].picture}">`);

        // moving on to the next step (either next question or final result page)
        questionNumber = questionNumber + 1;
        setTimeout(function (){nextstep(questionNumber)}, 2000);
    }
}


// moving to next question or final result
function nextstep(questionNumber) {
    if (questionNumber === (itemArray.length - 1)) {
        finalResult();
    } else {
        $(".item").empty();
        $(".time").empty();
        game(questionNumber);
    }
}

// final result page 
function finalResult() {
    $(".item").empty();
    $(".item").append(`<h3> All Done! Here is how you did </h3>`);
    $(".item").append(`<h2> Correct Answers: ${correct} </h2>`);
    $(".item").append(`<h2> Incorrect Answers: ${incorrect} </h2>`);
    $(".item").append(`<h2> Unanswerred: ${unAnswered} </h2>`);
    $(".item").append(`<button type="button" id="reset"> Start Over? </button>`);
    $("#reset").on("click", restart)
}

// restart the game
function restart() {
    $(".item").empty();
    $(".timer").empty();
    correct = 0;
    incorrect = 0;
    unAnswered = 0;
    questionNumber = 0;
    $("#start").show();
}
