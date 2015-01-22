/*This file contains the javascript for the MediaWiki page
Author: Anthony Hess
Date:	1/23/15
*/

//http://en.wikipedia.org/w/api.php?format=json&action=query&titles=Shakespeare&prop=revisions&rvprop=content&list=allimages&ailimit=10aisort=name
//sorting by title not avaiable with wikimedia using "name"

/*function myFunction() {
	var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
		$.getJSON( flickerAPI, {
		tags: "tony",
		tagmode: "any",
		format: "json"
		})
			.done(function( data ) {
			$.each( data.items, function( i, item ) {
			$( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
			if ( i === 3 ) {
			return false;
			}
		});
	});
}*/

function myFunction() {
$.getJSON( "http://www.en.wikipedia.org/w/api.php?format=json&action=query&titles=Shakespeare&prop=revisions&rvprop=content&list=allimages&ailimit=10aisort=name&callback=?", function( data ) {
  var items = JSON.parse(data);
  alert(items.warnings);

/*  $.each( data, function( key, val ) {
    items.push( "<li id='" + key + "'>" + val + "</li>" );
  });
 
  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "#images" );
*/
});
}