/*This file contains the javascript for the MediaWiki page
Author: Anthony Hess
Date:	1/23/15
*/

//simulates clicking the search button when enter pushed
$(document).ready(function() {
	$('#searchfield').on("keypress",function(e){
		if (e.which == 13 || e.keyCode == 13){ 
			e.preventDefault();
			//simulates clicking the search button
	      	$('#sub').click();
	    }
	});
});


function populate_results(word, n) {

	var url = "http://www.en.wikipedia.org/w/api.php?format=json&action=query&titles="+word+"&prop=revisions&rvprop=content&aifrom="+word+"&list=allimages&ailimit="+n+"aisort=name&callback=?";
	$.getJSON( url, function( data ) {
	  var a = $.parseJSON(JSON.stringify(data));
	  var keys = Object.keys(a);
	  var d = new Array();

	  //clear out previous pictures 
	  	$("#images").empty();

			for (var i = 0; i < a.query.allimages.length; i++) {

			    //insert image
			    $( "<img>" ).attr( {
			    	src: a.query.allimages[i].url,
			    	alt: "image missing",
			    	hieght: "50",
			    	width: "50"} ).appendTo( "#images" );
			    // place the name of the image next to it in a link
			    $("<a>").attr("href", a.query.allimages[i].url).text(a.query.allimages[i].name).appendTo("#images");

			    //throw in a space
			    $( "<br><br>" ).appendTo( "#images" );

			    //debugging
			    //console.log(a.query);
			};

		});
	//clears the search box
	$('#searchfield').val(''); 
}