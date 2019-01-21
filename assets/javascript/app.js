$(document).ready(function() {

    var topics = ["cat", "dog", "horse", "frog", "snake", "hamster", "fish", "bird", "aligator", "buffalo", "eagle"];

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=1Wgl9oZdl7S0d1OGv2FAM6O2EpIyGU7T&limit=10&rating=pg&q=";

    function displayGifs() {
        var $thisTopic = $(this).attr("data-name");
        $.ajax({
            url: queryURL + $thisTopic,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#gifs-go-here").empty();
            for (var i = 0; i < response.data.length; i++) {

                var $cardDiv = $("<div>").addClass("card col-3 m-2").attr("style", "width: 18rem");

                var $cardImg = $("<img>").addClass("card-img-top gif mx-auto").attr("src", response.data[i].images.fixed_height_still.url).attr("data-still", response.data[i].images.fixed_height_still.url).attr("data-animate", response.data[i].images.fixed_height.url).attr("data-state", "still");;

                var $cardBody = $("<div>").addClass("card-body text-center");

                var $cardText = $("<p>").addClass("card-text font-weight-bold").text("Rating: " + response.data[i].rating);

                $cardBody.append($cardText);

                $cardDiv.append($cardImg).append($cardBody);

                $("#gifs-go-here").append($cardDiv);
                
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
        if (!topic.trim()) {
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
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate")).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still")).attr("data-state", "still");
        }
    });

    renderButtons(topics);
});