//JS for major project
//Recipe API global
const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
	}
});

xhr.open('GET', 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?tags=vegetarian%2Cdessert&number=1');
xhr.setRequestHeader('x-rapidapi-key', 'a1c3acf72fmsh4104426e5e5d10fp12ae83jsnb8163d80c7e9');
xhr.setRequestHeader('x-rapidapi-host', 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com');
xhr.setRequestHeader('Content-Type', 'application/json');

xhr.send(data);

// API URL
const recipeURL =
  "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=1";

// API settings
const recipeOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "YOUR_API_KEY",
    "x-rapidapi-host":
      "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    "Content-Type": "application/json",
  },
};

// get data function
async function getMeal() {
  try {
    const response = await fetch(recipeURL, recipeOptions);

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.log("error");
    }
  } catch (error) {
    console.error(error);
  }
}

// create meal card
function addMealCard(mealObject) {
  console.log(mealObject);

  // get first recipe
  let meal = mealObject.recipes[0];

  // select today section
  let todayScroll = document.querySelector("#todayScroll");

  // remove empty class
  todayScroll.classList.remove("empty");

  // create card
  let card = document.createElement("div");
  card.classList.add("today-card");

  // add HTML inside card
  card.innerHTML = `
  
    <div class="imageWrapper">
        <img src="${meal.image}" alt="${meal.title}">
    </div>

    <span class="meal-type">Meal</span>

    <h3>${meal.title}</h3>

    <p>Ready in ${meal.readyInMinutes} min</p>

    <p>Servings: ${meal.servings}</p>

  `;

  // add card to page
  todayScroll.appendChild(card);
}

// wait for page
document.addEventListener("DOMContentLoaded", function () {
  
  // add button
  let addButton = document.querySelector("#addTodayBtn");

  // click event
  addButton.addEventListener("click", function () {
    
    // fetch meal
    getMeal().then(function (result) {
      addMealCard(result);
    });

  });

});