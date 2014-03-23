angular.module('CreateCtrl', []).controller('CreateController', function($scope) {
	$scope.shape = {};
	$scope.shape.dom = $('#shape');
	$scope.imgSrc="";
	$scope.usrTxt = "";
	$scope.shape.type = "";
	$scope.shape.bg = "ffffff";
	$scope.shape.rw = $scope.shape.dom.width();
	$scope.shape.rh = $scope.shape.dom.height();
	$scope.shape.cw = $scope.shape.dom.width();
	$scope.shape.ch = $scope.shape.dom.height();
	$scope.fonts = ['Ubuntu Mono', 'Sofadi One', 'Nothing You Could Do', 'Gilda Display', 'Diplomata', 'The Girl Next Door', 'Playfair Display SC', 'Candal', 'Open Sans', 'Herr Von Muellerhoff'];
	$scope.selectedFont = $scope.fonts[0];

	$scope.$on('$routeChangeSuccess', function () {
		center();
		$scope.shape.dom.resizable({
			minWidth: 50,
			minHeight: 50,
			maxWidth: $('#editorCanvas').width(),
			maxHeight: 500,
			handles: "se",
			aspectRatio: false,
			resize: function (event, ui) {center();},
			stop: function (event, ui) {center();}
		});
		$('.dropdown-toggle').dropdown();
		$('.dropdown-menu').click(function(e) {
		  e.stopPropagation();
		});
	});

	$scope.$watch('shape.type',function (newVal,oldVal) {
		if (newVal === "circle") {
			console.log(newVal);
			$scope.shape.rw = $scope.shape.dom.width();
			$scope.shape.rh = $scope.shape.dom.height();
			$scope.shape.dom.animate({
				"width": $scope.shape.cw + "px",
				"height": $scope.shape.ch + "px",
				"borderRadius": "50%"},
				{step: function (now, tween) {center();}},
				1000);
		} else{
			console.log(newVal);
			$scope.shape.cw = $scope.shape.dom.width();
			$scope.shape.ch = $scope.shape.dom.height();
			$scope.shape.dom.animate({
				"width": $scope.shape.rw + "px",
				"height": $scope.shape.rh + "px",
				"borderRadius": "0%"},
				{step: function (now, tween) {center();}},
				1000);
		};
	});
	$('#reset').click(function () {
		var original = 400;
		$scope.imgSrc="";
		$scope.usrTxt = "";
		$scope.shape.bg = "ffffff";
		$scope.shape.rw = original;
		$scope.shape.rh = original;
		$scope.shape.cw = original;
		$scope.shape.ch = original;
		$scope.shape.dom.animate({
			width: original + "px",
			height: original + "px",
			backgroundColor: "ffffff"},
			{step: function (now, tween) {center();},
			complete: function () {$scope.$digest();}},
			1000);

	});

	$(window).resize(function(){
	   center(); 
	});

	function center () {
		$scope.shape.dom.position({
			my: "center center",
			at: "center center",
			of: "#editorCanvas"
		})
	};
});



