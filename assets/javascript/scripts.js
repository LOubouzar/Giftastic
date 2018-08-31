// Topics array to show up as search buttons in button area
var topics = [
  "Excited",
  "Happy",
  "Broke",
  "Deal With It",
  "Shock",
  "Aww",
  "Sad",
  "Friday",
  "Tired",
  "Nope",
  "OMG",
]

for (var i = 0; i < topics.length; i++) {
    var button = ("  " + '<button class="btn btn-warning searchBTN"  data-type="' + topics[i] + '">' + topics[i] + '</button>')
    $('#buttonArea').append(button)
}

// value from id="searchArea" and pushing it into topics array
$("#submitButton").on("click", function (e) {
    e.preventDefault()
    $("#buttonArea").empty()
    var searchValue = $('#searchArea').val()
    topics.push(searchValue)
    for (var i = 0; i < topics.length; i++) {
        var button = ("  " + '<button class="btn btn-warning searchBTN"  data-type="' + topics[i] + '">' + topics[i] + '</button>')
        $('#buttonArea').append(button)
    }
})
// Ajax Call to Giphy's API on click of the button
$(document).on('click', '.searchBTN', function () {
    $('#gifArea').empty()
    console.log($(this).attr('data-type'))
    var type = $(this).attr('data-type')
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=vFNHQhW7ijnG99zlVQMBtS2Vwa5EKdPF&limit=10';
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
        //API response to get the Rating and Gif Images both still and animate and append to the gifArea to display
        .then(function (response) {
            console.log(response)
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                var rating = results[i].rating
                console.log(rating)
                var p = $("<p>").text("Rating: " + rating)
                var gif = ('<img class="gif" src="' + results[i].images.fixed_height_still.url + '"data-still="' + results[i].images.fixed_height_still.url + '" data-animate="' + results[i].images.fixed_height.url + '" data-state="still"</img>')

                $('#gifArea').append(gif, p)
            }
            //setting the state of the gif on click to vary between still and animate
            $('.gif').on('click', function () {
                var state = $(this).attr('data-state')
                console.log(state)
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            })
        })
})