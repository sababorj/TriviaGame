// Declare an array to store item Objects, each object has question, answersOptions, correctAnswer, and a picture
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
        correctAnswer: "Zoroastrianism",
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
    //set and present a timer
    var timeLeft = 5;
    $(".timer").append(`<h3 id="time">Time Remaining: ${timeLeft} Seconds</h3>`);
    var timerid = setInterval(function () {
        timeLeft--;
        $("#time").text(`Time Remaining: ${timeLeft} Seconds`);
        if (timeLeft === 0) {
            timeForResult(false, questionNumber);
        }
    }, 1000);

    // present items
    $(".item").append(`<h3 id="question">${itemArray[questionNumber].question}</h3>`);
    for (var i = 0; i < 4; i++) {
        $(".item").append(`<button class="answerButton" value="${i}" >${itemArray[questionNumber].answersOptions[i]}</button>`);
    }

    // handeling user's answers
    $(".answerButton").on("click",function(){
        var j = parseInt($(this).val());
        chosenanswer = itemArray[questionNumber].answersOptions[j];
        timeForResult(chosenanswer,questionNumber)
    })



    // result part
    function timeForResult(answer, questionNumber) {
        clearInterval(timerid);
        $(".item").empty();
        // time out result
        if (!answer) {
            unAnswered++;
            $(".item").append(`<h3> Out of Time </h3>`);
            $(".item").append(`<h2> The correct answer was: ${itemArray[questionNumber].correctAnswer} </h3>`); 
        } 
        // correct answer result 
        else if (answer === itemArray[questionNumber].correctAnswer) {
            $(".item").append(`<h3> Correct! </h3>`);
            correct++;

        } 
        // wrong answer result
        else {
            incorrect++
            $(".item").append(`<h3> Nope! </h3>`);
            $(".item").append(`<h2> The correct answer was: ${itemArray[questionNumber].correctAnswer} </h3>`);
        }
        $(".item").append(`<img src="${itemArray[questionNumber].picture}">`);
    }

}


// final result 


// restart the game