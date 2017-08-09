
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // Changing the background to streetview

    var street = $('#street').val();
    var city = $('#city').val();
    var loc = street + ', ' + city;

    $greeting.text = ("Do you want to live in " + loc + "?");
    $body.append('<img class="bgimg" src="http://maps.googleapis.com/maps/api/streetview?size=600x300&location='+loc+'">');

    var nyturl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

    // Getting the articles related to
    $.getJSON(nyturl, {
      'api-key': 'bbeca2d23223415ba3f565922deceb91',
      'q': city,
      'format': 'json'
    }).done(function(data){
      $nytHeaderElem.text('New York Times Articles about ' + city);
      $.each(data.response.docs, function(i, doc){
        var title = doc.headline.main;
        var art_url = doc.web_url;
        var snippet = doc.snippet;
        $('#nytimes-articles').append('<li><a href="' +
          art_url + '">' + title +
          '</a><p>' + snippet + '</p></li>');
      })
    }).fail(function(){
      $nytHeaderElem.text('New York Times Articles could not be loaded');
    });

    var wikiurl = 'https://en.wikipedia.org/w/api.php?format=json&action=query&list=search&srsearch='+city+ '&callback=?';

    var wikiRequestTimeout = setTimeout(function(){
      $wikiElem.text('Failed to get wikiepedia resources');
    }, 8000);
    
    // Getting related wiki pages for the right column
    $.ajax({
      url: wikiurl,
      dataType: 'jsonp',
      success: function(data) {
        $.each(data.query.search, function(i, article){
          $('#wikipedia-links').append('<li><a href=""https://en.wikipedia.org/wiki/' +
            article.title + '">' + article.title +
            '</a></li>');
        });

        clearTimeout(wikiRequestTimeout);
      }
    })

    return false;
};

$('#form-container').submit(loadData);
