(function Init (){
    Recipe.displayRecipes(recipes)
    Recipe.handleSearch(recipes)
    Dropdown.openDropdown(recipes)
    const tags = Utils.getTags(recipes)
    Dropdown.handleTagsSearch(tags)
    Dropdown.handleSelectedTags(tags)
    Dropdown.fillDropwdowns(tags)
    Dropdown.initDropdowns()
})()


