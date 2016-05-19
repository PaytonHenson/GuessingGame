/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
(function() {  
  var playersGuess;

  var guessesRemaining = 5;

  var guessArray = [];

  /* **** Guessing Game Functions **** */

  // Generate the Winning Number

  function generateWinningNumber(){
  	return Math.floor(Math.random() * (100)) + 1;
  }

  var winningNumber = generateWinningNumber();

  // Fetch the Players Guess

  function playersGuessSubmission(){
  	playersGuess = +$('#guess').val();
    $('#guess').val('Try Again!');
    guessesRemaining--;
  }

  // Determine if the next guess should be a lower or higher number

  function lowerOrHigher(){
  	if (playersGuess > winningNumber) {
      return "higher";
    }
    else {
      return "lower";
    }
  }

  function guessMessage() {
    
    var str2 = "";
    
    if (guessesRemaining === 0) {
      $('#feedback').text('');
    }

    else if (playersGuess !== winningNumber && guessesRemaining !== 0) {
      if (Math.abs(playersGuess - winningNumber) > 20) {
        str2 = " more than 20 digits away from the Winning Number";
      }

      else if (10 < Math.abs(playersGuess - winningNumber) < 20) {
        str2 = " within 20 digits of the Winning Number";
      }


      else if (5 < Math.abs(playersGuess - winningNumber) < 10) {
        str2 = " within 10 digits of the Winning Number!";
      }

      else {
        str2 = " within 5 digits of the Winning Number!"
      }
      
      $('#feedback').text('Your guess is ' + lowerOrHigher() + ' and ' + str2);
    }

    for (var i = 0; i < (guessArray.length - 1); i++) {
      if (guessArray[i] === playersGuess) {
        $('#feedback').text("You've already guessed that!");
      }
    }

  }



  // Check if the Player's Guess is the winning number 

  function checkGuess(){
    guessArray.push(playersGuess);
    
    if (guessesRemaining > 0) {
    	if (playersGuess === winningNumber) {
        $('#active').text('You Win!');
        $('#guess').val('');
        $('#feedback').text('');
        $('#winner').addClass('result');
      }
      else {
        $('#active').text(guessesRemaining + " Guesses Remaining");
      }
    }

    else {
      $('#active').text('Better Luck Next Time :(');
      $('#loser').addClass('result');
    }
  }

  // Create a provide hint button that provides additional clues to the "Player"

  function provideHint(){
  	var hintArray = [];
    for (var i = (2 * guessesRemaining - 1); i > 0; i--) {
      var tempNum = Math.floor(Math.random() * (100)) + 1;
      hintArray.push(tempNum);
    }
    hintArray.push(winningNumber);
    hintArray.sort(function(a, b){return a - b;});
    $('#active').text(hintArray.join(', ') + "  (1 of these is the winning number!)");
  }

  // Allow the "Player" to Play Again

  function playAgain(){
    location.reload();	
  }



/* **** Event Listeners/Handlers ****  */
  $(document).ready(function() {
    $('#playerGuess').on('click', function() {
      playersGuessSubmission();
      checkGuess();
      guessMessage();
    });
    $('#guess').on('click', function() {
      $('#guess').val('');
    });
    $('#hint').on('click', provideHint);
    $('#reload').on('click', playAgain);
    $('#guess').keypress(function(e) { 
      if (e.which == 13) {
        $('#playerGuess').click();
        return false;
      }
    });
    $()  
    
  });
}());


  









