function displayRecipes(recipes){
    let template = ''
    const recipesSection = document.querySelector('.recipes__wrapper');
    
    recipes.map(recipe => template += createRecipeCard(recipe))
    recipesSection.innerHTML = template

}

async function init(){
    displayRecipes(recipes)
    showElementsDropdown(recipes)
}

init()

