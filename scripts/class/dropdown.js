// // ingredients 
// const categoryIngredients = document.querySelector('.category__ingredients');
// const ingredientsDropdown = document.getElementById("ingredients__dropdown");
// const ingredientsInput = document.getElementById('ingredients-search');
// const ingredientFilter = document.getElementById('ingredients');

// // appareils 
// const categoryAppareils = document.querySelector('.category__appareils');
// const appareilsDropdown = document.getElementById('appareils__dropdown');
// const appareilsInput = document.getElementById('appareils-search');
// const appareilsFilter = document.getElementById('appareils');

// // ustensils 
// const categoryUstensiles = document.querySelector('.category__ustensiles');
// const ustensilesDropdown = document.getElementById('ustensiles__dropdown');
// const ustensilesInput = document.getElementById('ustensiles-search');
// const ustensilesFilter = document.getElementById('ustensiles');


// class Dropdown{

//     static openDropdown(filter ,dropdown, category, input){

//         filter.addEventListener('click', function(e){
//             dropdown.classList.toggle('hidden');
//             category.classList.toggle('expand__' + category.id);
//             input.placeholder = category.classList.contains('expand__' + category.id) ? 'Rechercher par ' + category.id : category.id;
//         });
        
//         openDropdown(ingredientFilter, ingredientsDropdown, categoryIngredients, ingredientsInput);
//         openDropdown(appareilsFilter, appareilsDropdown, categoryAppareils, appareilsInput);
//         openDropdown(ustensilesFilter, ustensilesDropdown, categoryUstensiles, ustensilesInput);

//     }



//     static fillDropwdonws(tags){
//         const ingredientsTags = tags.ingredients.map(ing => `<p class="ingredients-tags">${ing}</p>`)
//         const appliancesTags = tags.appliance.map(apl => `<p class="appareils-tags">${apl}</p>`)
//         const ustensilsTags = tags.ustensils.map(ust => `<p class="ustensiles-tags">${ust}</p>` )
    
//         ingredientsWrapper.innerHTML = ingredientsTags.join('')
    
//         appareilsWrapper.innerHTML = appliancesTags.join('')
    
//         ustensilesWrapper.innerHTML = ustensilsTags.join('')
    
//     }
    
//     static showElementsDropdown(recipes){
//         const tags = getTags(recipes)
//         fillDropwdonws(tags)
//     }



// }

