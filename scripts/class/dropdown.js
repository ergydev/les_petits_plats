// ingredients 
const categoryIngredients = document.querySelector('.category__ingredients');
const ingredientsDropdown = document.getElementById("ingredients__dropdown");
const ingredientsInput = document.getElementById('ingredients-search');
const ingredientFilter = document.getElementById('ingredients');
const ingredientsWrapper = document.getElementById('ingredients-dropdown-wrapper');

// appareils 
const categoryAppareils = document.querySelector('.category__appareils');
const appareilsDropdown = document.getElementById('appareils__dropdown');
const appareilsInput = document.getElementById('appareils-search');
const appareilsFilter = document.getElementById('appareils');
const appareilsWrapper = document.getElementById('appareils-dropdown-wrapper');

// ustensils 
const categoryUstensiles = document.querySelector('.category__ustensiles');
const ustensilesDropdown = document.getElementById('ustensiles__dropdown');
const ustensilesInput = document.getElementById('ustensiles-search');
const ustensilesFilter = document.getElementById('ustensiles');
const ustensilesWrapper = document.getElementById('ustensiles-dropdown-wrapper');

class Dropdown{
    static openDropdown(filter, dropdown, category, input){
        filter.onclick = function(e){
            dropdown.classList.toggle('hidden');
            category.classList.toggle('expand__' + category.id);
            input.placeholder = category.classList.contains('expand__' + category.id) ? 'Rechercher par ' + category.id : category.id;
        };
    }

    static initDropdowns(){
        this.openDropdown(ingredientFilter, ingredientsDropdown, categoryIngredients, ingredientsInput);
        this.openDropdown(appareilsFilter, appareilsDropdown, categoryAppareils, appareilsInput);
        this.openDropdown(ustensilesFilter, ustensilesDropdown, categoryUstensiles, ustensilesInput);
    }

    static fillDropwdowns(tags){
        const ingredientsTags = tags.ingredients.map(ing => `<p class="ingredients-tags">${ing}</p>`);
        const appliancesTags = tags.appliance.map(apl => `<p class="appareils-tags">${apl}</p>`);
        const ustensilsTags = tags.ustensils.map(ust => `<p class="ustensiles-tags">${ust}</p>` );
    
        ingredientsWrapper.innerHTML = ingredientsTags.join('');
    
        appareilsWrapper.innerHTML = appliancesTags.join('');
    
        ustensilesWrapper.innerHTML = ustensilsTags.join('');
    
    }
    
    static showElementsDropdown(recipes){
        const tags = Utils.getTags(recipes);
        this.fillDropwdowns(tags);
        this.initDropdowns();
    }
}

