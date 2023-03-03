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
                    Recipe.displayFilteredRecipes(searchResult)
                }
                else{
                    Recipe.displayRecipes(recipes)
                }
            }
            )
    }

    static searchRecipe(recipes, searchTerm){
        const filteredRecipes = recipes.filter(recipe => {
            const lowerCaseRecipeName = recipe.name.toLowerCase()

            const matchingIngredients = recipe.ingredients.filter(ingredient => {
                return ingredient.ingredient.toLowerCase().includes(searchTerm)
            })

            const matchingUstensils = recipe.ustensils.filter(ustensil => {
                return ustensil.toLowerCase().includes(searchTerm)
            })

            return lowerCaseRecipeName.includes(searchTerm) ||
                    matchingIngredients.length > 0 ||
                    matchingUstensils.length > 0
        })
        return filteredRecipes
    }

    static displayFilteredRecipes(filteredRecipes){
        let template = '';
        const recipesSection = document.querySelector('.recipes__wrapper');
        filteredRecipes.forEach(recipe => {
            template += createRecipeCard(recipe)
        })
        recipesSection.innerHTML = template;
    }
}
