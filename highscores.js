const highscoresList = document.getElementById('highscores-list');
const highscores = JSON.parse(localStorage.getItem('highScores')) || [];

highscoresList.innerHTML = highscores
  .map( score => {
    return `<li class="highscore">${score.name} - ${score.score}</li>`;
  })
  .join('');
