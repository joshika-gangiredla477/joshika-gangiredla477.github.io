//javascript for interactive conecentration

//track number of clicks
let playerClicks = 0;
let timeDelay = 1000; 



//clear clicked classes
function clearClicks() {
    let allClickedCards = document.querySelectorAll(".clicked");
    for (let eachCard of allClickedCards) {
        eachCard.classList.remove("clicked");
    }

         //increase player turn count by 1
        playerClicks++;
        document.querySelector("#turnCount span").innerHTML = playerClicks;

        //check for winning
        let allCards = document.querySelectorAll(".card");
        let matchedCards = document.querySelectorAll(".matched");
        if (allCards.length == matchedCards.length) {
            //player matched all cards
           
             if (allCards.length == matchedCards.length) {
                document.querySelector("#winPopup").style.display = "flex";
         }


        }

}




//new function to flip cards when clicked

function flipCard() {

    if (!this.classList.contains("matched")) {


        //get all the clicked cards
        let allClickedCards = document.querySelectorAll(".clicked");

        //only proceed if there are less than two clicks
        if (allClickedCards.length < 2) {
            //add clicked class to clicked card
            this.classList.add("clicked");

        }

        //get a fresh list of the clicked cards
        allClickedCards = document.querySelectorAll(".clicked");

        //if it's a pair; compare them
        if (allClickedCards.length == 2) {



            //get the class list of each card as a string
            let card1 = allClickedCards[0].classList.toString();
            let card2 = allClickedCards[1].classList.toString();

            //if the class lists match -- its a match; if not --  its not a match
            if (card1 == card2) {
                console.log("its a match.");
                allClickedCards[0].classList.add("matched");
                allClickedCards[1].classList.add("matched");
                window.setTimeout(clearClicks, timeDelay);


            } else {
                console.log("it's not a match.")
                window.setTimeout(clearClicks, timeDelay);
            }
        }
    }

}



//run this code whent the dom loads
document.addEventListener("DOMContentLoaded", function (e) {

    //get handles to game elements
    let allCards = document.querySelectorAll(".card");
    let gameboard = document.querySelector("#gameBoard");

    //randomize cards by looping through all the cards
    for (x = 0; x < allCards.length; x++) {
        let randNum = Math.floor(Math.random() * allCards.length);
        gameboard.insertBefore(allCards[x], gameboard.children[randNum]);

        allCards[x].addEventListener("click", flipCard);
    }

})