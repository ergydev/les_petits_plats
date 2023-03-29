class Recipe {

    constructor () {}

    static displayRecipes(recipes) {
        let template = ''
        const recipesSection = document.querySelector('.recipes__wrapper');
        
        recipes.map(recipe => template += createRecipeCard(recipe))
        recipesSection.innerHTML = template
    }

    static handleSearch(recipes) {
        const searchInput = document.getElementById('search-input');

        searchInput.addEventListener('input', (event) => {
            let searchTerm = event.target.value
            searchTerm = searchTerm.toLowerCase().trim();
            if(searchTerm.length >=  3){
                const searchResult = Recipe.searchRecipe(recipes, searchTerm)
                if(searchResult.length > 0){
                    Recipe.displayRecipes(searchResult)
                    const tags = Utils.getTags(searchResult)
                    Dropdown.fillDropDowns(tags)
                    Dropdown.handleTagsSearch(tags)
                    Dropdown.handleSelectedTags(tags)
                }
                else{
                    Recipe.displayNoResultMessage();
                }
            }

            if(searchTerm.length < 3 && event.inputType == "deleteContentBackward") {
                Recipe.displayRecipes(recipes);
            }
        })
    }

    static displayNoResultMessage() {
        const displayMessage = document.querySelector('.recipes__wrapper');
        displayMessage.innerHTML = "<p class='display_message fs-4'>Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>";
    }

    static searchRecipe(recipes, searchTerm) {
        const filteredRecipes =  [];
        
        
        for (let i = 0; i < recipes.length; i++) {
            let ingredients = recipes[i].ingredients.map(ing => ing.ingredient.toLowerCase());

            if(recipes[i].name.toLowerCase().includes(searchTerm) || recipes[i].description.toLowerCase().includes(searchTerm) || ingredients.includes(searchTerm) ) {
                filteredRecipes.push(recipes[i])
            }
        }
        return filteredRecipes
    }

    static filterRecipesByTags() {    

        const tagBadges = document.querySelectorAll('.filter__tag--text') 
        const selectedBadges = [];
        
        for (let i = 0; i < tagBadges.length; i++){
            selectedBadges.push(tagBadges[i].textContent);
        }

        const filteredRecipesByTag = [];

        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];

            const matchingIngredients = recipe.ingredients.filter(ingredient => {
                for (let ing = 0; ing < selectedBadges.length; ing++) {
                    if(ingredient.ingredient.toLowerCase().includes(selectedBadges[ing].toLowerCase())){
                        return true;
                    }
                }
            })

            const matchingAppliances = selectedBadges.includes(recipe.appliance.toLowerCase());

            const matchingUstensils = recipe.ustensils.filter(ustensil => {
                for (let ust = 0; ust < selectedBadges.length; ust++) {
                    if (ustensil.toLowerCase().includes(selectedBadges[ust].toLowerCase())) {
                        return true;
                    }
                }
                return false;
            }).length > 0;

            if (matchingIngredients.length > 0 || matchingAppliances || matchingUstensils ) {
                filteredRecipesByTag.push(recipe);
            }
        }
        Recipe.displayRecipes(filteredRecipesByTag)
        
    }

    
}
