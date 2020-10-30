const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRcentScore');
const MAX_HIGH_SCORE = 5;

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
finalScore.innerText = mostRecentScore;


username.addEventListener('keyup', () => {
    console.log(usernameInput.value);
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    const score = {
        score:mostRecentScore,
        name: username.value
    };
    highScores.push(score);
    highScores.sort( (a,b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("index.html");
    
    
};