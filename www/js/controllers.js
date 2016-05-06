angular.module('starter.controllers', [])

.value('scopeVars', {
		jobs: []
})

.controller('JobsDaily',['$scope', '$http', '$rootScope', function($scope, $http, $rootScope){
	$scope.jobs = {};

	$http({
		method:'GET',
		url: 'http://queroworkar.com.br/blog/wp-json/wp/v2/jobs/?_embed',

	}).success(function(data){
		$scope.jobs = data;
		$rootScope.jobs = data;
	});

}])

.controller('JobDetails',['$scope', '$rootScope','$stateParams', function($scope, $rootScope, $stateParams){
	//$scope.jobs = {};

	//console.log($stateParams);
	//console.log($rootScope.jobs);
	//console.log($rootScope.jobs[$stateParams.jobsId]);

	$scope.jobs = $rootScope.jobs[$stateParams.jobsId];

/*
	$http({
=======
  $http({
>>>>>>> master
		method:'GET',
		url: 'http://queroworkar.com.br/blog/wp-json/wp/v2/jobs/' + $stateParams.jobsId + '?_embed',
    cache: true

	}).success(function(data){
		//$scope.jobs = data;
	});
*/

}])

.controller('BlogDaily',['$scope', '$http', '$rootScope',function($scope, $http, $rootScope){
	$scope.blog = {};

	$http({
		method:'GET',
		url: 'http://queroworkar.com.br/blog/wp-json/wp/v2/posts/',

	}).success(function(data){
		$scope.blog = data;
		$rootScope.blog = data;
	});

}])

.controller('PostDetails',['$scope', '$http', '$stateParams', '$rootScope', function($scope, $http, $stateParams, $rootScope){
	$scope.blog = $rootScope.blog[$stateParams.postId];

	/*$http({
		method:'GET',
		url: 'http://queroworkar.com.br/blog/wp-json/wp/v2/posts/' + $stateParams.postId,
    cache: true

	}).success(function(data){
    $scope.blog = data;
	}); */


}]);
