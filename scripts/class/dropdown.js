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

        this.handleSelectedTags()
    }

    static fillDropwdowns(tags) {
        const ingredientsTags = tags.ingredients.map(ing => `<p class="ingredients-tags item-tag" data-category="filter__tag--ingredient">${ing}</p>`);
        const appliancesTags = tags.appliance.map(apl => `<p class="appareils-tags item-tag" data-category="filter__tag--appareil">${apl}</p>`);
        const ustensilsTags = tags.ustensils.map(ust => `<p class="ustensiles-tags item-tag" data-category="filter__tag--ustensil">${ust}</p>` );
    
        ingredientsWrapper.innerHTML = ingredientsTags.join('');
        appareilsWrapper.innerHTML = appliancesTags.join('');
        ustensilesWrapper.innerHTML = ustensilsTags.join('');
    }

    static handleTagsSearch(tags) {
        const searchInputs = [
            { input: ingredientsInput, category: categoryIngredients },
            { input: appareilsInput, category: categoryAppareils },
            { input: ustensilesInput, category: categoryUstensiles },
        ];

        searchInputs.forEach(({ input, category}) => {
            input.addEventListener('input', (event) => {
                let searchTag = event.target.value;
                searchTag = searchTag.toLowerCase().trim();
                if(searchTag.length >= 3){
                    const searchResultTag = Dropdown.searchFilteredTag(tags, searchTag);
                    Dropdown.fillDropwdowns(searchResultTag);
                    Dropdown.handleSelectedTags(searchResultTag);
                } else{
                    Dropdown.fillDropwdowns(tags);
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
        const selectedTags = document.querySelectorAll('.dropdown-wrapper .item-tag');
        const selectedTagsDiv = document.querySelector('.header__filters--tags');
        let selectedTag = [];

        selectedTags.forEach(tag => {
            tag.addEventListener('click', (event) =>{
                const elm = event.target
                const tagText = elm.textContent;
                const tagCategory = elm.dataset.category

                if(!selectedTag.includes(tagText)) {
                    selectedTag.push(tagText);
                }

                const tagDiv = Dropdown.createBadge(tagText, tagCategory, selectedTag)
                
                selectedTagsDiv.appendChild(tagDiv);

                Recipe.filterRecipesByTags(selectedTag);
                event.stopPropagation();
                return selectedTag
            })
        })
    }

    static createBadge(title, bgClass, selectedTag) {

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
            const index = selectedTag.indexOf(title);
            if(index > -1) {
                selectedTag.splice(index, 1);
            }
            if(selectedTag.length === 0 ) {
                Recipe.displayRecipes(recipes) 
            }else {
                Recipe.filterRecipesByTags(selectedTag)
            }
        })
        
        tagDiv.appendChild(tagElem);
        tagDiv.appendChild(tagIcon);

        return tagDiv
    }

    static showElementsDropdown(recipes){
        const tags = Utils.getTags(recipes);
        this.handleTagsSearch(tags);
        this.searchFilteredTag(tags);
        this.fillDropwdowns(tags);
        this.initDropdowns();
        this.handleSelectedTags(recipes);
    }
}

