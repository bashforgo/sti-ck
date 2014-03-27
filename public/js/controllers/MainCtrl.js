angular.module('MainCtrl', []).controller('MainController', function($scope, $location, $route, Signin) {

  //init
  $scope.user = "null";
  $scope.error = 0;

  //fetch username
  Signin.isSignedIn(function (user) {
    $scope.handleData(user);
    $('#navigation-links').css({visibility:"visible"});
  })

  //enable modal
  $('#signin-modal').modal({
    show: false
  });

  //focus on input when modal is shown
  $('#signin-modal').on('shown.bs.modal', function () {
    $('#username').focus();
  });

  //trigger sign in
  $('#signup-in').click(function () {
    $scope.signIn();
  });

  //allow enter login
  $('#username, #password').keypress(function(e){
    if (e.which == 13) {
      $scope.signIn();
    }
  });

  //sign in fn
  $scope.signIn = function () {
    Signin.signInUp($('#username').val(),$('#password').val(),function (user) {
      $scope.handleData(user);
      if ($scope.user == "null") {
        $scope.error = 1;
      } else {
        $scope.error = 0;
        $('#username, #password').val('');
      }
    });
  }

  //sign out fn
  $scope.signOut = function () {
    Signin.signOut(function (data) {
      if (data==0) {
        $('#username, #password').val('');
        $location.path("/");
        $scope.user = "null";
        $route.reload();
      }
    })
  }

  //helper fn
  $scope.handleData = function (user) {
    if (user!=1) {
      $scope.user = user;
      $('#signin-modal').modal('hide');
    } 
  }
});