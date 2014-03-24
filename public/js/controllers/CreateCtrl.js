angular.module('CreateCtrl', []).controller('CreateController', function($scope) {
	$scope.shape = {};
	$scope.shape.dom = $('#shape');
	$scope.shape.domWOverflow = $('#shape, #overflow');
	$scope.shape.type = "rectangle";
	$scope.shape.bg = "ffffff";
	$scope.shape.rw = $scope.shape.dom.css("width");
	$scope.shape.rh = $scope.shape.dom.css("height");
	$scope.shape.cw = $scope.shape.dom.css("width");
	$scope.shape.ch = $scope.shape.dom.css("height");
	$scope.text = {};
	$scope.text.dom = $('div#text');
	$scope.text.value = "asd";
	$scope.text.font = {};
	$scope.text.font.list = ["Open Sans", "Ubuntu Mono", "Sofadi One", "Nothing You Could Do", "Gilda Display", "Diplomata", "Playfair Display SC", "Candal", "Herr Von Muellerhoff"];
	$scope.text.font.selected = $scope.text.font.list[0];
	$scope.text.sizes = [10,15,20,22,24,26,28,30,32,34,36,38,40,42,50,60,70,80];
	$scope.text.size = $scope.text.sizes[2];
	$scope.uid = 1;
	$scope.image = {};
	$scope.image.images = [ {"type": "Popular", "route": "images/popular/",
							"details": [{"src": "fry.jpg", "alt": "fry"},
										{"src": "interesting.png", "alt": "interesting"},
										{"src": "raptor.jpg", "alt": "raptor"},
										{"src": "success.jpg", "alt": "succes"}]},
							{"type": "Your images", "route": "images/user/" + $scope.uid + "/",
							"details": []}];
	$scope.image.wrapperDom = $('#user-image-wrapper');
	$scope.image.dom = $('#user-image')
	$scope.image.src="";

	$scope.$on('$routeChangeSuccess', function () {
		center();
		$scope.text.dom.draggable({
			containment: "parent"
		});
		$scope.shape.dom.resizable({
			minWidth: 50,
			minHeight: 50,
			maxWidth: $('#editorCanvas').width(),
			maxHeight: 500,
			handles: "se",
			resize: function (event, ui) {center();},
			stop: function (event, ui) {center();centerText();}
		});
		$('.dropdown-toggle').dropdown();
		reset()	
		$('#reset').click(function(){reset()});
		$('.dropdown-menu').click(function(element) {
			element.stopPropagation();
		});
		$('.dropdown-toggle').click(function() {
			$('.thumbnail').click(function(){
				var pos = null;
				if ($scope.image.src !== "") {
					$scope.image.dom.resizable("destroy");
				};
				$scope.image.src = $(this).children().attr('src');
				$scope.$apply();
				$scope.image.dom.css({height: "200px", width: "auto", opacity: "100"});
				$scope.image.dom.resizable({
					minWidth: 50,
					minHeight: 50,
					maxWidth: $('#editorCanvas').width(),
					maxHeight: 500,
					handles: "se",
					aspectRatio: true,
					stop: function(){centerText()}
				});
				$scope.image.wrapperDom.draggable();
				centerText();
			})
		});
	});



	$scope.$watch('shape.type',function (newVal,oldVal) {
		if (newVal === "circle") {
			$scope.shape.rw = $scope.shape.dom.css("width");
			$scope.shape.rh = $scope.shape.dom.css("height");
			$scope.shape.dom.animate({
				"width": $scope.shape.cw,
				"height": $scope.shape.ch},
				{step: function (now, tween) {center();}},
				500);
			$scope.shape.domWOverflow.animate({
				"borderTopLeftRadius": "50%", 
				"borderTopRightRadius": "50%", 
				"borderBottomLeftRadius": "50%", 
				"borderBottomRightRadius": "50%"},
				500);
		} else {
			$scope.shape.cw = $scope.shape.dom.css("width");
			$scope.shape.ch = $scope.shape.dom.css("height");
			$scope.shape.dom.animate({
				"width": $scope.shape.rw,
				"height": $scope.shape.rh},
				{step: function (now, tween) {center();}},
				500);
			$scope.shape.domWOverflow.animate({
				"borderTopLeftRadius": "0%", 
				"borderTopRightRadius": "0%", 
				"borderBottomLeftRadius": "0%", 
				"borderBottomRightRadius": "0%"},
				500);
		};
	});

	$(window).resize(function(){
		center();
	});

	function reset () {
		var original = 400;
		$scope.text.value = "asd";
		$scope.text.font.selected = $scope.text.font.list[0];
		//$scope.text.size = $scope.text.sizes[2];
		$scope.text.dom.animate({
			fontSize: $scope.text.sizes[2]
		});
		$scope.text.size = $scope.text.sizes[2];
		$scope.image.dom.animate({
			opacity: 0
		});
		$scope.image.src = "";
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
			complete: function () {
				$scope.$digest();
				centerText();
			}},
			1000);
	};

	function center () {
		$scope.shape.dom.position({
			my: "center center",
			at: "center center",
			of: "#editorCanvas"
		})
	};
	function centerText () {
		$scope.text.dom.position({
			my: "center center",
			at: "center center",
			of: "#shape",
			using: function(position) {
			       $(this).animate(position);
			   }
		})
	};
});