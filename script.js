'use strict';

var scores, roundScore, activePlayer, gamePlaying, PrevDice;
var currentScore0 = document.getElementById('current--0');
var currentScore1 = document.getElementById('current--1');
var score0 = document.getElementById('score--0');
var score1 = document.getElementById('score--1');
var dice = document.querySelector('.dice');

init()



document.querySelector('.btn--roll').addEventListener('click', function () {
    if(gamePlaying){
        //generate random values
        var dice = Math.floor(Math.random() * 6) + 1;

        // display the dice showing the random values
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block'
        diceDOM.src = `dice-${dice}.png`
        // update the current store if 1 is not rolled by the user.
        if(dice === 6 && PrevDice === 6){
            //Player loses global score
            scores[activePlayer] = 0
            document.querySelector(`#score--${activePlayer}`).textContent = '0'
            document.querySelector(`#current--${activePlayer}`).textContent = '0'
            nextPlayer()
        }else if(dice !== 1){
            roundScore += dice
            document.querySelector(`#current--${activePlayer}`).textContent = roundScore;
        } else {
            nextPlayer()
            
        }

        PrevDice = dice
    }
    
})

document.querySelector('.btn--hold').addEventListener('click', function () {
    if(gamePlaying){
        // Add current score to the global score
        scores[activePlayer] += roundScore;
        // Update the UI
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer]

        // Check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector(`#name--${activePlayer}`).textContent = 'Winner!!!'
            document.querySelector('.dice').style.display = 'none'
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
            gamePlaying = false
        }
        else{
            nextPlayer()
        }
    } 
})

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    roundScore = 0 

    // reset the current score back to 0
    currentScore0.textContent = '0'
    currentScore1.textContent = '0'

    // Change the active style when switching players
    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');

    // Remove the dice image when a player gets 1
    document.querySelector('.dice').style.display = 'none'
}

document.querySelector('.btn--new').addEventListener('click' , init)

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    score0.textContent = '0'
    score1.textContent = '0'
    currentScore0.textContent = '0'
    currentScore1.textContent = '0'
    dice.style.display = 'none';

    document.querySelector(`#name--0`).textContent = 'Player 1'
    document.querySelector(`#name--1`).textContent = 'Player 2'

    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');

    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--active');

    document.querySelector('.player--0').classList.add('player--active');

}