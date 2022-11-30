var startGame = document.getElementById('start');
var timerEl = document.getElementById('countdown');

startGame.addEventListener("click", function(){

    var timeLeft = 10;

    var timeInterval = setInterval(function () {
      timeLeft--;
      timerEl.textContent = timeLeft + " seconds remaining";
  
      if(timeLeft === 0) {
 
        clearInterval(timeInterval);
    
      }
  
    }, 1000);
    
});
      