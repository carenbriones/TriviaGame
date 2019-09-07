$(document).ready(function () {
    
    /* Constructor for Questions */
    class Question {
        constructor(question, answers, answer) {
            this.question = question;
            this.answers = answers;
            this.answer = answer;
        }
    }

    // Array of questions asked in the Trivia Game
    var questions = [
        new Question("Which of the following is NOT the name of one of the seven dwarves from Snow White?",
            ["Sleepy", "Doc", "Dopey", "Mopey"], "Mopey"),
        new Question("Which of the following Disney characters was the first to have her own full length movie?",
            ["Ariel", "Snow White", "Cinderella", "Mulan"], "Snow White"),
        new Question("What was Nemo's dad's name in \"Finding Nemo\"?", ["Martin", "Marvin", "Marlin", "Mark"],
            "Marlin")

    ];

    // Variables for number of correct, incorrect, and unanswered questions
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;
    var status = "";

    // Variables for timers
    var intervalID;
    var countdown = 30;

    // Variable to iterate through array of questions
    var questionIndex = 0;
    
    /* Displays a question on the page */
    function displayQuestion(q) {
        console.log(q.question);
        $("#question").html("<p><b>" + q.question + "</b></p>");

        for (var i = 0; i < q.answers.length; i++) {
            $("#answer-" + (i + 1)).html("<p>" + q.answers[i] + "</p>");
        }
    }

    /* 
        Displays question if there are still questions left;
        ends game if there are no more questions left
    */
    function askQuestion() {
        clearInterval(intervalID);
        countdown = 30;
        // If all questions have not been cycled through
        if (questionIndex !== questions.length) {
            // Displays 30, since setInterval starts after one second
            $("#timer").text("Time Remaining: " + countdown);
            intervalID = setInterval(countDownTime, 1000);

            // Display question
            displayQuestion(questions[questionIndex]);
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

    /* Counts down from 30, used to time each question */
    function countDownTime() {
        countdown--;

        // If countdown equals 0, question was unanswered
        if (countdown === 0) {
            status = "unanswered";
            unanswered++;

            proceedToNextQ();
        } else { // Continues to count down if there is still time left for user to answer
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

        proceedToNextQ();
    })

    /* Resets stats for the game */
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

    /* Clears messages and proceeds to next question */
    function proceedToNextQ() {
        // Clears timer, displays correct/incorrect/unanswered message
        clearInterval(intervalID);
        displayMessage(status);

        setTimeout(function(){
            // Clears out message and image
            $("#message, #post-question-image").empty();
            askQuestion();
        }, 5000);
    }
})

/*
 * TODO (if you have extra time!!!):
 * 
 * Change order answers are displayed for randomization
 * Display different messages at end of game dependent on score
 * Show different images/gifs for each question
 * Change hover color only when there a question and its answers are displayed
 * 
 * 
 */
