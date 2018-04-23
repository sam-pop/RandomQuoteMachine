// A function to return random number from min to max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//A function to create a random colored button background
function randColor() {
  var r = getRandomInt(0, 255);
  var g = getRandomInt(0, 255);
  var b = getRandomInt(0, 255);
  var opacity = 0.6;
  var randomColor = "rgba(" + r + "," + g + "," + b + "," + opacity + ")";
  $("#nextButton").css({
    backgroundColor: randomColor
  });
}
randColor();

//getNext quote
$(document).ready(function() {
  //API
  $("#nextButton").click(function() {
    function getQuote() {
      $.ajax({
        url: "https://talaikis.com/api/quotes/random/",
        success: function(response) {
          nextQuote = response.quote;
          nextAuthor = response.author;

          //show quote on page
          $("#quoteText").text(nextQuote);
          

          //show author on page
          $("#author").text("-" + nextAuthor);

          //tweet
          tweetAutor = nextAuthor.replace(/\s/g, "");
          document.getElementById("shareTwitter").href =
            "http://twitter.com/share?text=%22" +
            nextQuote +
            "%22&hashtags=" +
            tweetAutor;

          //email
          var q = nextQuote;
          var a = nextAuthor;
          document.getElementById("shareEmail").href =
            "mailto:?subject=A Quote from the machine!&body=%22" +
            String(q) +
            "%22%0D  - " +
            String(a) +
            "%0D";
        },
        error: function() {
          $("#quoteText").html(
            "NO SOUP FOR YOU! <br><span style='font-size: 0.5em'>(API broken <i class='far fa-frown'></i> )</span>"
          );
          $("#author").text("-" + "Yev Kassem");
        }
      });
    }
    getQuote();
    randColor();
  });
});