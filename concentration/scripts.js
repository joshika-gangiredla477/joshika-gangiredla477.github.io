//javascript for interactive concentration game for 1 player

//run this code when the DOM loads
document.addEventListener("DOMContentLoaded", function(e) {

    //randomize cards
    let allCards = document.querySelectorAll(".card");
    let gameBoard = document.querySelector = document.querySelector("#");

    //loop through all the cards
    for (x = 0; x < allCards.length; x++) {
        let randNum = Math.floor(Math.random() * allCards.length);
        gameBoard.insertBefore(allCards[x], gameboard.children[randNum]);
        
    }


});