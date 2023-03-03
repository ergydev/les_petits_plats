(function Init (){
    Recipe.displayRecipes(recipes)
    Recipe.handleSearch(recipes)
    Dropdown.openDropdown(recipes)
    const tags = Utils.getTags(recipes)
    Utils.getIngredients(recipes)
    Dropdown.fillDropwdowns(tags)
    Dropdown.initDropdowns()
})()


