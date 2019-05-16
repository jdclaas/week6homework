var topics = [ "John Snow", "Daenerys", "Arya", "Sansa", "Tyrion", "Jaime", "Ceresi"]

function displayTopicInfo() {
	var GoT = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=JbAze3Bq2K81GsPhzV1gSBiyZyA2vR38&q=" + GoT + "&limit=10&offset=0&rating=PG-13&lang=en";

	$.ajax({
		url: queryURL, 
		method: "GET"
	}).done(function(response) {
		var results = response.data;
		$("#gifs").empty();
		for (var i = 0; i < results.length; i++) {
		
		var topicDiv = $("<div class='panel'>");
		var rating = response.data[i].rating;
		var pRate = $("<p>").text("Rating: " + rating);
		topicDiv.append(pRate);
		var giphyImgStill = response.data[i].images.downsized_still.url;
		var giphyImgMotion = response.data[i].images.downsized.url;
		var image = $("<img>").attr("src", giphyImgStill);
		image.attr("data-still", giphyImgStill);
		image.attr("data-animate", giphyImgMotion);
		image.attr("data-state", "still");
		image.attr("id", "img"+i)
		image.addClass("giphyImages");
		topicDiv.prepend(image);
		$("#gifs").prepend(topicDiv);
		}
	})
}

function renderButtons() {
	$("#buttons").empty();

	for (var i = 0; i < topics.length; i++) {
		var a = $("<button>");
		a.addClass("topic");
		a.addClass("btn btn-lg");
		a.attr("data-name", topics[i]);
		a.attr("type", "button");
		a.text(topics[i]);
		$("#cartoonButtons").append(a);
	}
}

$("#add").on("click", function(event) {
	event.preventDefault();
    var topic = $("#input").val().trim();
    topics.push(topic);
    $("form").trigger("reset")
    renderButtons();
    });

$(document).on("click", ".topic", displayTopicInfo);
renderButtons();



$(document).on("click", ".giphyImages", flipAnimate);



function flipAnimate() {
	var item = $(this).attr("id");
	item = "#"+item;
	var state = $(item).attr("data-state");
	if (state === "still") {
        $(item).attr("src", $(item).attr("data-animate"));
        $(item).attr("data-state", "animate");
      } else {
        $(item).attr("src", $(item).attr("data-still"));
        $(item).attr("data-state", "still");
      };
};