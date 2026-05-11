//JS for major project
//Recipe API global
console.log("JS Connected");

// API URL
const recipeURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=4";
// API settings
const recipeOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "a1c3acf72fmsh4104426e5e5d10fp12ae83jsnb8163d80c7e9",
    "x-rapidapi-host":
      "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    "Content-Type": "application/json",
  }
};

// get data function
async function getMeal() {
  try {
    const response = await fetch(recipeURL, {
      ...recipeOptions,
      credentials: "omit"
    });

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

  let meal = mealObject.recipes[0];   // get first recipe
  let todayScroll = document.querySelector("#todayScroll");   // select today section
  todayScroll.classList.remove("empty");   // remove empty class

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

// loading the DOM
document.addEventListener("DOMContentLoaded", function () {
  // add button
  let addButton = document.querySelector("#addTodayBtn");
  // click event
  addButton.addEventListener("click", function () {
    getMeal().then(function (result) {
      addMealCard(result);
    });
  });

  // recommended meals
  getMeal().then(function (result) {
    addRecommendedMeal(result);
  });
});

// create recommended meal card
function addRecommendedMeal(mealObject) {
  let mealsGrid = document.querySelector("#mealsGrid");
  // loop through recipes
  for (let i = 0; i < mealObject.recipes.length; i++) {
    let meal = mealObject.recipes[i];
    let card = document.createElement("div");
    card.classList.add("homeMealCard");
    card.innerHTML = `
            <div class="imageWrapper">
                <img src="${meal.image}" alt="${meal.title}">
            </div>

            <div class="mealName">${meal.title}</div>

            <div class="mealCategory">Recipe</div>

            <div class="kCal">
                Ready in ${meal.readyInMinutes} min
            </div>

            <div class="cookTime">
                Servings: ${meal.servings}
            </div>

            <button class="card-add-btn">
                <span class="material-symbols-outlined">add</span>
            </button>

        `;
    mealsGrid.appendChild(card);
  }
}