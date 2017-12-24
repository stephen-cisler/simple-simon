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

    // Adds click-listener to each button using each's index in the gameButton array
    function addClickEventsToButtons(num) {
        gameButtons[num].click(function () {
            gameButtons[num].fadeOut( 500, function () {
                playerGuesses.push(num);
                gameButtons[num].fadeIn( 500, function () {
                });
            });
        });
    }

    // ForEach to apply listeners
    gameButtons.forEach(function (element, index) {
       addClickEventsToButtons(index);
    });

});