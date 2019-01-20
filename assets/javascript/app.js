$(document).ready(function() {

    var animals = ["cat", "dog", "horse"];

    var searchTerm = "cats";

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=1Wgl9oZdl7S0d1OGv2FAM6O2EpIyGU7T&limit=10&rating=g&q=";

    function displayGifs() {
        var $thisAnimal = $(this).attr("data-name");
        $.ajax({
            url: queryURL + $thisAnimal,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#gifs-go-here").empty();
            for (var i = 0; i < response.data.length; i++) {
                var $img = $("<img>").attr("src", response.data[i].images.fixed_height.url)
                $("#gifs-go-here").append($img);
            };
        });

    }

    function renderButtons(arr) {
        $("#buttons-list").empty();

        for (var i = 0; i < arr.length; i++) {
            var $button = $("<button>");
            $button.addClass("animal").attr("data-name", arr[i]).text(arr[i]);

            $("#buttons-list").append($button);
        }
    }

    $("#add-animal").on("click", function (event) {
        event.preventDefault();
        var animal = $("#animal-input").val();
        animals.push(animal);
        renderButtons(animals);
    });

    $(document).on("click", ".animal", displayGifs);

    renderButtons(animals);
});