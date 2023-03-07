class Recipe {

    constructor (){}

    static displayRecipes(recipes){
        let template = ''
        const recipesSection = document.querySelector('.recipes__wrapper');
        
        recipes.map(recipe => template += createRecipeCard(recipe))
        recipesSection.innerHTML = template
    }

    static handleSearch(recipes){
        const searchInput = document.getElementById('search-input');

        searchInput.addEventListener('input', (event) => {
            let searchTerm = event.target.value
            searchTerm = searchTerm.toLowerCase().trim();
            if(searchTerm.length >=  3){
                const searchResult = Recipe.searchRecipe(recipes, searchTerm)
                Recipe.displayRecipes(searchResult)
                const tags = Utils.getTags(searchResult)
                Dropdown.fillDropwdowns(tags)
            }
            if (searchTerm.length = 0){
                Recipe.displayRecipes(recipes)
            }
        })
    }

    static searchRecipe(recipes, searchTerm){
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
}
