angular.module('starter.controllers', [])

.value('scopeVars', {
		jobs: []
})

.controller('JobsDaily',['$scope', '$http', '$rootScope', function($scope, $http, $rootScope){
	$scope.jobs = {};

	var qwHttpRequest = function() {
			$http({
				method:'GET',
				url: 'http://queroworkar.com.br/blog/wp-json/wp/v2/jobs/?_embed',
			})
			.success(function(data){
				$scope.jobs = data;
				$rootScope.jobs = data;
			})
			.finally(function(){
				$scope.$broadcast('scroll.refreshComplete');
			});
	}

	$scope.doRefresh = function() {
		qwHttpRequest();
	}

	qwHttpRequest();
}])

.controller('JobDetails',['$scope', '$rootScope','$stateParams', function($scope, $rootScope, $stateParams){
	$scope.jobs = $rootScope.jobs[$stateParams.jobsId];
}])

.controller('BlogDaily',['$scope', '$http', '$rootScope',function($scope, $http, $rootScope){
	$scope.blog = {};

	var qwHttpRequest = function() {
			$http({
				method:'GET',
				url: 'http://queroworkar.com.br/blog/wp-json/wp/v2/posts/',
			})
			.success(function(data){
				$scope.blog = data;
				$rootScope.blog = data;
			})
			.finally(function(){
				$scope.$broadcast('scroll.refreshComplete');
			});
	}

	$scope.doRefresh = function() {
		qwHttpRequest();
	}

	qwHttpRequest();
}])

.controller('PostDetails',['$scope', '$http', '$stateParams', '$rootScope', function($scope, $http, $stateParams, $rootScope){
	$scope.blog = $rootScope.blog[$stateParams.postId];
}]);
