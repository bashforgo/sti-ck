//custom directive to check if sticker preview exists
angular.module('errSrcDirective', []).directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        element.attr('src', attrs.errSrc);
      });
    }
  }
});