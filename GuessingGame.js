//LINES 1-16
//generate a number between 1 and 100
function generateWinningNumber(){
  var winningNum = Math.floor(Math.random() * 100 + 1);
  if (winningNum === 0){
    winningNum = 1;
  }
  return winningNum;
  //LINE 13-14 in specs: why does it expect Math.ceil(.63000 * 100) to '=' 64?
}

//LINES 18-41
//shuffle function
function shuffle(array) {
  var m = array.length, t, i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}


//LINES 43-198
//Game Constructor Function
function Game (){
  this.playersGuess = null;
  this.pastGuesses = [];
  this.winningNumber = generateWinningNumber();
}

//LINES 65-163
//Methods on Game Constructor Function's Prototype
Game.prototype.difference = function (){
  return Math.abs(this.playersGuess - this.winningNumber);
};
Game.prototype.isLower = function (){
  if (this.playersGuess < this.winningNumber){
    return true;
  }else{
    return false;
  }
};
//LINES 88-113
Game.prototype.playersGuessSubmission = function (guess){
  if (guess <= 0 || guess > 100 || typeof guess !== 'number'){
    throw "That is an invalid guess.";
  }else{
    this.playersGuess = guess;
    return this.checkGuess();
  }
};

Game.prototype.checkGuess = function (){
  if (this.playersGuess === this.winningNumber){
    return 'You Win!';
  }else if (this.pastGuesses.indexOf(this.playersGuess) !== -1){
    return 'You have already guessed that number.';
  }else {
    this.pastGuesses.push(this.playersGuess);

    if (this.pastGuesses.length === 5){
      return 'You Lose.';
    }
    else if (this.difference() < 10){
      return 'You\'re burning up!';
    }
    else if (this.difference() < 25){
      return 'You\'re lukewarm.';
    }
    else if (this.difference() < 50){
      return 'You\'re a bit chilly.';
    }
    else if (this.difference() < 100){
      return 'You\'re ice cold!';
    }
  }
};

//LINES 165-173
//newGame function returns an empty new game instance
function newGame (){
  return new Game();
}

//LINES 175-194
//provide hint funcion generates an array of 3 hint numbers
Game.prototype.provideHint = function (){
  var arr = [this.winningNumber, generateWinningNumber(), generateWinningNumber()];
  return shuffle(arr);
};

$(document).ready(function (){
  $('#submit').on('click', 'button', function (){
    console.log('submit button was clicked');
  });
});
