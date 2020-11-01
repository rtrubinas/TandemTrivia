const question = document.getElementById('question');
const choices = Array.from( document.getElementsByClassName('choice-text') );
const progressText = document.getElementById('progress-text');
const progressBarFull = document.getElementById('progress-bar-full');
const scoreText = document.getElementById('score');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswer = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];


//Open Trivia Database API fetch
fetch("https://opentdb.com/api.php?amount=10")
  .then(res => {
    console.log(res);
    return res.json();
  })
  .then(loadedQuestions => {
    
    console.log(loadedQuestions);
    
    questions = loadedQuestions.results.map( loadedQuestion => {
      const formattedQuestion = {
        question: loadedQuestion.question
      }
      ;
      
      const answerChoices = [...loadedQuestion.incorrect_answers];

      formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer
      );

      answerChoices.forEach( (choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });

      return formattedQuestion;
    })
      
    startGame();
  })
  .catch(err => {
    console.error(err);
  });


//number of questions and points per question
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

// FUNCTIONS
startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  
  //Hides game until loaded
  game.classList.remove('hidden');
  loader.classList.add('hidden');
}

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);
    //go to the end page
    return window.location.assign('end.html');
  }

  //Fills progress bar as quiz progresses
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;
  
  //Randomizes question order
  const questionIndex = Math.floor( Math.random() * availableQuestions.length );
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  //Assigns a numeric value to each answer to determine if correct
  choices.forEach ( choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

  // Remove the question from the available ones  
  availableQuestions.splice(questionIndex, 1);

  acceptingAnswer = true;
}
//Checks to see if answer is correct
choices.forEach( choice => {
  choice.addEventListener("click", e => {
    if(!acceptingAnswer) return;
    acceptingAnswer = false;

    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];
   

    //Assigns class to determine if points are awarded
    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
    if (classToApply === 'correct') {
      incrementScore(CORRECT_BONUS);
    }

    //changes selection color based on correct/incorrect, waits before loading the next question
    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout( () => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
}

