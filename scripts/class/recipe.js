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
                    Dropdown.fillDropwdowns(tags)
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
            let ingredients = recipes[i].ingredients.map(function(ing){
                return ing.ingredient
            })

            if(recipes[i].name.includes(searchTerm) || recipes[i].description.includes(searchTerm) || ingredients.includes(searchTerm) ) {
                filteredRecipes.push(recipes[i])
            }
        }

        return filteredRecipes
    }

    static filterRecipesByTags() {    

        const tagBadges = document.querySelectorAll('.filter__tag--text') 
        const selectedBadges = [];
        
        tagBadges.forEach(badge => {
            badge = badge.textContent
            selectedBadges.push(badge)
        })

        const filteredBadges = recipes.filter(recipe => {
            const matchingIngredients = recipe.ingredients.filter(ingredient => {
                return selectedBadges.some(tag => ingredient.ingredient.toLowerCase().includes(tag.toLowerCase()))
            });

            const matchingAppliances =  selectedBadges.includes(recipe.appliance)

            const matchingUstensils = selectedBadges.some(badge => recipe.ustensils.includes(badge.toLowerCase()))

            return  matchingIngredients.length > 0 ||
                     matchingAppliances ||
                     matchingUstensils;
        })
        Recipe.displayRecipes(filteredBadges)
        
    }

    
}
