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
                    const tags = Utils.getTags(searchResult)
                    Recipe.displayRecipes(searchResult)
                    Dropdown.fillDropDowns(tags)
                    Dropdown.handleTagsSearch(tags)
                }
                else{
                    Recipe.displayNoResultMessage();
                }
            }
            if(searchTerm.length <3 && selectedBadges.length > 0 ){
                Recipe.filterRecipesByTags()
            }

            if(searchTerm.length < 3 && event.inputType == "deleteContentBackward") {
                Recipe.displayRecipes(recipes);
                const tags = Utils.getTags(recipes)
                Dropdown.fillDropDowns(tags)
                Dropdown.handleTagsSearch(tags)
                Dropdown.handleSelectedTags(tags)
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
            const currentRecipe = recipes[i]
            const allIngredients = []
            
            for(let k = 0; k < currentRecipe.ingredients; k++){
                const currentIng = currentRecipe.ingredients[k].ingredient.toLowerCase()
                allIngredients.push(currentIng)
            }

            if(currentRecipe.name.toLowerCase().includes(searchTerm) || currentRecipe.description.toLowerCase().includes(searchTerm) || allIngredients.includes(searchTerm) ) {
                filteredRecipes.push(currentRecipe)
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
