// *** Game Variables ***

var squareIdList = ["#green-square", "#red-square", "#yellow-square", "#blue-square"]

var pattern = [] // generated via the patternGenerator function.

var i = 0;

var clickCount = -1;

var animate = true;

var numCorrect = 0;

var guessCount = 0

// *** Sound Effects ***

var correctSounds = ["pop1.mp3", "pop2.mp3"]

function correctSoundEffect() {

  var randomNumber = Math.floor(((Math.random() * correctSounds.length)));

  var correctSound = new Audio("sounds/" + correctSounds[randomNumber]);

  correctSound.play();
}

function incorrectSoundEffect() {
  var incorrect = new Audio("sounds/incorrect.mp3");

  incorrect.play();
}

// *** Game Functions ***

function patternGenerator() {

  selection = Math.floor(((Math.random() * 4)));

  // converts the random number to a square ID and adds it the the pattern list
  // you therefore must use patternGenerator() to add to the pattern list
  pattern.push(squareIdList[selection]);

}

function showPattern() {

  guessCount = 0;

  $("#guessToPatternRatio").html( guessCount + " / " + pattern.length);

  if (animate == true) {

  $(".blockerDiv").removeClass("hidden");

  setTimeout(function() {

    $(pattern[i]).animate({
      opacity: "0.5",
      height: "250",
      width: "250"
    }, 400).animate({
      opacity: "1",
      height: "200",
      width: "200"
    }, 400);

    i++;

    if (i < pattern.length) {

      showPattern();
      // recursion function:
      // A recursive function is a function defined in terms of itself via self-referential expressions.
      // This means that the function will continue to call itself and repeat its behavior until
      // some condition is met to return a result.


    } else {

      $(".blockerDiv").addClass("hidden");

        i = 0; // before showing the pattern it will reset the previos count to 0
      //$(".blockerDiv").toggleClass("hidden");

    }
  }, 1000) // time delay from setTimeout function

}
}

function userInput() {

  $(".square").click(function(event) {

    guessCount++

    $("#guessToPatternRatio").html( guessCount + " / " + pattern.length);

    clickCount++;

    if ('#' + event.target.id == pattern[clickCount]) {
      correctInput();

      if (clickCount == pattern.length - 1) {
        clickCount = -1 // reset the click count if it is the last check

        setTimeout(function(){

        patternGenerator();

        showPattern();

      }, 1000)

      setTimeout(function() {

      $("#guessToPatternRatio").animate({
        opacity: "0.5",
      }, 150).animate({
        opacity: "1",
      }, 150).animate({
        opacity: "0.5",
      }, 150).animate({
        opacity: "1",
      }, 150);

    }, 400)

      }

    } else {
      incorrectInput();

    }
  })

}



function incorrectInput() {
  animate = false;

  incorrectSoundEffect();

  $(".wrongInputMsgDiv").toggleClass("hidden");

  setTimeout(function() {
    $(".wrongInputMsgDiv").toggleClass("hidden");
  }, 500)

  $("#levelDisplay").text("GAME OVER");

  setTimeout(function() {
    $(".restartDiv").toggleClass("hidden");
  }, 500);

$("#restartGame").one('click', function() {

  $(".restartDiv").toggleClass("hidden");

  restart();

})

$("#endGame").one('click', function(event) {

endGame();

})
}

function correctInput() {

  correctSoundEffect();

  $(".correctInputMsgDiv").toggleClass("hidden");

  setTimeout(function() {
    $(".correctInputMsgDiv").toggleClass("hidden");
  }, 400);

  numCorrect++

  $("#numberOfCorrectInputs").html("Correct in a row: " + numCorrect);

}

function restart() {
    // resetting all variables to original state
    pattern = [];
    userPattern = [];
    i = 0;
    clickCount = -1;
    animate = true;
    numCorrect = 0;

    $("#numberOfCorrectInputs").html("Correct in a row: " + numCorrect);

    $("#guessToPatternRatio").html( guessCount + " / " + pattern.length);

    $("#levelDisplay").text("Simon Says!");

    patternGenerator();
    showPattern();

}

function endGame() {
    $(".blockerDiv").removeClass("hidden");

    $(".restartDiv").toggleClass("hidden");

    $("#levelDisplay").text("Thanks for Playing!");


}


// *** Game Visuals ***

// Opacity Decrease on Squares on Cursor Hover

$(".square").hover(function(event) {
    $("#" + event.target.id).css("opacity", "0.5");
  },
  function(event) {
    $("#" + event.target.id).css("opacity", "1");
  })

// Colour change on YES / NO of restart options on Cursor Hover

$("#restartGame").hover(function(event) {
    $("#" + event.target.id).css("color", "grey");
    $("#continueText").css("color", "#4E9F3D");
  },
  function(event) {
    $("#" + event.target.id).css("color", "#D98C00");
    $("#continueText").css("color", "#D98C00");
  })

$("#endGame").hover(function(event) {
    $("#" + event.target.id).css("color", "grey");
    $("#continueText").css("color", "#FF0000");
  },
  function(event) {
    $("#" + event.target.id).css("color", "#D98C00");
    $("#continueText").css("color", "#D98C00");
  })

// *** GAME START ***

function startGame() {

patternGenerator(); // generates the first number in the pattern list randomly (between 0 and 3)

showPattern(); // shows the user the pattern using square animations

// seems to be always listening for the users clicks..
userInput(); // Checks if the input was correct and returns true or false.

}

startGame();

// setTimeout(function() {
//
// $("#guessToPatternRatio").animate({
//   opacity: "0.5",
// }, 200).animate({
//   opacity: "1",
// }, 200).animate({
//   opacity: "0.5",
// }, 200).animate({
//   opacity: "1",
// }, 200);
//
// }, 1000)
