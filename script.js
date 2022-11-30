var startButton = document.getElementById('start');
var timerEl = document.getElementById('countdown');
var wordBlank = document.querySelector(".word-blank");
var win = document.querySelector(".win");
var lose = document.querySelector(".loss");

var words = ["javascript", "function", "merge", "branch","element"]

var chosenWord = "";
var letters = [];
var numLetters = 0; 
var blankLetters = [];
var isWin = false;



function startTimer(){

    var timeLeft = 10;

    var timeInterval = setInterval(function () {
      timeLeft--;
      timerEl.textContent = timeLeft + " seconds remaining";
  
      if((timeLeft ===0)) {
 
        clearInterval(timeInterval);
    
      }
  
    }, 1000);
    
};

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


 startButton.addEventListener("click", startGame());     