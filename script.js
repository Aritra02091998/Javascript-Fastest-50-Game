'use strict';

const score0_element = document.getElementById('score--0');
const score1_element = document.getElementById('score--1');
const diceImageElement = document.querySelector('.dice');

const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');

// Buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Initialisation - assign all scores to 0 , remove dice image
score0_element.textContent = 0;
score1_element.textContent = 0;
let gameBeingPlayed = true;
diceImageElement.classList.add('hidden');

// Track Current Scores
let currentScore = 0
let activePlayer = 0         // Game starts with player 0
let totalScores = [0,0];

// Define a function to switch Player.
const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    // Change the UI of the active player.
    document.querySelector(`.player--0`).classList.toggle('player--active');
    document.querySelector(`.player--1`).classList.toggle('player--active');
    currentScore = 0;
};

// Dice-Rolling
btnRoll.addEventListener('click',function(){
    
    if (gameBeingPlayed){

        // Generate random number 1-6.
        const dice = Math.trunc(Math.random()*6) + 1;
        console.log(dice)

        // Display corresponding dice Image.
        diceImageElement.classList.remove('hidden');
        diceImageElement.src = `dice-${dice}.png`;

        // Switch player if we get 1 in the dice else add dice value to the current score
        if (dice != 1){
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore      // update currentScore dynamically of the current player. 
        }
        else{
            switchPlayer();
        }
    }
});

// Hold the USER score and also check if the user reached score 100 or not.
btnHold.addEventListener('click', function() {

    if (gameBeingPlayed){
        // Update the total score of the active player.
        totalScores[activePlayer] = totalScores[activePlayer] + currentScore;
        
        // Update the total score UI.
        activePlayer === 0 ? score0_element.textContent = totalScores[`${activePlayer}`]:
            score1_element.textContent = totalScores[`${activePlayer}`];

        // Check score reached 100 or not, and declare winner.
        if (totalScores[activePlayer] >= 20){

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            
            // Update game playing status and remove dice image.
            gameBeingPlayed = false;
            diceImageElement.classList.add('hidden');
        }
        else
            // Change the player now.
            switchPlayer();
    }
});


// Reset and start a new game.
btnNew.addEventListener('click', function() {

    // Reset All the variables.
    currentScore = 0
    activePlayer = 0        
    totalScores = [0,0];

    // Change the UI
    score0_element.textContent = 0;
    score1_element.textContent = 0;

    current0EL.textContent = 0;
    current1EL.textContent = 0;

    document.querySelector(`.player--1`).classList.remove('player--winner');
    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--active');
    document.querySelector(`.player--0`).classList.remove('player--active');

    // For the next game set player 0 as the active player.
    document.querySelector(`.player--0`).classList.add('player--active');
    
    // Update game playing status
    gameBeingPlayed = true;

});
