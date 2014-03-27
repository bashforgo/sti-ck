angular.module('CreateCtrl', []).controller('CreateController', function($scope, $http, $location, Signin) {

	$scope.shape = {};
	$scope.shape.element = $('#shape');
	$scope.shape.elementWOverflow = $('#shape, #overflow');
	$scope.shape.type = "rectangle";
	$scope.shape.bg = "ffffff";
	$scope.shape.rw = $scope.shape.element.css("width");
	$scope.shape.rh = $scope.shape.element.css("height");
	$scope.shape.cw = $scope.shape.element.css("width");
	$scope.shape.ch = $scope.shape.element.css("height");
	$scope.text = {};
	$scope.text.element = $('div#text');
	$scope.text.value = "asd";
	$scope.text.font = {};
	$scope.text.font.list = ['Open Sans','Ubuntu Mono','Sofadi One','Nothing You Could Do','Gilda Display','Diplomata','Playfair Display SC','Candal','Herr Von Muellerhoff'];
	$scope.text.font.selected = $scope.text.font.list[0];
	$scope.text.sizes = [10,15,20,22,24,26,28,30,32,34,36,38,40,42,50,60,70,80];
	$scope.text.size = $scope.text.sizes[2];
	$scope.text.color = "000000";
	$scope.image = {};
	// $scope.image.file = {};
	// $scope.image.file.name = "image";
	$scope.image.images = [ {"type": "Popular", "route": "images/popular/",
							"details": [{"src": "fry.jpg", "alt": "fry"},
										{"src": "interesting.png", "alt": "interesting"},
										{"src": "raptor.jpg", "alt": "raptor"},
										{"src": "success.jpg", "alt": "succes"}]},
							{"type": "Custom image", "route": "image/",
							"details": []}];
	$scope.image.wrapperElement = $('#user-image-wrapper');
	$scope.image.element = $('#user-image')
	$scope.image.src="";
	$scope.form = {};
	$scope.formerror = false;
	$scope.orderDone = false;


	$scope.$on('$routeChangeSuccess', function () {
		$scope.form.username = "";
		$scope.getUsername();

		center();
		$scope.text.element.draggable({
			containment: "parent"
		});
		$scope.shape.element.resizable({
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
				setImage($(this));
			})
		});

		$('#upload-trigger').tooltip();

		$scope.dropzone = new Dropzone('#upload-trigger, body', {
			url: '/image',
			paramName: 'image',
			maxFiles: 1,
			acceptedFiles: 'image/*',
			clickable: '#upload-trigger',
			success: function (image, res) {
				setImage(false, res);
			}
		});
		$scope.dropzone.on("complete", function() {
			$scope.dropzone.removeAllFiles();
		});

		$('#signin-modal').on('hide.bs.modal', function () {
			$scope.getUsername();
		});

		$('#order-modal').modal({
			show: false
		});

		$('#order-modal').on('shown.bs.modal', function () {
			$('input[name="sticker-name"]').focus();
		});

		$('.order-input').keypress(function(e){
			if ($scope.orderForm.$valid && e.which == 13) {
				$scope.sendOrder();
			}
		});

	});

	$scope.$watch('shape.type',function (newVal,oldVal) {
		if (newVal === "circle") {
			$scope.shape.rw = $scope.shape.element.css("width");
			$scope.shape.rh = $scope.shape.element.css("height");
			$scope.shape.element.animate({
				"width": $scope.shape.cw,
				"height": $scope.shape.ch},
				{step: function (now, tween) {center();}},
				500);
			$scope.shape.elementWOverflow.animate({
				"borderTopLeftRadius": "50%", 
				"borderTopRightRadius": "50%", 
				"borderBottomLeftRadius": "50%", 
				"borderBottomRightRadius": "50%"},
				500);
		} else {
			$scope.shape.cw = $scope.shape.element.css("width");
			$scope.shape.ch = $scope.shape.element.css("height");
			$scope.shape.element.animate({
				"width": $scope.shape.rw,
				"height": $scope.shape.rh},
				{step: function (now, tween) {center();}},
				500);
			$scope.shape.elementWOverflow.animate({
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

	$scope.getUsername = function () {
		Signin.isSignedIn(function (user) {
			if (user!=1) {
				$scope.form.username = user;
				console.log($scope.form);
			}
		});
	}

	$scope.sendOrder = function () {
		$http.post('/order',$scope.form).
			success(function (data) {
				$scope.formerror = false;
				$('#order-modal').modal('hide');
				$scope.orderDone = true;
				setTimeout(function() {
					$('#order-modal').modal('show');
				},1000)
			}).
			error(function (data) {
				$scope.formerror = true;
			})
	}

	function setImage (elem, res) {
		if ($scope.image.src !== "") {
			$scope.image.element.resizable("destroy");
		};
		$scope.image.src = ""
		$scope.$apply();
		if (elem) {
			$scope.image.src = elem.children().attr('src');
		} else {
			$scope.image.src = res.substr(7);
		}
		$scope.$apply();
		setTimeout(function(){
			$scope.image.element.css({height: "200px", width: "auto", opacity: "100"});
			$scope.image.element.resizable({
				minWidth: 50,
				minHeight: 50,
				maxWidth: $('#editorCanvas').width(),
				maxHeight: 500,
				handles: "se",
				aspectRatio: true,
				stop: function(){centerText()}
			});
			$scope.image.wrapperElement.draggable();
			centerText();			
		},300)
	}


	function reset () {
		var original = 400;
		$scope.text.value = "asd";
		$scope.text.font.selected = $scope.text.font.list[0];
		//$scope.text.size = $scope.text.sizes[2];
		$scope.text.element.animate({
			fontSize: $scope.text.sizes[2]
		});
		$scope.text.size = $scope.text.sizes[2];
		$scope.text.color = "000000"
		$scope.image.element.animate({
			opacity: 0
		});
		$scope.image.src = "";
		$scope.shape.bg = "ffffff";
		$scope.shape.rw = original;
		$scope.shape.rh = original;
		$scope.shape.cw = original;
		$scope.shape.ch = original;
		$scope.shape.element.animate({
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
		$scope.shape.element.position({
			my: "center center",
			at: "center center",
			of: "#editorCanvas"
		})
	};
	function centerText () {
		$scope.text.element.position({
			my: "center center",
			at: "center center",
			of: "#shape",
			using: function(position) {
			       $(this).animate(position);
			   }
		})
	};
});