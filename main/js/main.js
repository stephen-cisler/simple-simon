$(document).ready(function () {
    "use strict";

    // GAME VARIABLES -------------

    // Array to preserve the random order of boxes generated each game
    var simonSequence = [];

    // Array to hold the order of player guesses each round
    var playerGuesses = [];

    // Counter to hold current game round number
    var gameRound = 0;

    // Game button jQuery selectors
    var box0 = $('#box-0');
    var box1 = $('#box-1');
    var box2 = $('#box-2');
    var box3 = $('#box-3');
    var gameButtons = [box0, box1, box2, box3];

    // GAME FUNCTIONALITY ---------


    var testSequence = [0,3,0,2,1,3,0,1];

    // Display simonSequence for player to imitate
    function showSequence() {
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




    // Random number between 1 and 4
    function getRandomChoice() {
        return Math.floor((Math.random() * 4));
    }

    function generateNewChoice() {
        simonSequence.push(getRandomChoice());
    }

    // Adds click-listener to each button using each's index in the gameButton array
    function addClickEventsToButtons(num) {
        gameButtons[num].click(function () {
            gameButtons[num].fadeOut( 500, function () {
                playerGuesses.push(num);
                if (playerGuesses.length === simonSequence.length) {
                    removeClickEventsOnButtons();
                }
                gameButtons[num].fadeIn( 500, function () {
                });
            });
        });
    }

    function removeClickEventsOnButtons() {
        gameButtons.forEach(function (element, index) {
            element.off('click');
        });
    }

    // function time() {
    //     setTimeout(function () {
    //         console.log("waiting for player")
    //     }, 5000)
    // }

    // var width = 0;
    // var id = setInterval(frame, 10);
    // function frame() {
    //     if (width == 100) {
    //         clearInterval(id);
    //     } else {
    //         width++;
    //         elem.style.width = width + '%';
    //     }
    // }
        var gameInProgress = true;

    // Waits for player to pick
    var waiting = setInterval(function () {
        console.log("waiting for player");
        if (playerGuesses.length === simonSequence.length) {
            // removeClickEventsOnButtons();
            clearInterval(waiting);
            for (var i = 0; i < simonSequence.length; i++) {
                if (playerGuesses[i] !== simonSequence[i]) {
                    console.log("game over");
                    gameInProgress = false;
                }
            }
        }
    }, 1000);

    // ForEach to apply listeners

    // make the button disappear after being activated
    $('#button').click(function () {
        $('#button').css('display', 'none');
        startGame();
    });

    function startGame() {
        // while (true) {

            generateNewChoice();
            console.log("current sequence is " + simonSequence);
            showSequence();
            gameButtons.forEach(function (element, index) {
                addClickEventsToButtons(index);
            });

            // while (playerGuesses.length < simonSequence.length) {
            // }


        // }
    }
});