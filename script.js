// alert('alert message goes here')

// prompt("prompt message",'input box default values')
var compareImgApp = angular.module('CompareImgApp',[]);
var controllers = {};

controllers.TryCtrller = function ($scope) {
	$scope.debug = 'debug msg';

	$scope.load_img1 = function(){
		$('#debug').html('loading img1');
		$scope.debug = "clicked load_img1 button";
		$scope.img1src = "images/logo1.png";// + $scope.img1Name;
	};
	$scope.load_img2 = function(){
		$('#debug').html('loading img2');
		$scope.debug = "clicked load_img2 button";
		$scope.img2src = "images/logo2.png";// + $scope.img2Name;
	};

	$scope.compare = function(){
		$('#debug').html('loading compareImg');
		$scope.debug = "clicked compare button";
		compare('img1', 'img2', function (result) {
		  $scope.output = result;
		});
	};
};
compareImgApp.controller(controllers);

function getImageData(imgID, callback) {
	var imgObj = document.getElementById(imgID);
	if (true){//imgObj.canvas == null){
		imgObj.canvas = $('<canvas />')[0];

		imgObj.canvas.width = imgObj.width;
		imgObj.canvas.height = imgObj.height;
		imgObj.canvas.getContext('2d').drawImage(imgObj, 0, 0, imgObj.width, imgObj.height);
	}
	var imgcx = imgObj.canvas.getContext('2d');
	var imgData = imgcx.getImageData(0, 0, imgObj.width, imgObj.height)
	$('#debug').html(imgID);
  callback(imgData);
}

function compare(firstImage, secondImage, callback) {
	$('#debug').html('calculating');

	getImageData(firstImage, function (img1) {
		getImageData(secondImage, function (img2) {
      if (img1.width !== img2.width || img1.height != img2.height) {
				callback("YUNO GIVE IMG WITH SAME SIZES >:/");
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
