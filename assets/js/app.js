// $(document).ready();

function displayRecipes(){
    var ingredient = $("#textinput").val().trim();
    console.log(ingredient)
    var queryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?i="+ingredient;

//Creates AJAX call for the recipes that contains the ingredient type in by user
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
            //Loop through the recipes that we get back as objects
            for (var d = 0; d < 9; d++) {
                var recipeView = $("#recipe-card-view");

                //create a block to contain each image and recipe
                var recipeCard = $('<div>');
                recipeCard.addClass('card');
                recipeCard.attr('data-id', response.meals[d].idMeal);
                recipeCard.attr('class', 'm-2 recipe-card');
                //displays the list of recipes as cards
                var recipeImg = $("<img>");
                recipeImg.addClass("card-img-top");
                recipeImg.attr('src', response.meals[d].strMealThumb);
                recipeCard.append(recipeImg);
                //make the card body
                var recipeCardBody = $('<div>');
                recipeCardBody.addClass("card-body");
                var recipeCardText = $('<p>');
                recipeCardText.text(response.meals[d].strMeal);
                recipeCardBody.append(recipeCardText);
                recipeCard.append(recipeCardBody);

                // append the completed block to the webpage
                recipeView.append(recipeCard);
                }
                
            }); 

}

$("#textinput").val('');

$("#button-addon2").on("click", function(e) {
    e.preventDefault();
    displayRecipes();
});


$(document).on("click", ".recipe-card", function(e) {
    e.preventDefault();
    document.body.style.cursor='wait';
    var recipeId = $(this).attr("data-id");
    var queryURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + recipeId;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(resp) {
        console.log(resp.meals[0]);
        var recipe = resp.meals[0];
        document.body.style.cursor='default';
        $("#recipe-name").text(recipe.strMeal);
        
        var recipePic = $("<img>");
        recipePic.attr("src", recipe.strMealThumb);
        recipePic.attr("style", "width: 30rem;");
        $("#recipe-pic").append(recipePic);

        $("#recipe-text").text(recipe.strInstructions);

        for (var i = 1; i < 21; i++) {
            console.log("Loop #"+i);
            console.log(`Ingredient #${i} is ${recipe["strIngredient"+i]}`);
            if (recipe["strIngredient"+i] !== "") {
                console.log(`Ingredient #${i} exists!  Outputting to table.`);
                var ingredientRow = $("<tr>");
                var ingredientQuantity = $("<td>");
                ingredientQuantity.text(recipe["strMeasure"+i]);
                var ingredientName = $("<td>");
                ingredientName.text(recipe["strIngredient"+i]);
                ingredientRow.append(ingredientQuantity);
                ingredientRow.append(ingredientName);
                $("#recipe-ingredients").append(ingredientRow);
            } else {
                console.log(`Ingredient #${i} DOESN'T exists!  Breaking loop.`);
                break;
            }
            console.log("~~~~~~~~~~~~~~~~~~~~~~");
        }

        $('#recipe-modal').modal('show');
    });
});
