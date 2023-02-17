// DOM ELEMENTS 
const recipesWrapper = document.getElementById('recipes__wrapper')
let allRecipes = [...recipes];


// RECIPES CARD 
function createRecipeCard(recipe){

    let ingredientsList = ''
    const { name, ingredients, time, description } = recipe;

    ingredients.forEach(element =>{
        ingredientsList += `<p><span class="fw-bold">${element.ingredient}</span>${element.quantity ? ': ' + element.quantity : ''} ${element.unit ? element.unit : ''}</p>`
    });
    return`
        <div class="card recipes__card border border-0">
            <div class="recipes__card--img"></div>
            <div class="recipes__card--text pt-4 px-4">
                <div class="recipes__card--text__heading d-flex justify-content-between mb-4">
                    <h3 class="recipes__card--title fs-5 col-9">${name}</h3>
                    <p class="recipes__card--duration fw-bold"><i class="fa-regular fa-clock me-2 col"></i>${time} min</p>
                </div>
                <div class="recipes__card--text__description d-flex ">
                    <div class="recipes__card--ingredients me-2 col-4">
                        ${ingredientsList}
                    </div>
                    <div class="recipes__card--instructions pb-4 col-8">
                        <p>${description}</p>
                    </div>
                </div>
            </div>
        </div>
    `
}



