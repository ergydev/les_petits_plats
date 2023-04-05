class Recipe {

    constructor () {}

    static displayRecipes(recipes) {
        let template = ''
        const recipesSection = document.querySelector('.recipes__wrapper');
        
        if (recipes.length > 0){
            recipes.map(recipe => template += createRecipeCard(recipe))
            recipesSection.innerHTML = template
        } else {
            recipesSection.innerHTML = '<p>Aucune recette trouvée</p>'
        }
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
        const filteredRecipes = recipes.filter(recipe => {
            const lowerCaseRecipeName = recipe.name.toLowerCase()
            const lowerCaseRecipeDescription = recipe.description.toLowerCase()

            const matchingIngredients = recipe.ingredients.filter(ingredient => {
                return ingredient.ingredient.toLowerCase().includes(searchTerm)
            })

            return lowerCaseRecipeName.includes(searchTerm) ||
                    lowerCaseRecipeDescription.includes(searchTerm) ||
                    matchingIngredients.length > 0 
        })

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

            let matchCount = 0

            for(const tag of selectedBadges) {
                
                const matchingIngredients = recipe.ingredients.filter(ingredient => {
                    return ingredient.ingredient.toLowerCase().includes(tag.toLowerCase())
                });
                if (matchingIngredients.length > 0) matchCount++ 
                if(recipe.appliance.toLocaleLowerCase().includes(tag.toLocaleLowerCase())) matchCount++
                if(recipe.ustensils.some(ustensil => ustensil.toLocaleLowerCase().includes(tag.toLocaleLowerCase()))) matchCount++
            }

            return selectedBadges.length > 0 ? matchCount === selectedBadges.length : false;
        })
        Recipe.displayRecipes(filteredBadges)
        
    }

    
}
