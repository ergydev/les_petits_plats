// ingredients 
const categoryIngredients = document.querySelector('.category__ingredients');
const ingredientsDropdown = document.getElementById("ingredients__dropdown");
const ingredientsWrapper = document.getElementById('ingredients-dropdown-wrapper');
const ingredientsInput = document.getElementById('ingredients-search');
const ingredientFilter = document.getElementById('ingredients')

// appareils 
const categoryAppareils = document.querySelector('.category__appareils');
const appareilsDropdown = document.getElementById('appareils__dropdown');
const appareilsWrapper = document.getElementById('appareils-dropdown-wrapper');
const appareilsInput = document.getElementById('appareils-search');
const appareilsFilter = document.getElementById('appareils')

// ustensils 
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


