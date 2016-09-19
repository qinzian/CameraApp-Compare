// alert('alert message goes here')

// prompt("prompt message",'input box default values')

function getImageData(imgID, callback) {
	var imgObj = document.getElementById(imgID);

  if(imgObj.canvas ==null) {
    imgObj.canvas = $('<canvas />')[0];

    imgObj.canvas.width = imgObj.width;
    imgObj.canvas.height = imgObj.height;
    imgObj.canvas.getContext('2d').drawImage(imgObj, 0, 0, imgObj.width, imgObj.height);
  }
  var imgcx = imgObj.canvas.getContext('2d');

  callback(imgcx.getImageData(0, 0, imgObj.width, imgObj.height));
}

function compare(firstImage, secondImage, callback) {
	getImageData(firstImage, function (img1) {
		getImageData(secondImage, function (img2) {
      if (img1.width !== img2.width || img1.height != img2.height) {
				callback(NaN);
				return;
			}

			var diff = 0;

			for (var i = 0; i < img1.data.length / 4; i++) {
				diff += Math.abs(img1.data[4 * i + 0] - img2.data[4 * i + 0]) / 255;
				diff += Math.abs(img1.data[4 * i + 1] - img2.data[4 * i + 1]) / 255;
				diff += Math.abs(img1.data[4 * i + 2] - img2.data[4 * i + 2]) / 255;
			}
      $('#debug').html('passed');
			callback(100 * diff / (img1.width * img1.height * 3));
		});
	});
}


$('#debug').html('loading');
compare('logo', 'local_logo', function (result) {
  //console.log(result);
  $('#debug').html(result);
});
