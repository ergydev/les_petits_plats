class Utils{
    static getTags(recipes){

        const ingredientSet = new Set()
        const applianceSet = new Set()
        const ustensilSet = new Set()
    
        recipes.forEach(recipe => {
            const ingredients = Utils.getIngredients(recipe)
            ingredients.forEach(i => ingredientSet.add(i))
            applianceSet.add(recipe.appliance)
            recipe.ustensils.forEach(u => ustensilSet.add(u))
        })
        return{
            ingredients: Array.from(ingredientSet),
            ustensils: Array.from(ustensilSet),
            appliance: Array.from(applianceSet)
        }
    }
    
    static getIngredients(recipe){
        const allIngredients = []
        const ingredients = recipe.ingredients
        
        if (Array.isArray(ingredients)) {
          ingredients.forEach(oneIngredient => allIngredients.push(oneIngredient.ingredient))
        }
        return allIngredients
    }
      
}