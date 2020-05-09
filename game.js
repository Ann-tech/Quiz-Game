const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName("choice-text"));
const QuestionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let QuestionCounter = 0;
let availableQuestions = [];

let questions = [
    {
       question: "The correct HTML tag for the largest heading is?",
       choice1: "<head>",
       choice2: "<h6>",
       choice3: "<h1>",
       choice4: "<h>",
       answer: 3
    },

    {
        question: "HTML is considered as what type of language?",
        choice1: "Higher level language",
        choice2: "Markup language",
        choice3: "Programming language",
        choice4: "ODP language",
        answer: 2
     },

     {
        question: "Javascript code can be called using?",
        choice1: "RMI",
        choice2: "Triggering Event",
        choice3: "Preprocessor",
        choice4: "Function/Method",
        answer: 4
     },

     {
        question: "Among the following which one is a ternary operator?",
        choice1: "+",
        choice2: ":",
        choice3: "-",
        choice4: "?:",
        answer: 4
     },

     {
        question: "The statement a===b refers to?",
        choice1: "Both a and b are equal in value, type and reference address",
        choice2: "Both a and b are equal in value and type",
        choice3: "Both a and b are equal in value",
        choice4: "There is no such statement",
        answer: 2
     }

];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
    QuestionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || QuestionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('/end.html');
    }

    QuestionCounter++;
    QuestionCounterText.innerText = `${QuestionCounter}/${MAX_QUESTIONS}`;


    const QuestionIndex = Math.floor(Math.random() == availableQuestions.length);
    currentQuestion = availableQuestions[QuestionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];

    });

    availableQuestions.splice(QuestionIndex, 1);
    acceptingAnswers = true;

};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = 
          selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
              
          if(classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }


            selectedChoice.parentElement.classList.add(classToApply);

            setTimeout( () => {
                selectedChoice.parentElement.classList.remove(classToApply);
                getNewQuestion();
            }, 1000);
            

});

});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
};
    
    

startGame();
