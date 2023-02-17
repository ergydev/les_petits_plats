// ingredients 
const ingredientsBtn = document.getElementById('ingredients-btn');
const categoryIngredients = document.querySelector('.category__ingredients');
const ingredientsDropdown = document.getElementById("ingredients__dropdown");
const ingredientsWrapper = document.getElementById('ingredients-dropdown-wrapper');
const ingredientsInput = document.getElementById('ingredients-search');

// appareils 
const appareilsBtn = document.getElementById('appareils-btn');
const categoryAppareils = document.querySelector('.category__appareils');
const appareilsDropdown = document.getElementById('appareils__dropdown');
const appareilsWrapper = document.getElementById('appareils-dropdown-wrapper');
const appareilsInput = document.getElementById('appareils-search');

// ustensils 
const ustensilesBtn = document.getElementById('ustensiles-btn');
const categoryUstensiles = document.querySelector('.category__ustensiles');
const ustensilesDropdown = document.getElementById('ustensiles__dropdown');
const ustensilesWrapper = document.getElementById('ustensiles-dropdown-wrapper');
const ustensilesInput = document.getElementById('ustensiles-search');

function openDropdown(btn, dropdown, category, input){
    btn.addEventListener('click', function(e){
        dropdown.classList.toggle('hidden');
        category.classList.toggle('expand__' + category.id);
        input.placeholder = category.classList.contains('expand__' + category.id) ? 'Rechercher par ' + category.id : category.id;
    });
}
openDropdown(ingredientsBtn, ingredientsDropdown, categoryIngredients, ingredientsInput);
openDropdown(appareilsBtn, appareilsDropdown, categoryAppareils, appareilsInput);
openDropdown(ustensilesBtn, ustensilesDropdown, categoryUstensiles, ustensilesInput);

function showElementsDropdown(recipes){
    let ingredientsTags = "";
    let appareilsTags = "";
    let ustensilesTags = "";
    let ingredients = new Set();
    let appareils = new Set();
    let ustensiles = new Set();
    // stock ingredients and check if it's not already in the array 
    for (let i = 0; i < recipes.length; i++) {
        for (let obj = 0; obj < recipes[i].ingredients.length; obj++) {
            if (!ingredients.has(recipes[i].ingredients[obj].ingredient)) {
                ingredients.add(recipes[i].ingredients[obj].ingredient);
                ingredientsTags += `<p class="ingredients-tags">${recipes[i].ingredients[obj].ingredient}</p>`;
                ingredientsWrapper.innerHTML = ingredientsTags;
            }
        }
        // appareils 
        for(let recipe of recipes){
            let appliances = recipe.appliance;
            if (!appareils.has(appliances)){
                appareils.add(recipe.appliance)
                appareilsTags += `<p class="appareils-tags">${appliances}</p>`;
                appareilsWrapper.innerHTML = appareilsTags
            }
        }   
    }
    // ustensiles 
    for (let i = 0; i < recipes.length; i++) {
        let recipe = recipes[i];
        for (let j = 0; j < recipe.ustensils.length; j++) {
            let ustensil = recipe.ustensils[j];
            if(!ustensiles.has(recipe.ustensils[j])){
                ustensiles.add(recipe.ustensils[j]);
                ustensilesTags += `<p class="ustensiles-tags">${ustensil}</p>`;
                ustensilesWrapper.innerHTML = ustensilesTags
            }
        }
    }

}


