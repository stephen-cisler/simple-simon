$(document).ready(function () {
    "use strict";

    // GAME VARIABLES -------------

    // Array to preserve the random order of boxes generated each game
    var simonSequence = [];

    // Array to hold the order of player guesses each round
    var playerSequence = [];

    // Counter to hold current game round number
    var gameRound = 0;

    // Highest score achieved in current session
    var highScore = 0;

    // Game button jQuery selectors
    var box0 = $('#box-0');
    var box1 = $('#box-1');
    var box2 = $('#box-2');
    var box3 = $('#box-3');
    var gameButtons = [box0, box1, box2, box3];



    // GAME FUNCTIONALITY ---------



    // Starts the Game with click event. Removes Start button so multiple games cannot run simultaneously
    function startGame() {
        $('#button').click(function () {
            $('#button').css('display', 'none');
            simonSequence = [];
            gameRound = 0;
            beginGameRound();
        });
    }

    // Runs each round. Adding another button to remember, click listeners for the player, and calling all logic from other functions
    function beginGameRound() {
        gameRound++;
        updateRound();
        playerSequence = [];
        generateNewChoice();
        showSequence();
        makeBoardInteractive()
    }

    // Generates new random number/box choice to add to simonSequence
    function generateNewChoice() {
        simonSequence.push(Math.floor((Math.random() * 4)));
    }

    // Display simonSequence for player to imitate
    function showSequence() {
        removeClickEventsOnButtons();
        for (var i = 0; i < simonSequence.length; i++) {
            (function(i) {
                setTimeout(function() {
                    console.log(simonSequence[i]);
                    gameButtons[simonSequence[i]].fadeOut( 500, function () {
                        gameButtons[simonSequence[i]].fadeIn( 500, function () {
                        });
                    });
                }, 2000 * i);
            })(i);
        }
    }

    // Removes click events on gameButtons temporarily
    function removeClickEventsOnButtons() {
        gameButtons.forEach(function (element) {
            element.off('click');
        });
    }

    // Starts the player's interactivity with click events on the game buttons
    function makeBoardInteractive() {
        gameButtons.forEach(function (element, index) {
            gameButtons[index].click(function () {
                gameButtons[index].fadeOut( 500, function () {
                    playerSequence.push(index);
                    checkPlayersSequence();
                    gameButtons[index].fadeIn( 500, function () {
                    });
                });
            });
        });
    }

    // Checks to see if Player was correct. If yes, then starts another round. If not, it stops the game and returns the START button for choice to play again
    function checkPlayersSequence() {
        if (playerSequence.length === simonSequence.length) {
            removeClickEventsOnButtons();
            if (compareSequences()) {
                setTimeout(beginGameRound, 1400);
                // addClickEventsToButtons()
            } else {
                showHighScore();
                $('#game-over').css('display', 'block');
                $('#button').css('display', 'block');
            }
        }
    }

    // Determines if the simonSequence and playerSequence match. Returns FALSE if they don't.
    function compareSequences() {
        var playerIsCorrect = true;
        for (var i = 0; i < simonSequence.length; i++) {
            if (playerSequence[i] !== simonSequence[i]) {
                playerIsCorrect = false;
            }
        }
        return playerIsCorrect;
    }

    function updateRound() {
        $('#roundCount').text(gameRound);
    }
    
    function showHighScore() {
        if (highScore < gameRound) {
            highScore = gameRound;
            $('#highScore').text(highScore)
        }
    }



    // INITIALIZING THE GAME

    startGame();
});