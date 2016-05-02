angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('JobsDaily',['$scope', '$http',function($scope, $http){
	$scope.jobs = {};

	$http({
		method:'GET',
		url: 'http://queroworkar.com.br/blog/wp-json/wp/v2/jobs',

	}).success(function(data){
		$scope.jobs = data;
	});

}])

.controller('JobDetails',['$scope', '$http', '$stateParams', function($scope, $http, $stateParams){
	$scope.jobs = {};

	$http({
		method:'GET',
		url: 'http://queroworkar.com.br/blog/wp-json/wp/v2/jobs/' + $stateParams.jobsId,
    cache: true

	}).success(function(data){
		$scope.jobs = data;
	});


}])

.controller('BlogDaily',['$scope', '$http',function($scope, $http){
	$scope.blog = {};

	$http({
		method:'GET',
		url: 'http://queroworkar.com.br/blog/wp-json/wp/v2/posts/',

	}).success(function(data){
		$scope.blog = data;
	});

}])

.controller('PostDetails',['$scope', '$http', '$stateParams', function($scope, $http, $stateParams){
	$scope.blog = {};

	$http({
		method:'GET',
		url: 'http://queroworkar.com.br/blog/wp-json/wp/v2/posts/' + $stateParams.postId,
    cache: true

	}).success(function(data){
    $scope.blog = data;
	});


}]);
