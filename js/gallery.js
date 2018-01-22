/* ------------------------------------------ Images ------------------------------- */

function initImages() {
	
	var allImages = $("#container").children("img");
	var window_width = $("#container").width();
	var totalSize = 0;
	var coeff = 1.2;
	var imagesOnLine = [];
	var max = 0;
	var nb_portrait = 0;
	var nb_img = 0;
	var totalNewWidth = 0;

	for(var i=0; i < allImages.length; i++)
	{

		if(totalSize + allImages[i].width >= window_width && (imagesOnLine.length > 2 && nb_portrait < 1)) {

			var delta = (window_width - totalSize);

			for(var j=0; j < imagesOnLine.length ; j++) {

				if(imagesOnLine[j].width <= imagesOnLine[j].height) {
					nb_portrait++;
				} 
			}

			for(var j=0; j < imagesOnLine.length ; j++)
			{	
				if(imagesOnLine[j].width > imagesOnLine[j].height) {
					imagesOnLine[j].width += Math.floor(delta / (imagesOnLine.length - nb_portrait));
					totalNewWidth += imagesOnLine[j].width;
				} else {
					// Why, you may ask ? I don't know. Truly. But without it, it doesn't work.
					imagesOnLine[j].width += 0;
					totalNewWidth += imagesOnLine[j].width;
				}
			}

			if(totalNewWidth < window_width) {
				imagesOnLine[imagesOnLine.length - 1].width += (window_width - totalNewWidth);
				totalNewWidth += (window_width - totalNewWidth);
			}

			totalSize = 0;
			imagesOnLine = [];
			nb_portrait = 0;
			totalNewWidth = 0;
		}

		totalSize += allImages[i].width;
		imagesOnLine.push(allImages[i]);

		allImages[i].style = " padding: 2px; animation-name: fade;animation-duration: " + Math.log(i+1)*coeff + "s;";
	}

	// Take care of the last images remaining in the queue
	if(imagesOnLine.length > 2) {
		var delta = (window_width - totalSize) - 1;

			for(var j=0; j < imagesOnLine.length ; j++) {

				if(imagesOnLine[j].width <= imagesOnLine[j].height) {
					nb_portrait++;
				} 
			}

			for(var j=0; j < imagesOnLine.length ; j++)
			{	
				if(imagesOnLine[j].width > imagesOnLine[j].height) {
					imagesOnLine[j].width += (delta / (imagesOnLine.length - nb_portrait));
				}

				imagesOnLine[j].style = "animation-name: fade;animation-duration: " + Math.log(i+1)*coeff + "s; padding: 2px";
				
			}
	}

}

function generateImages() {
	var list_pic = ["lake2.jpg", "bryan.jpg", "forest.jpeg", "lake.jpg", "land.jpg", "stars.jpeg", "maupassant.jpeg", "tmp1.jpg", "tmp2.jpeg", "tmp3.jpg", "1.jpeg", "2.jpeg","3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "7.jpeg", "8.jpeg", "10.jpeg", "11.jpeg", "12.jpeg"];
	var html_pics = "";

	for(var i=0; i < 100; i++) {
		html_pics += "<img src='css/img/" + list_pic[Math.floor(Math.random()*list_pic.length)] +"' alt='Image'>";
	}
	$('#container').html(html_pics);

	initImages();
}

/* -------------------------------------------- Albums  ------------------------------------------ */

function generateAlbums() {
	var list_albums = [];
	var album = [];
	var list_pic = ["lake2.jpg", "bryan.jpg", "forest.jpeg", "lake.jpg", "land.jpg", "stars.jpeg", "maupassant.jpeg", "tmp1.jpg", "tmp2.jpeg", "tmp3.jpg", "1.jpeg", "2.jpeg","3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "7.jpeg", "8.jpeg", "10.jpeg", "11.jpeg", "12.jpeg"];
	var html_pics = "";
	var pict = "";

	for(var j=0; j < 10; j++){
		
		for(var i=0; i < 100; i++) {
			
			pict = list_pic[Math.floor(Math.random()*list_pic.length)];
			
			album.push(pict);
		
		}
		
		list_albums.push(album);	
	}
	
	$('#container').html(html_pics);

	initAlbums(list_albums);
}

function initAlbums(albums) {
	html_albums = '<div class="container"><div class="row">';

	var max_height = 0;
	var max_width = 0;

	for(var i=0;i<3;i++)
	{
		for(var j=0;j<4;j++)
		{
			if(albums[i][j].height > max_height) {
				max_height = albums[i][j].height;
			}

			if(albums[i][j].width > max_width) {
				max_width = albums[i][j].width;
			}
		}
	}

	for(var i=0;i<3;i++)
	{
		html_albums += '<div class="card center"><div class="container"><div class="row">';
		for(var j=0;j<4;j++)
		{
			html_albums += '<img class="subimg" src="css/img/' + albums[i][j] + '" alt="Image" width="' + max_width +'" height="' + max_height + '"></img>';
		}
		html_albums += '</div><p>Test text</p></div></div>';
	}
	html_albums += '</div></div></div>';
	$('#container').html(html_albums);
}

window.onload = function() {setTimeout(generateAlbums, 1000)};