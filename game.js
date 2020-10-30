const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {}    ;
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch("Apprentice_TandemFor400_Data.json").then(res => {
    return res.json();
}).then(loadedQuestions => {
    console.log(loadedQuestions)
    questions = loadedQuestions;
    startGame();
})
.catch(err => {
    console.error(err);
  });


const CORRECT_ANSWER = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions)
    getNewQuestion();
};

getNewQuestion = () => {

    //takes user to end page when there are no more questions
    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign("/end.html"); 
    }
    questionCounter++;
    // displays the current question number vs the toal question number
    progressText.innerText = "Question" + questionCounter + "/" + MAX_QUESTIONS; 

    //fills progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    Math.floor(Math.random() * availableQuestions.length)/*generates random question order using integers*/
    currentQuestions = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
    
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = 'incorrect';
        if(selectedAnswer == currentQuestion.answer){
            classToApply = 'correct';
        }
        /* const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';*/

        if(classToApply === 'correct') {
            incrementScore(COREECT_ANSWER)
        }

        console.log(classToApply); 

        console.log(selectedAnswer == currentQuestion.answer);

        selectedChoice.parentElement.classList.add(classToApply);
        
        setTimeout( ( ) => {

            selectedChoice.parentElement.classList.remove(classToApply);

            getNewQuestion();

        }, 1000);
        
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

