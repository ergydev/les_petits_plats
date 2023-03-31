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

class Dropdown {
    static selectedTags = []

    static openDropdown(filter, dropdown, category, input){
        filter.onclick = function(e) {
            dropdown.classList.toggle('hidden');
            category.classList.toggle('expand__' + category.id);
            input.placeholder = category.classList.contains('expand__' + category.id) ? 'Rechercher par ' + category.id : category.id;
            input.focus();
        };
    }

    static initDropdowns() {
        this.openDropdown(ingredientFilter, ingredientsDropdown, categoryIngredients, ingredientsInput);
        this.openDropdown(appareilsFilter, appareilsDropdown, categoryAppareils, appareilsInput);
        this.openDropdown(ustensilesFilter, ustensilesDropdown, categoryUstensiles, ustensilesInput);
    }

    static fillDropDowns(tags) {

        const ingredientsTags = []
        const appliancesTags = []
        const ustensilsTags = []
        
        tags.ingredients.forEach(ingredient => {
            if(!Dropdown.selectedTags.includes(ingredient))
                ingredientsTags.push(`<p class="ingredients-tags item-tag" data-category="filter__tag--ingredient">${ingredient}</p>`)
        } );
        
        tags.appliance.forEach(appliance => {
            if(!Dropdown.selectedTags.includes(appliance))
                appliancesTags.push( `<p class="appareils-tags item-tag" data-category="filter__tag--appareil">${appliance}</p>`)
        });

        tags.ustensils.forEach(ustensil => {
            if(!Dropdown.selectedTags.includes(ustensil))
                ustensilsTags.push(`<p class="ustensiles-tags item-tag" data-category="filter__tag--ustensil">${ustensil}</p>`)
        } );
    
        ingredientsWrapper.innerHTML = ingredientsTags.join('');
        appareilsWrapper.innerHTML = appliancesTags.join('');
        ustensilesWrapper.innerHTML = ustensilsTags.join('');

        Dropdown.handleSelectedTags()
    }

    static handleTagsSearch(tags) {
        const searchInputs = [
            { input: ingredientsInput, category: categoryIngredients },
            { input: appareilsInput, category: categoryAppareils },
            { input: ustensilesInput, category: categoryUstensiles },
        ];

        searchInputs.forEach(({ input }) => {
            input.addEventListener('input', (event) => {
                let searchTag = event.target.value;
                searchTag = searchTag.toLowerCase().trim();
                if(searchTag.length >= 3) {
                    const searchResultTag = Dropdown.searchFilteredTag(tags, searchTag);
                    Dropdown.fillDropDowns(searchResultTag);

                    const updateRecipe = recipes.filter(recipe =>{
                        const lowerCaseRecipeName = recipe.name.toLowerCase()
                        const lowerCaseRecipeDescription = recipe.description.toLowerCase()
            
                        const matchingIngredients = recipe.ingredients.filter(ingredient => {
                            return ingredient.ingredient.toLowerCase().includes(searchTag)
                        })
            
                        return lowerCaseRecipeName.includes(searchTag) ||
                                lowerCaseRecipeDescription.includes(searchTag) ||
                                matchingIngredients.length > 0 
                    })
                    Recipe.displayRecipes(updateRecipe)
                } else{
                    Dropdown.fillDropDowns(tags);
                    Recipe.displayRecipes(recipes);
                }
                event.stopPropagation()
            })
        })
    }

    static searchFilteredTag(tags, searchTag) {
        const filteredTags = {
            ingredients: [],
            ustensils: [],
            appliance: [],
        };

        tags.ingredients.forEach(tag =>{
            if(tag.toLowerCase().includes(searchTag)) {
                filteredTags.ingredients.push(tag);
            }
        })
        tags.ustensils.forEach(tag => {
            if(tag.toLowerCase().includes(searchTag)) {
                filteredTags.ustensils.push(tag);
            }
        })
        tags.appliance.forEach(tag => {
            if(tag.toLowerCase().includes(searchTag)) {
                filteredTags.appliance.push(tag);
            }
        })
        return filteredTags
    }

    static handleSelectedTags() {
        const allTags = document.querySelectorAll('.dropdown-wrapper .item-tag');
        const allTagsDiv = document.querySelector('.header__filters--tags');
        let selectedTags = [];

        allTags.forEach(tag => {
            tag.addEventListener('click', (event) =>{
                const elm = event.target
                const tagText = elm.textContent;
                const tagCategory = elm.dataset.category

                if(!Dropdown.selectedTags.includes(tagText)) {
                    Dropdown.selectedTags.push(tagText);
                }

                const tagDiv = Dropdown.createBadge(tagText, tagCategory, Dropdown.selectedTags)
                
                allTagsDiv.appendChild(tagDiv);

                Recipe.filterRecipesByTags(Dropdown.selectedTags);
                Dropdown.updateDropdowns(Dropdown.selectedTags);
                event.stopPropagation();
            })
        })
    }

    static createBadge(title, bgClass) {

        const tagDiv =  document.createElement('div');
        tagDiv.classList.add('filter__tag');
        tagDiv.classList.add('d-flex');
        tagDiv.classList.add('text-light');
        tagDiv.classList.add('align-items-center');
        tagDiv.classList.add('py-2');
        tagDiv.classList.add('px-3');
        tagDiv.classList.add('rounded');
        tagDiv.classList.add('me-2');
        tagDiv.classList.add(bgClass);

        const tagElem = document.createElement('p');
        tagElem.textContent = title;
        tagElem.classList.add('filter__tag--text');
        tagElem.classList.add('px-1');
        tagElem.classList.add('me-2');
        tagElem.classList.add('fw-bold');

        const tagIcon = document.createElement('i');
        tagIcon.classList.add('fa-regular');
        tagIcon.classList.add('fa-circle-xmark');
        tagIcon.classList.add('close-icon');


        tagIcon.addEventListener('click', (event) =>{
            event.target.parentElement.remove();
            const index = Dropdown.selectedTags.indexOf(title);
            if(index > -1) {
                Dropdown.selectedTags.splice(index, 1);
                Dropdown.fillDropDowns(Utils.getTags(recipes))
            }
            if(Dropdown.selectedTags.length === 0 ) {
                Recipe.displayRecipes(recipes) 
                Dropdown.fillDropDowns(Utils.getTags(recipes))
            }else {
                Recipe.filterRecipesByTags(Dropdown.selectedTags)
            }
        })
        
        tagDiv.appendChild(tagElem);
        tagDiv.appendChild(tagIcon);

        return tagDiv
    }

    static updateDropdowns() {
        
        const matchingRecipes = recipes.filter(recipe => {
            const hasMatchingIngredient = recipe.ingredients.some(ingredient => ingredient.ingredient.includes(Dropdown.selectedTags)); 
            
            const hasMatchingAppliance = recipe.appliance.includes(Dropdown.selectedTags);

            const hasMatchingUstensil = recipe.ustensils.some(ustensil => ustensil.includes(Dropdown.selectedTags));


            return hasMatchingIngredient || hasMatchingAppliance || hasMatchingUstensil;
        })

        const tags = Utils.getTags(matchingRecipes)

        Dropdown.fillDropDowns(tags, Dropdown.selectedTags)
    }

    

    static showElementsDropdown(recipes) {
        const tags = Utils.getTags(recipes);
        this.handleTagsSearch(tags);
        this.searchFilteredTag(tags);
        this.fillDropDowns(tags, selectedTags);
        this.initDropdowns();
        this.updateDropdowns(selectedTags);
    }
}

