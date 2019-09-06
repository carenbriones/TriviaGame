$(document).ready(function () {

    function formatQuestion(q) {
        console.log(q.question);
        $("#question").html("<h6>" + q.question + "</h6>");

        for (var i = 0; i < q.answers.length; i++) {
            $("#answer-" + (i + 1)).html("<p>" + q.answers[i] + "</p>");
        }
    }

    class Question {
        constructor(question, answers, answer) {
            this.question = question;
            this.answers = answers;
            this.answer = answer;
        }
    }

    var questions = [
        new Question("Which of the following is NOT the name of one of the seven dwarves from Snow White?",
            ["Sleepy", "Doc", "Dopey", "Mopey"], "Mopey"),
        new Question("Which of the following Disney characters was the first to have her own full length movie?",
            ["Ariel", "Snow White", "Cinderella", "Mulan"], "Snow White"),
        new Question("What was Nemo's dad's name in \"Finding Nemo\"?", ["Martin", "Marvin", "Marlin", "Mark"],
            "Marlin")

    ];

    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;

    var intervalID;
    var countdown = 30;
    var questionIndex = 0;


    function askQuestion() {
        clearInterval(intervalID);
        countdown = 30;
        // If all questions have not been cycled through
        if (questionIndex !== questions.length) {
            intervalID = setInterval(countDownTime, 1000);

            // Display question
            formatQuestion(questions[questionIndex]);
            questionIndex++;
        } else { // All questions have been cycled through; end game
            clearInterval(intervalID);
            // Clears out question and timer
            $("#question, .answer").empty();
            $("#timer").empty();

            // Displays stats
            $("#correct").html($("<p>").text("Correct: " + correct));
            $("#incorrect").html($("<p>").text("Incorrect: " + incorrect));
            $("#unanswered").html($("<p>").text("Unanswered: " + unanswered));

            // Renders start button and play again message, allowing user to play again
            $("#start").css("display", "block");
            $("#message").text("Play again?");
        }
    }

    function countDownTime() {
        countdown--;

        // If countdown equals 0, question was unanswered
        if (countdown === 0) {
            unanswered++;
            askQuestion();
            countdown = 30;
            $("#timer").text("");
        } else {
            $("#timer").text(countdown);
        }
    }

    // Starts game by displaying first question
    $("#start").on("click", function () {
        resetGame();
        // Hides start button and instructions
        $(this).css("display", "none");
        $("#instructions").empty();

        // Asks first question
        askQuestion();
    })

    $(".answer").on("click", function () {
        // if clicked answer matches answer of question, user was correct
        // Note: used questionIndex - 1 because it's set to next index at end of askQuestion()
        if ($(this).text() === questions[questionIndex - 1].answer) {
            correct++;
            console.log("Correct");
        } else { // If clicked answer doesn't match, answer was incorrect
            incorrect++;
        }
        // Ask next question
        askQuestion();
    })

    function resetGame(){
        questionIndex = 0;
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        $("#correct, #incorrect, #unanswered, #message, #question, .answer").empty();
    }

    // User clicks start
    // Timer for first question starts counting down
    // User can either click an answer or not
    // If user's answer is correct, show correct message, increment correct counter
    // Else if user's answer is incorrect, show incorrect message, increment incorrect counter
    // Else, unanswered and timer runs out; increment unanswered counter
    // New question is displayed; continues until end of all questions
    // End, display number of correct, incorrect, and unanswered questions

})