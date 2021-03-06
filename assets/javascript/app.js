$(document).ready(function () {

    /*
    ===============================
    Global Variables
    ===============================
    */

    // Buttons Array
    var topics = ["cat", "dog", "horse", "frog", "snake", "hamster", "fish", "bird", "aligator", "buffalo", "eagle"];

    // Initialize favorites array
    var favorites = [];

    // Favorites array retrieved from local storage
    var retrievedFromStorage = JSON.parse(localStorage.getItem("favorites"));

    // Update favorites array with items from local storage if items exist
    if (retrievedFromStorage) {
        favorites = retrievedFromStorage;
    };

    // Giphy Query URL
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=1Wgl9oZdl7S0d1OGv2FAM6O2EpIyGU7T&limit=10&rating=pg&q=";

    /*
    ===============================
    Function Declarations
    ===============================
    */

    function displayGifs() {
        // Gets data name of clicked button for query URL
        var $thisTopic = $(this).attr("data-name");

        // API call to Giphy adding user-clicked tag parameter
        $.ajax({
            url: queryURL + $thisTopic,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            
            // Clear gifs to prevent dupes
            $("#gifs-go-here").empty();

            // Renders all gifs in API response (limit 10)
            for (var i = 0; i < response.data.length; i++) {

                // Runs cardBuilder function and stores it
                var $cardDiv = cardBuilder(response, i);

                // Appends result of cardBuilder to the DOM
                $("#gifs-go-here").append($cardDiv);

            };
        });

    }

    function displayFavorites(favorites) {
        // Renders cards for each item in favorites array
        for (var i = 0; i < favorites.length; i++) {
            // Creates all elements required for a Bootstrap card
            var $cardDiv = $("<div>")
                .addClass("card col-6 my-2 mx-1")
                .attr("style", "width: 18rem")
                .attr("data-index", i);

            var $cardImg = $("<img>")
                .addClass("card-img-top gif mx-auto")
                .attr("src", favorites[i].still)
                .attr("data-still", favorites[i].still)
                .attr("data-animate", favorites[i].animated)
                .attr("data-state", "still");

            var $cardBody = $("<div>").addClass("card-body text-center");

            var $cardText = $("<p>")
                .addClass("card-text font-weight-bold")
                .attr("data-rating", favorites[i].rating)
                .text("Rating: " + favorites[i].rating.toUpperCase());

            var $cardButton = $("<button>")
                .addClass("remove-fav")
                .text("Remove Favorite");

            $cardBody.append($cardText);

            $cardBody.append($cardButton);

            $cardDiv.append($cardImg).append($cardBody);

            // Appends new card div to the DOM
            $("#favs-go-here").append($cardDiv);
        }
    }

    function cardBuilder(response, i) {
        // Creates all elements required for a Bootstrap card
        var $cardDiv = $("<div>")
            .addClass("card col-3 my-2 mx-1")
            .attr("style", "width: 18rem");

        var $cardImg = $("<img>")
            .addClass("card-img-top gif mx-auto")
            .attr("src", response.data[i].images.fixed_height_still.url)
            .attr("data-still", response.data[i].images.fixed_height_still.url)
            .attr("data-animate", response.data[i].images.fixed_height.url)
            .attr("data-state", "still");

        var $cardBody = $("<div>").addClass("card-body text-center");

        var $cardText = $("<p>")
            .addClass("card-text font-weight-bold")
            .attr("data-rating", response.data[i].rating)
            .text("Rating: " + response.data[i].rating.toUpperCase());

        var $cardButton = $("<button>")
            .addClass("add-fav")
            .text("Add Favorite");

        $cardBody.append($cardText);

        $cardBody.append($cardButton);

        $cardDiv.append($cardImg).append($cardBody);

        // Returns a card div to be used in displayGifs function
        return $cardDiv;
    }

    function renderButtons(arr) {
        // Clears buttons to prevent dupes
        $("#buttons-list").empty();

        // Renders a button for each item in the topics array
        for (var i = 0; i < arr.length; i++) {
            // Creates button
            var $button = $("<button>")
              .addClass("topic")
              .attr("data-name", arr[i])
              .text(arr[i]);

            // Appends button to the DOM
            $("#buttons-list").append($button);
        }
    }

    function updateFavs() {
        // Updates local storage with new favs object
        localStorage.setItem("favorites", JSON.stringify(favorites));

        // Clears favorite gifs to prevent dupes
        $("#favs-go-here").empty();

        // Renders favorites list
        displayFavorites(favorites);
    }

    /*
    ===============================
    Click Handlers
    ===============================
    */

    // Add new button
    $("#add-topic").on("click", function (event) {
        event.preventDefault();

        // Gets the user input
        var topic = $("#topic-input").val();

        // Won't render empty buttons
        if (!topic.trim()) {
            alert("Enter something into the text box!");
        } else {
            topics.push(topic);
            renderButtons(topics);
            $("#topic-input").val("");
        }
    });

    // Render gifs
    $(document).on("click", ".topic", displayGifs);

    // Toggle gif animate/still state
    $(document).on("click", ".gif", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate")).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still")).attr("data-state", "still");
        }
    });

    // Add favorite
    $(document).on("click", ".add-fav", function () {
        // Grabs still URL from associated image
        var still = $(this).parent().parent().children("img").attr("data-still");

        // Grabs animated URL from associated image
        var animated = $(this).parent().parent().children("img").attr("data-animate");

        // Grabs rating from associated image
        var rating = $(this).siblings("p").attr("data-rating");

        // Creates new object storing clicked item's URLs and rating
        var favObj = {
            still: still,
            animated: animated,
            rating: rating
        };

        favorites.push(favObj);

        updateFavs();

    });

    // Remove favorite
    $(document).on("click", ".remove-fav", function () {
        // Grabs array index of clicked item
        var index = $(this).parent().parent().attr("data-index");

        // Removes item from favorites array
        favorites.splice(index, 1);

        updateFavs();

    });

    /*
    ===============================
    Function Calls
    ===============================
    */

    // Render starting buttons
    renderButtons(topics);

    // Render starting favs
    displayFavorites(favorites);
});