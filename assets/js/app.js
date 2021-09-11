// $(document).ready();

function displayRecipes(){
    var ingredient = $("#textinput").val().trim();
    console.log(ingredient)
    var queryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?i="+ingredient

//Creates AJAX call for the recipes that contains the ingredient type in by user
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)
        console.log(response.meals[0].idMeal)
        console.log(response.meals[0].strMeal)
        console.log(response.meals[0].strMealThumb)
            //Loop through the recipes that we get back as objects
            for (var d = 0; d < 9; d++) {
                var recipeView = $("#recipe-card-view");

                //create a block to contain each image and recipe
                var recipeCard = $('<div>');
                recipeCard.addClass('card');
                recipeCard.attr("style", "width: 18rem; border: solid;");
                recipeCard.attr('data-id', response.meals[d].idMeal);
                recipeCard.attr('class', 'm-2');
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

$("#button-addon2").on("click", function(e) {
    e.preventDefault();
    displayRecipes();
});

