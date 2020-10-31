const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('save-score-btn');
const finalScore = document.getElementById('final-score');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const MAX_HIGH_SCORE = 10;

// Get scores from local storage an put them into an array
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
  e.preventDefault();

  const score = {
    score: mostRecentScore,
    name: username.value
  };

  highScores.push(score);
  highScores
    .sort( (a,b) => b.score - a.score )
    .splice(MAX_HIGH_SCORE);

  localStorage.setItem('highScores', JSON.stringify(highScores));
  setTimeout( () => {
    window.location.assign("index.html");
  }, 1000);

}