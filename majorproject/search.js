console.log("Search Page Connected");

/* RANDOM API */
const randomURL =
"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random?number=6";

/* SEARCH API */
const searchURL =
"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?number=6&query=";

/* API SETTINGS */
const recipeOptions = {
    method: "GET",
    headers: {
        "x-rapidapi-key": "a1c3acf72fmsh4104426e5e5d10fp12ae83jsnb8163d80c7e9",
        "x-rapidapi-host":
        "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
    }
};

/* GET RANDOM MEALS */
async function getRandomMeals() {
    try {
        let response = await fetch(randomURL, recipeOptions);
        let result = await response.json();
        return result;
    } catch(error) {
        console.log(error);
    }
}

/* SEARCH MEALS */
async function searchMeals(searchText) {
    try {
        let response = await fetch(searchURL + searchText, recipeOptions);
        let result = await response.json();
        return result;
    } catch(error) {
        console.log(error);

    }

}

/* DISPLAY RANDOM MEALS */
function displayRandomMeals(mealObject) {
    let mealsGrid = document.querySelector("#mealsGrid");
    /* clear old cards */
    mealsGrid.innerHTML = "";
    /* loop through recipes */
    for(let i = 0; i < mealObject.recipes.length; i++) {
        let meal = mealObject.recipes[i];
        mealsGrid.innerHTML += `
        <div class="mealCard">

            <div class="imageWrapper">
                <img src="${meal.image}" alt="${meal.title}">
            </div>

            <div class="mealInfo">

                <div class="mealName">${meal.title}</div>

                <div class="middleRow">

                    <div class="mealCategory">Recipe</div>

                    <button class="card-add-btn">
                        <span class="material-symbols-outlined">add</span>
                    </button>

                </div>

                <div class="mealMeta">
                    <div class="cookTime">
                        ${meal.readyInMinutes} min
                    </div>
                </div>

            </div>

        </div>

        `;

    }

}

/* DISPLAY SEARCH RESULTS */
function displaySearchMeals(mealObject) {
    let mealsGrid = document.querySelector("#mealsGrid");
    mealsGrid.innerHTML = "";
    for(let i = 0; i < mealObject.results.length; i++) {
        let meal = mealObject.results[i];
        mealsGrid.innerHTML += `

        <div class="mealCard">

            <div class="imageWrapper">
                <img src="${meal.image}" alt="${meal.title}">
            </div>

            <div class="mealInfo">

                <div class="mealName">${meal.title}</div>

                <div class="middleRow">

                    <div class="mealCategory">Search Result</div>

                    <button class="card-add-btn">
                        <span class="material-symbols-outlined">add</span>
                    </button>

                </div>

            </div>

        </div>

        `;

    }

}

/* PAGE LOAD */
document.addEventListener("DOMContentLoaded", function() {
    /* load random meals first */
    getRandomMeals().then(function(result) {
        displayRandomMeals(result);
    });
    /* search input */
    let searchInput = document.querySelector("#searchInput");
    /* typing event */
    searchInput.addEventListener("keyup", function() {
        let searchText = searchInput.value;
        /* if empty show explore meals again */
        if(searchText === "") {
            getRandomMeals().then(function(result) {
                displayRandomMeals(result);
            });
        }

        /* otherwise search */
        else {
            searchMeals(searchText).then(function(result) {
                displaySearchMeals(result);
            });
        }
    });
});