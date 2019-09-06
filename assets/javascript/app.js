$(document).ready(function () {

    function formatQuestion(q) {
        console.log(q.question);
        $("#questions").append("<h6>" + q.question + "</h6>");

        for (var i = 0; i < q.answers.length; i++) {
            $("#questions").append("<p>" + q.answers[i] + "</p>");
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

    for (var i = 0; i < questions.length; i++){
        formatQuestion(questions[i]);
    }

})