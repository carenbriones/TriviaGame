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
            ["Sleepy", "Doc", "Dopey", "Mopey"], "Doc"),
        new Question("Which of the following Disney characters was the first to have her own full length movie?",
            ["Ariel", "Snow White", "Cinderella", "Mulan"], "Snow White"),
        new Question("What was Nemo's dad's name in \"Finding Nemo\"?", ["Martin", "Marvin", "Marlin", "Mark"],
            "Marlin")

    ];

    var intervalID;
    var countdown = 30;
    questionIndex = 0;


    function askQuestion(){
        clearInterval(intervalID);
        // If all questions have not been cycled through
        if(questionIndex !== questions.length){
            intervalID = setInterval(countDownTime, 1000);

            // Display question
            formatQuestion(questions[questionIndex]);
            questionIndex++;
        } else{ // All questions have been cycled through; end game
            clearInterval(intervalID);
        }
    }

    function countDownTime(){
        countdown--;
        $("#timer").text(countdown);

        if (countdown === 0){
            countdown = 30;
            clearInterval(intervalID);
            askQuestion();
        }
    }

    // Starts game by displaying first question
    $("#start").on("click", function(){
        // Hides start button
        $(this).css("display", "none");

        // Asks first question
        askQuestion();
    })

    

    // User clicks start
    // Timer for first question starts counting down
        // User can either click an answer or not
            // If user's answer is correct, show correct message, increment correct counter
            // Else if user's answer is incorrect, show incorrect message, increment incorrect counter
            // Else, unanswered and timer runs out; increment unanswered counter
        // New question is displayed; continues until end of all questions
        // End, display number of correct, incorrect, and unanswered questions

})