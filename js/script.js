
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var streetstr = $("#street").val();
    var city = $("#city").val();
    var address = streetstr + ',' + city;

    $greeting.text("So, you want to live at," + address + "?");

    var streetUrl = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" +address ;
    $body.append('<img class="bgimg" src=" ' + streetUrl + ' ">');

    // NYT API code
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "da6ed86a1b574fe687484b96ead6ef5d",
      'q': "'+ city +'"
    });

    $.getJSON(url, fucntion( data ){
        var items = [];
        $.each
    })

    return false;
};

$('#form-container').submit(loadData);
