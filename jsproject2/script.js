// const searchBtn = document.getElementById('search-btn');
// const mealList = document.getElementById('meal');
// const mealDetailsContent = document.querySelector('.meal-details-content');
// const recipeCloseBtn = document.getElementById('recipe-close-btn');

// let currentPage = 1;
// const mealsPerPage = 10;



// event listeners
// searchBtn.addEventListener('click', getMealList);
// mealList.addEventListener('click', getMealRecipe);
// recipeCloseBtn.addEventListener('click', () => {
//     mealDetailsContent.parentElement.classList.remove('showRecipe');
// });



// get meal list that matches with the ingredients
// function getMealList(){
//     let searchInputTxt = document.getElementById('search-input').value.trim();
//     fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
//     .then(response => response.json())
//     .then(data =>{
//         let html = "";
//         if(data.meals){
//             data.meals.forEach(meal => {
//                 html += `
//                     <div class = "meal-item" data-id = "${meal.idMeal}">
//                         <div class = "meal-img">
//                             <img src = "${meal.strMealThumb}" alt = "food">
//                         </div>
//                         <div class = "meal-name">
//                             <h3>${meal.strMeal}</h3>
//                             <a href = "#" class = "recipe-btn">Get Recipe</a>
//                         </div>
//                     </div>
//                 `;
//             });
//             mealList.classList.remove('notFound');
//         } else{
//             html = "Sorry, we didn't find any meal!";
//             mealList.classList.add('notFound');
//         }
       
//         mealList.innerHTML = html;
//     })
//     .catch(err=>console.log(err))
// }

// function renderPagination(totalMeals) {
//     const totalPages = Math.ceil(totalMeals / mealsPerPage);
//     let paginationHtml = '';
//     for (let i = 1; i <= totalPages; i++) {
//         paginationHtml += `<button class="pagination-btn" data-page="${i}">${i}</button>`;
//     }
//     document.getElementById('pagination').innerHTML = paginationHtml;
    
//     // Add event listeners to pagination buttons
//     const paginationButtons = document.querySelectorAll('.pagination-btn');
//     paginationButtons.forEach(button => {
//         button.addEventListener('click', () => {
//             currentPage = parseInt(button.dataset.page);
//             getMealList(currentPage);
//         });
//     });
// }

// get recipe of the meal
// function getMealRecipe(e){
//     e.preventDefault();
//     if(e.target.classList.contains('recipe-btn')){
//         let mealItem=e.target.parentElement.parentElement;
//         fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
//         .then(response=> response.json())
//         .then(data=>mealRecipeModal(data.meals))
//         .catch(err=>console.log(err))
//     }
// }

// create a modal
// function mealRecipeModal(meal){
//     console.log(meal);
//     meal=meal[0];
//     let html= `
//         <h2 class = "recipe-title">${meal.strMeal}</h2>
//         <p class = "recipe-category">${meal.strCategory}</p>
//         <div class = "recipe-instruct">
//             <h3>Recipe:</h3>
//             <p>${meal.strInstructions}</p>
//         </div>
//         <div class = "recipe-meal-img">
//             <img src = "${meal.strMealThumb}" alt = "">
//         </div>
//         <div class = "recipe-link">
//             <iframe width="560" height="315" src="https://www.youtube.com/embed/${getYouTubeID(meal.strYoutube)}" frameborder="0" allowfullscreen></iframe>
            
//         </div>
//     `;
//     mealDetailsContent.innerHTML = html;
//     mealDetailsContent.parentElement.classList.add('showRecipe');
// }
// function getYouTubeID(url) {
//     // Regex to match YouTube video ID from URL
//     var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
//     var match = url.match(regExp);
//     if (match && match[2].length === 11) {
//         return match[2];
//     } else {
//         return 'error';
//          You can handle error case as per your need
//     }
// }


const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// Event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

// Fetch random meals on page load
document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < 10; i++) {
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => displayRandomMeal(data.meals[0]))
        .catch(err => console.log(err));
    }
});

// Display random meal in the meal list
function displayRandomMeal(meal) {
    let html = `
        <div class="meal-item" data-id="${meal.idMeal}">
            <div class="meal-img">
                <img src="${meal.strMealThumb}" alt="food">
            </div>
            <div class="meal-name">
                <h3>${meal.strMeal}</h3>
                <a href="#" class="recipe-btn">Get Recipe</a>
            </div>
        </div>
    `;
    mealList.innerHTML += html;
    mealList.classList.remove('notFound');
}

// Get meal list that matches with the ingredients
function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        displayMeals(data.meals);
    })
    .catch(err => console.log(err));
}

// Display meals in the meal list
function displayMeals(meals) {
    let html = "";
    if (meals) {
        meals.forEach(meal => {
            html += `
                <div class="meal-item" data-id="${meal.idMeal}">
                    <div class="meal-img">
                        <img src="${meal.strMealThumb}" alt="food">
                    </div>
                    <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href="#" class="recipe-btn">Get Recipe</a>
                    </div>
                </div>
            `;
        });
        mealList.classList.remove('notFound');
    } else {
        html = "Sorry, we didn't find any meal!";
        mealList.classList.add('notFound');
    }
    mealList.innerHTML = html;
}

// Get recipe of the meal
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement;
        console.log(mealItem)
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals))
        .catch(err => console.log(err));
    }
}

// Display meal recipe in modal
function mealRecipeModal(meal) {
    meal = meal[0];
    let html = `
        <h2 class="recipe-title">${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-instruct">
            <h3>Recipe</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="recipe-meal-img">
            <img src="${meal.strMealThumb}" alt="food">
        </div>
        <div class="recipe-link">
            <h3>Video Recipe:</h3>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${getYouTubeVideoId(meal.strYoutube)}" frameborder="0" allowfullscreen></iframe>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}


function getYouTubeVideoId(url) {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}



