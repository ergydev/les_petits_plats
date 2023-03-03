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

    static handleTagsSearch(tags){
        const searchInputs = [
            { input: ingredientsInput, category: categoryIngredients },
            { input: appareilsInput, category: categoryAppareils },
            { input: ustensilesInput, category: categoryUstensiles },
        ];

        searchInputs.forEach(({ input, category}) =>{
            input.addEventListener('input', (event) =>{
                let searchTag = event.target.value;
                searchTag = searchTag.toLowerCase().trim();
                if(searchTag.length >= 3){
                    // const filteredTags = tags[category].filter((tag) => tag.toLowerCase().includes(searchTag));
                    const searchResultTag = Dropdown.searchFilteredTag(tags, searchTag);
                    Dropdown.displayFilteredTags(searchResultTag);
                } else{
                    Dropdown.fillDropwdowns(tags);
                }
            })
        })
    }

    static searchFilteredTag(tags, searchTag){
        const filteredTags = {
            ingredients: [],
            ustensils: [],
            appliance: [],
        };

        tags.ingredients.forEach(tag =>{
            if(tag.toLowerCase().includes(searchTag)){
                filteredTags.ingredients.push(tag);
            }
        })
        tags.ustensils.forEach(tag =>{
            if(tag.toLowerCase().includes(searchTag)){
                filteredTags.ustensils.push(tag);
            }
        })
        tags.appliance.forEach(tag =>{
            if(tag.toLowerCase().includes(searchTag)){
                filteredTags.appliance.push(tag);
            }
        })
        return filteredTags
    }

    static displayFilteredTags(filteredTags){
        const ingredientsTags = filteredTags.ingredients.map(ing => `<p class="ingredients-tags">${ing}</p>`);
        const appliancesTags = filteredTags.appliance.map(apl => `<p class="appareils-tags">${apl}</p>`);
        const ustensilsTags = filteredTags.ustensils.map(ust => `<p class="ustensiles-tags">${ust}</p>` );
    
        ingredientsWrapper.innerHTML = ingredientsTags.join('');
        appareilsWrapper.innerHTML = appliancesTags.join('');
        ustensilesWrapper.innerHTML = ustensilsTags.join('');
    }

    static showElementsDropdown(recipes){
        const tags = Utils.getTags(recipes);
        this.handleTagsSearch(tags);
        this.searchFilteredTag(tags);
        this.fillDropwdowns(tags);
        this.initDropdowns();
    }
}

