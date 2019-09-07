/**
 * @author Caren Briones <carenpbriones@gmail.com>
 * Provides functionalities for Trivia Game
 * 
 * Displays each question one by one with countdown timer, allows user to answer question, 
 * displays correct/incorrect/unanswered after each question, keeps track of and displays
 * stats at end of game.
 * 
 * September 5, 2019
 */

$(document).ready(function () {
    
    /* Constructor for Questions */
    class Question {
        constructor(question, answers, answer, image) {
            this.question = question;
            this.answers = answers;
            this.answer = answer;
            this.image = image;
        }
    }

    // Array of questions asked in the Trivia Game
    var questions = [
        new Question("Which of the following is NOT the name of one of the seven dwarves from Snow White?",
            ["Sleepy", "Doc", "Dopey", "Mopey"], "Mopey", "assets/images/six-dwarfs.gif"),
        new Question("Which of the following Disney characters was the first to have her own full length movie?",
            ["Ariel", "Snow White", "Cinderella", "Mulan"], "Snow White", "assets/images/snow-white.gif"),
        new Question("What was Nemo's dad's name in \"Finding Nemo\"?", ["Martin", "Marvin", "Marlin", "Mark"],
            "Marlin", "assets/images/marlin-and-nemo.gif"),
        new Question("What is Mulan's family name?", ["Zhu", "Fa", "Ma", "Zhang"], "Fa", "assets/images/mulan.gif"),
        new Question("Which of the following is NOT a Disney film?", 
            ["How to Train Your Dragon", "Enchanted", "Maleficent", "Lady and the Tramp"],
            "How to Train Your Dragon", "assets/images/toothless.gif"),
        new Question("Which of the following is NOT a song sung in the film \"Frozen\"?",
            ["Let it Go", "Love is an Open Door", "Go the Distance", "In Summer"], "Go the Distance", "assets/images/elsa.gif"),
        new Question("How many fairy godmothers did Aurora from \"Sleeping Beauty\" have?",
            ["2", "3", "4", "5"], "3", "assets/images/fairy-godmothers.gif"),
        new Question("What was the name of Aladdin's monkey sidekick?",
            ["Abubu", "Abu", "Apu", "Abibi"], "Abu", "assets/images/abu.gif"),
        new Question("Which phrase means \"No worries\"?",
            ["Hakuna Matata", "Carpe Diem", "Se me fue el avion", "Lea iacta est"], "Hakuna Matata", "assets/images/hakuna-matata.gif"),
        new Question("What time did Cinderella have to leave the ball?",
            ["9PM", "10PM", "11PM", "12AM"], "12AM", "assets/images/cinderella.gif")
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
    var questionIndex = -1;
    
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
        questionIndex++;
        clearInterval(intervalID);
        countdown = 30;
        // If all questions have not been cycled through
        if (questionIndex !== questions.length) {
            // Displays 30, since setInterval starts after one second
            $("#timer").text("Time Remaining: " + countdown);
            intervalID = setInterval(countDownTime, 1000);

            // Display question
            displayQuestion(questions[questionIndex]);
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
        if ($(this).text() === questions[questionIndex].answer) {
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
        questionIndex = -1;
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
            // $("#post-question-image").html("<img src=\"assets/images/correct.gif\" alt=\"Snow White clapping\">");

        } else if (status === "incorrect") { // If user got answer incorrect, display "incorrect!" message
            console.log(status);
            $("#message").text("Incorrect! The correct answer was \"" + questions[questionIndex].answer + "\"");
            // $("#post-question-image").html("<img src=\"assets/images/incorrect.gif\" alt=\"Sadness crying\">");
        } else { // If user did not answer, display "out of time" message and display correct answer.
            console.log(status);
            var unansweredMessage = "<p>Out of time!</p>";
            unansweredMessage += "<p>The correct answer was \"" + questions[questionIndex].answer + "\"</p>";
            $("#message").html(unansweredMessage);
            // $("#post-question-image").html("<img src=\"assets/images/incorrect.gif\" alt=\"Sadness crying\">");
        }
        $("#post-question-image").html("<img src=\"" + questions[questionIndex].image + "\">");
    }

    /* Clears messages and proceeds to next question */
    function proceedToNextQ() {
        // Clears timer, displays correct/incorrect/unanswered message
        clearInterval(intervalID);
        displayMessage(status);

        // Clears out background color on empty answer divs
        $(".answer").css("background-color", "#fefefc");

        setTimeout(function(){
            // Clears out message and image
            $("#message, #post-question-image").empty();
            askQuestion();
        }, 5000);
    }

    // Only changes color on hover when the answers are displayed on screen
    $(".answer").hover(function(){
        // If there is text in the answer div, change background color to gray on mouseenter
        if($(this).text() !== ""){
            $(this).css("background-color", "#e6e6e6");
        }
    }, function(){ // Changes background color to white on mouseleave
        $(this).css("background-color", "#fefefc");
    })
})