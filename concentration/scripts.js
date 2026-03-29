//javascript for interactive concentration game for 1 player

//new function to flip card when clicked
function flipCard() {
    this.classList.add("clicked");
}

//run this code when the DOM loads
document.addEventListener("DOMContentLoaded", function(e) {

    //get handles to game elements 
    let allCards = document.querySelectorAll(".card");
    let gameBoard = document.querySelector = document.querySelector("#gameBoard");

    //randomize cards by looping through all the games cards
    for (x = 0; x < allCards.length; x++) {
        let randNum = Math.floor(Math.random() * allCards.length);
        gameBoard.insertBefore(allCards[x], gameBoard.children[randNum]);
        
    }


});