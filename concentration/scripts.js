//javascript for inter

console.log("JS LOADED!")


//new function to flip card when clicked
function flipCard() {
    this.classList.add("clicked");
    console.log("clicked!")
}

//run this code when the DOM loads

document.addEventListener("DOMContentLoaded", function() {

    let allCards = document.querySelectorAll(".card");
    let gameBoard = document.querySelector("#gameBoard");

    for (let x = 0; x < allCards.length; x++) {
        let randNum = Math.floor(Math.random() * allCards.length);
        gameBoard.insertBefore(allCards[x], gameBoard.children[randNum]);

        allCards[x].addEventListener("click", flipCard);
    }

}); 