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
                if(searchResult.length === 0){
                    Recipe.displayRecipes();
                }
                }else {
                    Recipe.displayNoResultMessage();
                }
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

    // static filterRecipesByTags(recipes, selectedTag) {
    //     const filteredRecipesWithTag = recipes.filter(recipe =>{
    //         // check if any ingredient, ustensil or appliance 
    //         const recipeTags = [
    //             recipe.ingredients.map(ingredient => ingredient.ingredient),
    //             recipe.appliance,
    //             recipe.ustensils
    //         ]
    //         return selectedTag.every(tag => recipeTags.ingredient.ingredient.includes(tag) && )
    //     })
    //     Recipe.displayRecipes(filteredRecipesWithTag)
        
    // }
}
