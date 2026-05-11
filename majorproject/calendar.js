console.log("Calendar JS Loaded");

// API 
const recipeURL =
  "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?number=5";

const recipeOptions = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "a1c3acf72fmsh4104426e5e5d10fp12ae83jsnb8163d80c7e9",
    "x-rapidapi-host":
      "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
  },
};

// STATE (simple variables)

let currentDate = new Date();
let selectedDate = null;

// popup elements
let popup;
let popupInput;
let popupResults;

// FETCH MEALS
async function getMeals(query = "") {
  try {
    let url = recipeURL;

    if (query !== "") {
      url += "&query=" + query;
    }

    const response = await fetch(url, recipeOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("API error:", error);
  }
}


// CALENDAR RENDER

function renderCalendar() {
  const calendarGrid = document.querySelector("#calendarGrid");
  const monthLabel = document.querySelector("#monthLabel");

  calendarGrid.innerHTML = "";

  let year = currentDate.getFullYear();
  let month = currentDate.getMonth();

  let firstDay = new Date(year, month, 1).getDay();
  let daysInMonth = new Date(year, month + 1, 0).getDate();

  monthLabel.innerText = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  // empty boxes before month starts
  for (let i = 0; i < firstDay; i++) {
    let empty = document.createElement("div");
    empty.classList.add("day-card", "empty");
    calendarGrid.appendChild(empty);
  }

  // create days
  for (let i = 1; i <= daysInMonth; i++) {
    let day = document.createElement("div");
    day.classList.add("day-card");

    let date = document.createElement("p");
    date.classList.add("date");
    date.innerText = i;

    day.appendChild(date);

    // today highlight
    let today = new Date();
    if (
      i === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      day.classList.add("active");
    }

    // click select day
    day.addEventListener("click", function () {
      selectedDate = { day: i, month, year };

      document.querySelector(
        ".plan-header h3"
      ).innerText = `${month + 1}/${i}/${year}`;

      // highlight selected
      document.querySelectorAll(".day-card").forEach((d) => {
        d.classList.remove("active");
      });

      day.classList.add("active");
    });

    calendarGrid.appendChild(day);
  }
}


// MONTH BUTTONS

function setupMonthButtons() {
  document.querySelector("#prevMonth")
  document.addEventListener("click", function () {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
    });

  document.querySelector("#nextMonth")
  document.addEventListener("click", function () {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
    });
}


// POPUP OPEN/CLOSE

function openPopup() {
  popup.classList.remove("hidden");
}

function closePopup() {
  popup.classList.add("hidden");
  popupResults.innerHTML = "";
  popupInput.value = "";
}


// SHOW SEARCH RESULTS
function showMeals(data) {
  popupResults.innerHTML = "";

  let meals = data.results;

  for (let i = 0; i < meals.length; i++) {
    let meal = meals[i];

    let div = document.createElement("div");
    div.classList.add("mealCard");

    div.innerHTML = `
      <p>${meal.title}</p>
      <button class="selectMeal">
        <span class="material-symbols-outlined">add</span>
      </button>
    `;

    // add to calendar day
    div.querySelector("button").addEventListener("click", function () {
      addMealToDay(meal.title);
      closePopup();
    });

    popupResults.appendChild(div);
  }
}


// ADD MEAL TO CALENDAR DAY

function addMealToDay(mealName) {
  let planList = document.querySelector(".plan-list");

  let item = document.createElement("div");
  item.classList.add("plan-item");

  item.innerHTML = `
    <div>
      <p class="plan-label">Meal</p>
      <h4>${mealName}</h4>
    </div>
  `;

  planList.appendChild(item);
}



document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM ready");

  // popup elements
  popup = document.querySelector("#mealPopup");
  popupInput = document.querySelector("#popupInput");
  popupResults = document.querySelector("#popupResults");

  // render calendar
  renderCalendar();
  setupMonthButtons();

  // open popup
  document.querySelector(".add-btn");
  document.addEventListener("click", function () {
    openPopup();
  });

  // close popup
  document
    .querySelector("#closePopup")
    .addEventListener("click", closePopup);

  // search meals
  document
    .querySelector("#popupSearchBtn")
    .addEventListener("click", async function () {
      let query = popupInput.value;
      let data = await getMeals(query);
      showMeals(data);
    });
});