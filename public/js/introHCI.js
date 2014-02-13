'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);


}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();
	//console.log("hi");

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.split("project")[1];

	console.log("User clicked on project " + idNumber);
	//console.log(result);


	$.get("/project/"+idNumber, function(projectInfo) {
		var details = $("#" + projectID + " .details");
		
		/*var projectHTML = '<a href="#" class="thumbnail">' +
    		'<img src="' + projectID['image'] + '" class="detailsImage">' +
    		'<p>' + projectID['title'] + '</p>' +
    		'<p><small>' + projectID['date'] +
    		'</small></p></a>'; */

		details.html(projectInfo.summary);
		//details.html(projectHTML);
		//console.log(details);
	});


	
}


/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");
	$.get("/palette", function(randomPalette) {

		var colors = [randomPalette.colors.hex[0], 
			randomPalette.colors.hex[1], 
			randomPalette.colors.hex[2],
			randomPalette.colors.hex[3]];

		$('body').css('background-color', colors[0]);
		$('.thumbnail').css('background-color', colors[1]);
		$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
		$('p').css('color', colors[3]);
		$('.project img').css('opacity', .75);
	});

	
}