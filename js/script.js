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
    var url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + city + '&sort=newest&api-key=da6ed86a1b574fe687484b96ead6ef5d'

    $.getJSON(url, function( data ){
        $nytHeaderElem.text('New yourk times article about' + city);

        articles = data.response.docs;
        for (var i= 0; i < articles.length; i++){
            var article = articles[i];
            $nytElem.append('<li class="article"' + '<a href="'+article.web_url+'">' + article.headline.main + '</a>' +
                '<p>' + article.snippet + '</p>' +
            '</li>');
        };
    }).fail (function(e){
        $nytHeaderElem.text('New yourk times article could not be loaded');
    });

    // Wikipedia Article API
    var wikiUrl = 'http://en.Wikipedia.org/w/api.php?action=opensearch&search=' + city + '&format=json&callback=wikiCallback';

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        success: function (response){
            var articleList = response[1];

            for (var i=0; i < articleList.length; i++){
                articlestr = articleList[i];
                var wurl = 'http://en.Wikipedia.org/wiki/' + articlestr ;
                $wikiElem.append('<li> <a href="' + wurl + '">' + articlestr + '</a></li>');
            }
        }
    });
    return false;
};

$('#form-container').submit(loadData);
