//javascript for inter

console.log("JS LOADED!")

//clear clicked classes
function clearClicks() {
    let allClickedCards = document.querySelectorAll(".clicked");
    for(let eachCard of allClickedCards) {
        eachCard.classList.remove("clicked");
    }
}

//new function to flip card when clicked
function flipCard() {

    //get all the clicked card loaded
    let allClickedCards = document.querySelectorAll(".clicked");

    //only proceed if all there are less than two cards
    if (allClickedCards.length < 2) {

        //add clicked class to clicked card
        this.classList.add("clicked");
        console.log("clicked!")

    }
    
    //get a fresh list of clicked cards
    allClickedCards = document.querySelectorAll(".clicked");
    
    if (allClickedCards.length == 2) {

        //get the class list of each card as a string
        let card1 = allClickedCards[0].classList.toString();
        let card2 = allClickedCards[1].classList.toString();

        //if the class list matches -- its a pair -- else -- its not a pait
        if (card1 == card2) {
            console.log("a match");
            allClickedCards[0].classList.add("matched");
            allClickedCards[1].classList.add("matched");
            window.setTimeout(clearClicks, 2000);
            console.log("transition complete");

        } else {
            console.log("not a match");
        }

    }
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