$(document).ready(function() {

    var topics = ["cat", "dog", "horse"];

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=1Wgl9oZdl7S0d1OGv2FAM6O2EpIyGU7T&limit=10&rating=g&q=";

    function displayGifs() {
        var $thisTopic = $(this).attr("data-name");
        $.ajax({
            url: queryURL + $thisTopic,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#gifs-go-here").empty();
            for (var i = 0; i < response.data.length; i++) {

                var $img = $("<img>");

                $img.addClass("gif");

                $img.attr("src", response.data[i].images.fixed_height_still.url);

                $img.attr("data-still", response.data[i].images.fixed_height_still.url);

                $img.attr("data-animate", response.data[i].images.fixed_height.url);

                $img.attr("data-state", "still");

                $("#gifs-go-here").append($img);
            };
        });

    }

    function renderButtons(arr) {
        $("#buttons-list").empty();

        for (var i = 0; i < arr.length; i++) {
            var $button = $("<button>");
            $button.addClass("topic").attr("data-name", arr[i]).text(arr[i]);

            $("#buttons-list").append($button);
        }
    }

    $("#add-topic").on("click", function (event) {
        event.preventDefault();
        var topic = $("#topic-input").val();
        if (!topic) {
            alert("Enter something into the text box!");
        } else {
            topics.push(topic);
            renderButtons(topics);
            $("#topic-input").val("");
        }
    });

    $(document).on("click", ".topic", displayGifs);

    $(document).on("click", ".gif", function () {
        
        var state = $(this).attr("data-state");

        console.log(state);

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate")).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still")).attr("data-state", "still");
        }
    });

    renderButtons(topics);
});