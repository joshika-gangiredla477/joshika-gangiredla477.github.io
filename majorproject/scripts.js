//JS for major project
const API_KEY   = 'a1c3acf72fmsh4104426e5e5d10fp12ae83jsnb8163d80c7e9';
const API_HOST  = 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';
const BASE_URL  = `https://${API_HOST}`;
 
// ── Storage helpers ──────────────────────────────────────────────────────────
 
function getTodayKey() {
  const d = new Date();
  return `meals-${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}
 
function loadTodayMeals() {
  try {
    return JSON.parse(localStorage.getItem(getTodayKey())) || [];
  } catch {
    return [];
  }
}
 
function saveTodayMeals(meals) {
  localStorage.setItem(getTodayKey(), JSON.stringify(meals));
}
 
// ── Today's Plan ─────────────────────────────────────────────────────────────
 
function renderTodayScroll() {
  const scroll = document.getElementById('todayScroll');
  if (!scroll) return;
 
  const meals = loadTodayMeals();
 
  if (meals.length === 0) {
    scroll.innerHTML = `<p style="font-size:0.85rem;color:#6b7280;padding:4px 0;">
      No meals planned yet — add one below!
    </p>`;
    return;
  }
 
  scroll.innerHTML = meals.map((meal, i) => `
    <div class="today-card" data-index="${i}">
      <img src="${meal.image || 'https://via.placeholder.com/140x140?text=Meal'}"
           alt="${meal.name}"
           onerror="this.src='https://via.placeholder.com/140x140?text=Meal'">
      <h3>${meal.name}</h3>
      <p>${meal.kcal ? meal.kcal + ' kcal' : ''}</p>
      <button class="remove-btn" data-index="${i}"
        style="margin-top:6px;font-size:0.7rem;background:#fee2e2;border:1px solid #141414;
               border-radius:8px;padding:3px 8px;cursor:pointer;">
        Remove
      </button>
    </div>
  `).join('');
 
  // Remove buttons
  scroll.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index, 10);
      const meals = loadTodayMeals();
      meals.splice(idx, 1);
      saveTodayMeals(meals);
      renderTodayScroll();
    });
  });
}
 
function addMealToToday(meal) {
  const meals = loadTodayMeals();
 
  // Avoid exact duplicates
  if (meals.some(m => m.name === meal.name)) {
    showToast(`"${meal.name}" is already in today's plan.`);
    return;
  }
 
  meals.push(meal);
  saveTodayMeals(meals);
  renderTodayScroll();
  showToast(`Added "${meal.name}" to today's plan!`);
}
 
// ── Spoonacular API ───────────────────────────────────────────────────────────
 
