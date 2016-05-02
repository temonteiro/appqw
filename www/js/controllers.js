angular.module('starter.controllers', [])

.controller('JobsDaily',['$scope', '$http',function($scope, $http){
	$scope.jobs = {};

	$http({
		method:'GET',
		url: 'http://queroworkar.com.br/blog/wp-json/wp/v2/jobs/?_embed',

	}).success(function(data){
		$scope.jobs = data;
	});

}])

.controller('JobDetails',['$scope', '$http', '$stateParams', function($scope, $http, $stateParams){
	$scope.jobs = {};

	$http({
		method:'GET',
		url: 'http://queroworkar.com.br/blog/wp-json/wp/v2/jobs/' + $stateParams.jobsId + '?_embed',
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
