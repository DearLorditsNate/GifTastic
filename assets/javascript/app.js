$(document).ready(function() {

    var 

    var searchTerm = "cats";

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=1Wgl9oZdl7S0d1OGv2FAM6O2EpIyGU7T&q=" + searchTerm + "&limit=10&rating=g";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            var $img = $("<img>").attr("src", response.data[i].images.fixed_height.url)
            $("#gifs-go-here").append($img);
        };
    });
});