const inputs = document.querySelectorAll('.filters-input')

// ingredients 
const ingredientsBtn = document.getElementById('ingredients-btn');
const categoryIngredients = document.querySelector('.category__ingredients');
const ingredientsDropdown = document.getElementById("ingredients__dropdown");
const ingredientsWrapper = document.getElementById('ingredients-dropdown-wrapper');
const ingredientsInput = document.getElementById('ingredients-search');
const ingredientFilter = document.getElementById('ingredients')



// appareils 
const appareilsBtn = document.getElementById('appareils-btn');
const categoryAppareils = document.querySelector('.category__appareils');
const appareilsDropdown = document.getElementById('appareils__dropdown');
const appareilsWrapper = document.getElementById('appareils-dropdown-wrapper');
const appareilsInput = document.getElementById('appareils-search');
const appareilsFilter = document.getElementById('appareils')

// ustensils 
const ustensilesBtn = document.getElementById('ustensiles-btn');
const categoryUstensiles = document.querySelector('.category__ustensiles');
const ustensilesDropdown = document.getElementById('ustensiles__dropdown');
const ustensilesWrapper = document.getElementById('ustensiles-dropdown-wrapper');
const ustensilesInput = document.getElementById('ustensiles-search');
const ustensilesFilter = document.getElementById('ustensiles')

function openDropdown(filter ,dropdown, category, input){
    filter.addEventListener('click', function(e){
        dropdown.classList.toggle('hidden');
        category.classList.toggle('expand__' + category.id);
        input.placeholder = category.classList.contains('expand__' + category.id) ? 'Rechercher par ' + category.id : category.id;
    });
}
openDropdown(ingredientFilter, ingredientsDropdown, categoryIngredients, ingredientsInput);
openDropdown(appareilsFilter, appareilsDropdown, categoryAppareils, appareilsInput);
openDropdown(ustensilesFilter, ustensilesDropdown, categoryUstensiles, ustensilesInput);


function getTags(recipes){

    const ingredientSet = new Set()
    const applianceSet = new Set()
    const ustensilSet = new Set()

    recipes.forEach(recipe => {
        const ingredients = getIngredients(recipe)
        ingredients.forEach(i => ingredientSet.add(i))
        
        applianceSet.add(recipe.appliance)

        recipe.ustensils.forEach(u => ustensilSet.add(u))
    })

    return{
        ingredients: Array.from(ingredientSet),
        ustensils: Array.from(ustensilSet),
        appliance: Array.from(applianceSet)
    }
}

function getIngredients(recipe){
    const allIngredients = []
    const ingredients = recipe.ingredients

    ingredients.forEach(oneIngredient => allIngredients.push(oneIngredient.ingredient))

    return allIngredients
}

function fillDropwdonws(tags){
    const ingredientsTags = tags.ingredients.map(ing => `<p class="ingredients-tags">${ing}</p>`)
    const appliancesTags = tags.appliance.map(apl => `<p class="appareils-tags">${apl}</p>`)
    const ustensilsTags = tags.ustensils.map(ust => `<p class="ustensiles-tags">${ust}</p>` )

    ingredientsWrapper.innerHTML = ingredientsTags.join('')

    appareilsWrapper.innerHTML = appliancesTags.join('')

    ustensilesWrapper.innerHTML = ustensilsTags.join('')

}

function showElementsDropdown(recipes){
    const tags = getTags(recipes)
    fillDropwdonws(tags)
}