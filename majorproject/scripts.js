

/* ========= SEARCH FUNCTION ========= */
const searchInput = document.querySelector(".search-bar input");
const mealCards = document.querySelectorAll(".mealCard");

if (searchInput) {
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();


        mealCards.forEach(card => {
            const name = card.querySelector(".mealName").textContent.toLowerCase();

            if (name.includes(query)) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    });


}

/* ========= NAVBAR ACTIVE STATE ========= */
const navLinks = document.querySelectorAll(".bottom-nav a");

navLinks.forEach(link => {
    const href = link.getAttribute("href");


    if (window.location.pathname.includes(href)) {
        link.querySelector(".nav-icon").classList.add("active");
    }


});

/* ========= CALENDAR SYSTEM ========= */
const calendarGrid = document.getElementById("calendarGrid");
const monthLabel = document.getElementById("monthLabel");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

if (calendarGrid) {


    let currentDate = new Date();

    function renderCalendar(date) {
        calendarGrid.innerHTML = "";

        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDay = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();

        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        monthLabel.textContent = `${monthNames[month]} ${year}`;

        // Empty slots
        for (let i = 0; i < firstDay; i++) {
            const empty = document.createElement("div");
            empty.classList.add("day-card", "empty");
            calendarGrid.appendChild(empty);
        }

        // Days
        for (let i = 1; i <= totalDays; i++) {
            const day = document.createElement("div");
            day.classList.add("day-card");

            day.innerHTML = `<p class="date">${i}</p>`;

            // Demo meal (optional)
            if (Math.random() > 0.75) {
                const meal = document.createElement("span");
                meal.classList.add("meal-pill");
                meal.textContent = "Meal";
                day.appendChild(meal);
            }

            calendarGrid.appendChild(day);
        }
    }

    renderCalendar(currentDate);

    prevBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextBtn.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });


    /* ========= ADD MEAL ON CLICK ========= */
    calendarGrid.addEventListener("click", (e) => {
        const dayCard = e.target.closest(".day-card");

        if (!dayCard || dayCard.classList.contains("empty")) return;

        const mealName = prompt("Enter meal for this day:");

        if (mealName) {
            const pill = document.createElement("span");
            pill.classList.add("meal-pill");
            pill.textContent = mealName;

            dayCard.appendChild(pill);
        }
    });


}

/* ========= PROFILE BUTTON ========= */
const editBtn = document.querySelector(".edit-btn");

if (editBtn) {
    editBtn.addEventListener("click", () => {
        alert("Edit profile feature coming soon!");
    });
}
