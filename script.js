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
var timeLeft = 0;

function init() {
    getWins();
    getlosses();
  }

function startGame() { 
    isWin = false;
    startButton.disabled = true;
    renderBlanks();
    startTimer();
}

function winGame() {
    wordBlank.textContent = "Congratulation! You won!"
    winCounter++
    startButton.disabled = false;
    setWins();
}

function loseGame() {
    wordBlank.textContent = "Sorry! You lost!"
    loseCounter++
    startButton.disabled = false;
    setLoses();
}

function startTimer(){

    timeLeft = 31;

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

function checkWin (){ 
    if (chosenWord === blankLetters.join("")){
        isWin = true;
    }
}

function checkLetters(letter) {
    var letterInWord = false; 
    for (var i =0; i < numLetters; i++) {
        if (chosenWord[i] === letter) {
            letterInWord = true;
        }
    }

    if (letterInWord) {
        for (var j = 0; j < numLetters; j++) {
            if (chosenWord[j] === letter){
                blankLetters[j] = letter;
            }
        }
        wordBlank.textContent = blankLetters.join(" ");
    }
}

document.addEventListener("keydown", function(event) {
    if (timeLeft === 0) {
        return;
      }

    var key = event.key.toLowerCase();
    var characters = "abcdefghijklmnopqrstuvwxyz0123456789 ".split("");

    if (characters.includes(key)) {
        var guessedWord = event.key;
        checkLetters(guessedWord);
        checkWin();
    }
});
 
startButton.addEventListener("click", startGame);     

function resetGame() {
    winCounter = 0;
    loseCounter = 0;

    setWins()
    setLoses()
}

resetButton.addEventListener("click", resetGame);