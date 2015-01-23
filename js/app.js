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


//********************************************************************
//populates the original results on the page
//********************************************************************
function populate_results(word, n) {

	//makes query url friendly for >1 words
	tword = word.replace(/\s/g, "+");
	var url = "http://www.en.wikipedia.org/w/api.php?format=json&action=query&titles="+tword+"&prop=revisions&rvprop=content&aifrom="+tword+"&list=allimages&ailimit="+n+"aisort=name&callback=?";
	$.getJSON( url, function( data ) {
	var a = $.parseJSON(JSON.stringify(data));

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
			//update the search more button
			update_search_button(tword, n);

		});
	//clears the search box
	//$('#searchfield').val(''); 
}


//********************************************************************
//creates a button to search from n to n+25 to add additional results to the page
//********************************************************************
function update_search_button(word, n){
	var a = parseInt(n) + 25;
	$("#more").empty();
	$('<input>').attr({
						type: "button",
						value: "25 more results"}).click(function(){add_more_results(a, word);}).appendTo('#more');
    
}



//******************************************************************************************
// adds more results to the page (n-1 = the number of results the page will now contain)
//******************************************************************************************
function add_more_results(n, word){

	var url = "http://www.en.wikipedia.org/w/api.php?format=json&action=query&titles="+word+"&prop=revisions&rvprop=content&aifrom="+word+"&list=allimages&ailimit="+n+"aisort=name&callback=?";
	$.getJSON( url, function( data ) {
	var a = $.parseJSON(JSON.stringify(data));
	
	//we add only the results from the end of the previous search to +25 
	for (var i = (n-25); i < a.query.allimages.length; i++) {
	
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
			//update the search more button
			update_search_button(word, n);

		});
}