async function fetchRandomMeals(number = 4) {
  const url = `${BASE_URL}/recipes/random?number=${number}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': API_HOST,
    },
  };
 
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  return data.recipes || [];
}
 
function buildMealObject(recipe) {
  // Pull kcal from nutrients if available
  const nutrients = recipe.nutrition?.nutrients || [];
  const calNutrient = nutrients.find(n => n.name === 'Calories');
  const kcal = calNutrient ? Math.round(calNutrient.amount) : null;
 
  // Diet label
  let category = 'General';
  if (recipe.vegetarian)  category = 'Vegetarian';
  if (recipe.vegan)       category = 'Vegan';
  if (recipe.glutenFree)  category = 'Gluten-Free';
 
  return {
    id:       recipe.id,
    name:     recipe.title,
    image:    recipe.image,
    kcal:     kcal,
    category: category,
    time:     recipe.readyInMinutes ? `${recipe.readyInMinutes} min` : null,
  };
}
 
// ── Recommended Section ───────────────────────────────────────────────────────
 
function buildRecommendedCard(meal) {
  return `
    <div class="homeMealCard" data-id="${meal.id}">
      <div class="imageWrapper">
        <img src="${meal.image}" alt="${meal.name}"
             onerror="this.src='https://via.placeholder.com/230x150?text=Meal'">
      </div>
      <div class="mealName">${meal.name}</div>
      <div class="mealCategory">${meal.category}</div>
      <div class="kCal">${meal.kcal ? 'kCal: ' + meal.kcal : ''}</div>
      <div class="cookTime">${meal.time ? 'Time: ' + meal.time : ''}</div>
      <button class="card-add-btn" aria-label="Add ${meal.name}">
        <span class="material-symbols-outlined">add</span>
      </button>
    </div>
  `;
}
 
async function loadRecommended() {
  const grid = document.getElementById('mealsGrid');
  if (!grid) return;
 
  // Show skeleton state
  grid.innerHTML = `<p style="padding:16px;color:#6b7280;font-size:0.9rem;">
    Loading recommendations…
  </p>`;
 
  try {
    const recipes = await fetchRandomMeals(4);
    const meals   = recipes.map(buildMealObject);
 
    if (meals.length === 0) {
      grid.innerHTML = `<p style="padding:16px;color:#6b7280;">No meals found.</p>`;
      return;
    }
 
    grid.innerHTML = meals.map(buildRecommendedCard).join('');
 
    // Attach add buttons
    grid.querySelectorAll('.card-add-btn').forEach((btn, i) => {
      btn.addEventListener('click', () => addMealToToday(meals[i]));
    });
 
  } catch (err) {
    console.error('Failed to load recommended meals:', err);
    // Fall back to the static cards already in HTML (don't wipe the grid)
    grid.innerHTML = `<p style="padding:16px;color:#e11d48;font-size:0.85rem;">
      Could not load recommendations. Check your connection.
    </p>`;
 
    // Re-attach add buttons on the static fallback cards
    attachStaticCardButtons();
  }
}
 
// Fallback: wire up the static HTML cards when the API fails
function attachStaticCardButtons() {
  document.querySelectorAll('.homeMealCard .card-add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card  = btn.closest('.homeMealCard');
      const name  = card.querySelector('.mealName')?.textContent.trim() || 'Meal';
      const image = card.querySelector('img')?.src || '';
      const kcalEl = card.querySelector('.kCal')?.textContent.replace('kCal: ', '').trim();
      addMealToToday({ name, image, kcal: kcalEl || null, category: '' });
    });
  });
}
 
// ── Manual-Add Modal ──────────────────────────────────────────────────────────
 
function createModal() {
  // Don't double-create
  if (document.getElementById('addMealModal')) return;
 
  const modal = document.createElement('div');
  modal.id = 'addMealModal';
  modal.style.cssText = `
    display:none;position:fixed;inset:0;z-index:1000;
    background:rgba(0,0,0,0.45);
    justify-content:center;align-items:flex-end;
  `;
 
  modal.innerHTML = `
    <div style="
      background:#f8f8f8;
      border:2px solid #141414;
      border-radius:20px 20px 0 0;
      padding:24px 20px 32px;
      width:100%;
      max-width:480px;
      animation:slideUp 0.25s ease;
    ">
      <style>
        @keyframes slideUp {
          from { transform:translateY(100%); }
          to   { transform:translateY(0); }
        }
      </style>
 
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;">
        <h2 style="font-size:1.2rem;">Add a Meal</h2>
        <button id="closeModal" style="
          background:none;border:none;font-size:1.4rem;cursor:pointer;line-height:1;
        ">✕</button>
      </div>
 
      <div style="display:flex;flex-direction:column;gap:12px;">
        <input id="modalMealName" type="text" placeholder="Meal name *"
          style="border:2px solid #141414;border-radius:10px;padding:10px 12px;font-size:0.95rem;width:100%;">
 
        <input id="modalKcal" type="number" placeholder="Calories (optional)"
          style="border:2px solid #141414;border-radius:10px;padding:10px 12px;font-size:0.95rem;width:100%;">
 
        <input id="modalCategory" type="text" placeholder="Category (e.g. Vegetarian)"
          style="border:2px solid #141414;border-radius:10px;padding:10px 12px;font-size:0.95rem;width:100%;">
 
        <button id="modalSubmit" style="
          background:#7d4bda;color:#f8f8f8;
          border:2px solid #141414;border-radius:12px;
          padding:12px;font-size:1rem;font-weight:600;
          cursor:pointer;margin-top:4px;
        ">Add to Today's Plan</button>
      </div>
    </div>
  `;
 
  document.body.appendChild(modal);
 
  // Close handlers
  document.getElementById('closeModal').addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
 
  // Submit
  document.getElementById('modalSubmit').addEventListener('click', () => {
    const name     = document.getElementById('modalMealName').value.trim();
    const kcal     = document.getElementById('modalKcal').value.trim();
    const category = document.getElementById('modalCategory').value.trim();
 
    if (!name) {
      document.getElementById('modalMealName').style.borderColor = '#e11d48';
      return;
    }
 
    addMealToToday({
      name,
      kcal: kcal || null,
      category: category || 'Custom',
      image: '',
    });
    closeModal();
  });
}
 
function openModal() {
  const modal = document.getElementById('addMealModal');
  if (!modal) return;
  // Reset fields
  document.getElementById('modalMealName').value = '';
  document.getElementById('modalKcal').value     = '';
  document.getElementById('modalCategory').value = '';
  document.getElementById('modalMealName').style.borderColor = '#141414';
  modal.style.display = 'flex';
}
 
function closeModal() {
  const modal = document.getElementById('addMealModal');
  if (modal) modal.style.display = 'none';
}
 
// ── Toast Notification ────────────────────────────────────────────────────────
 
function showToast(msg) {
  const existing = document.getElementById('mealToast');
  if (existing) existing.remove();
 
  const toast = document.createElement('div');
  toast.id = 'mealToast';
  toast.textContent = msg;
  toast.style.cssText = `
    position:fixed;bottom:90px;left:50%;transform:translateX(-50%);
    background:#141414;color:#f8f8f8;
    padding:10px 18px;border-radius:999px;
    font-size:0.85rem;z-index:2000;
    white-space:nowrap;
    animation:fadeInOut 2.8s ease forwards;
  `;
 
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInOut {
      0%   { opacity:0; transform:translateX(-50%) translateY(10px); }
      15%  { opacity:1; transform:translateX(-50%) translateY(0); }
      75%  { opacity:1; }
      100% { opacity:0; }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(toast);
 
  setTimeout(() => toast.remove(), 3000);
}
 
// ── Init ──────────────────────────────────────────────────────────────────────
 
document.addEventListener('DOMContentLoaded', () => {
  // Today's plan
  renderTodayScroll();
 
  // + button opens modal
  const addTodayBtn = document.getElementById('addTodayBtn');
  if (addTodayBtn) {
    createModal();
    addTodayBtn.addEventListener('click', openModal);
  }
 
  // Recommended meals from API
  loadRecommended();
});