$(document).ready(function () {

    function formatQuestion(q) {
        console.log(q.question);
        $("#question").html("<p><b>" + q.question + "</b></p>");

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
    var status = "";

    var intervalID;
    var countdown = 30;
    var questionIndex = 0;


    function askQuestion() {
        clearInterval(intervalID);
        countdown = 30;
        // If all questions have not been cycled through
        if (questionIndex !== questions.length) {
            // Displays 30, since setInterval starts after one second
            $("#timer").text("Time Remaining: " + countdown);
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
            status = "unanswered";
            unanswered++;

            clearInterval(intervalID);
            displayMessage(status);
            setTimeout(proceedToNextQ, 5000);

            countdown = 30;
            $("#timer").text("");
        } else {
            $("#timer").text("Time Remaining: " + countdown);
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
            status = "correct";
            correct++;
        } else { // If clicked answer doesn't match, answer was incorrect
            status = "incorrect";
            incorrect++;
        }
        // Ask next question
        // askQuestion();

        clearInterval(intervalID);
        displayMessage(status);
        setTimeout(proceedToNextQ, 5000);
    })

    function resetGame() {
        questionIndex = 0;
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        $("#correct, #incorrect, #unanswered, #message, #question, .answer").empty();
    }

    // Tells user if they didn't answer, or if their answer was correct or not
    function displayMessage(status) {
        // Clears out question, answers, and timer
        
        $("#question, #timer, .answer").empty();

        // If user got answer correct, display "correct!" message
        if (status === "correct") {
            console.log(status);
            $("#message").text("Correct!");
            $("#post-question-image").html("<img src=\"assets/images/correct.gif\" alt=\"Snow White clapping\">");

        } else if (status === "incorrect") { // If user got answer incorrect, display "incorrect!" message
            console.log(status);
            $("#message").text("Incorrect! The correct answer was \"" + questions[questionIndex - 1].answer + "\"");
            $("#post-question-image").html("<img src=\"assets/images/incorrect.gif\" alt=\"Sadness crying\">");
        } else { // If user did not answer, display "out of time" message and display correct answer.
            console.log(status);
            var unansweredMessage = "<p>Out of time!</p>";
            unansweredMessage += "<p>The correct answer was \"" + questions[questionIndex - 1].answer + "\"</p>";
            $("#message").html(unansweredMessage);
            $("#post-question-image").html("<img src=\"assets/images/incorrect.gif\" alt=\"Sadness crying\">");
        }
    }

    function proceedToNextQ() {
        // Clears out message and image before displaying next question
        $("#message, #post-question-image").empty();
        askQuestion();
    }

})

/*
 * TODO (if you have extra time!!!):
 * 
 * Change order answered are displayed for randomization
 * Display different messages at end of game dependent on score
 * Show different images/gifs for each question
 * 
 * 
 */
