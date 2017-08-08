
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

    return false;
};

$('#form-container').submit(loadData);
