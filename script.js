var startButton = document.getElementById('start');
var timerEl = document.getElementById('countdown');
var wordBlank = document.querySelector(".word-blank");
var win = document.querySelector(".win");
var lose = document.querySelector(".loss");
var resetButton = document.querySelector(".reset");

var words = ["javascript", "function", "merge", "branch","element"]

var chosenWord = "";
var letters = [];
var numLetters = 0; 
var blankLetters = [];
var isWin = false;
var winCounter = 0;
var loseCounter = 0;



function startTimer(){

    var timeLeft = 10;

    var timeInterval = setInterval(function () {
      timeLeft--;
      timerEl.textContent = timeLeft + " seconds remaining";
  
      if((timeLeft >= 0)) {
        if (isWin && timeLeft > 0) {
            clearInterval(timeInterval);
            winGame();
        }
      }

      if (timeLeft === 0) {
        clearInterval(timeInterval);
        loseGame();
      }
  
    }, 1000);
    
};

function winGame() {
    wordBlank.textContent = "Congratulation! You won!"
    winCounter++
    setWins();
}

function loseGame() {
    wordBlank.textContent = "Sorry! You lost!"
    loseCounter++
    setLoses();
}

function setWins() {
    win.textContent = winCounter
    localStorage.setItem("winCount", winCounter);
}

function setLoses() {
    lose.textContent = loseCounter
    localStorage.setItem("loseCount", loseCounter);
}

function getWins() {
    var storedWins = localStorage.getItem("winCount");
    
    if (storedWins === null){
        winCounter = 0;
    } else {
        winCounter = storedWins;
    }
    win.textContent = winCounter;
}

function getLoses() {
    var storedLoses = localStorage.getItem("loseCount")

    if (storedLoses === null){
        loseCounter = 0;
    } else {
        storedLoses = loseCounter
    }
    lose.textContent = loseCounter;
}

function startGame() { 
isWin = false;
renderBlanks();
startTimer();
}


function renderBlanks() {
    chosenWord = words[Math.floor(Math.random() * words.length)];
    letters = chosenWord.split("");
    numLetters = letters.length;
    blankLetters = [];

    for (var i = 0; i < numLetters; i++) {
        blankLetters.push("_");
    }
    wordBlank.textContent = blankLetters.join(" ")
}

function checkLetters(letter) {
    var letterInWord = false; 
    for (var i =0; i < numLetters; i++) {
        if (chosenWord[i] === letter) {
            letterInWord = true;
            blankLetters[i] = letter
        }
    }
    wordBlank.textContent = blankLetters.join(" ")
}
document.addEventListener("keydown", function(event){
    var key = event.key.toLowerCase();
    var characters = "abcdefghijklmnopqrstuvwxyz".split("");

    if (characters.includes(key)) {
        var guessedWord = event.key;
        checkLetters(guessedWord);
        checkWin();
    }
})

function checkWin (){ 
    if (chosenWord === blankLetters.join("")){
        isWin = true;
    }
}
 
startButton.addEventListener("click", startGame());     

function resetGame() {
    winCounter = 0;
    loseCounter = 0;

    setWins()
    setLoses()
}

resetButton.addEventListener("click", resetGame());