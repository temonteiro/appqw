angular.module('starter.controllers', [])

.value('scopeVars', {
		jobs: []
})

.controller('JobsDaily',['$scope', '$http', '$rootScope', 'cordovaGoogleAnalytics',function($scope, $http, $rootScope,$cordovaGoogleAnalytics){
	$scope.jobs = {};
	//Exibindo o loading
  $scope.loading = true;
  $cordovaGoogleAnalytics.startTrackerWithId("UA-59894750-1");
  console.log($cordovaGoogleAnalytics);

	var qwHttpRequest = function() {
	
			$http({
				method:'GET',
				url: 'http://queroworkar.com.br/blog/wp-json/wp/v2/jobs/?_embed',
			})
			.success(function(data){
				$scope.jobs = data;
				$rootScope.jobs = data;
				//Removendo o loading
				$scope.loading = false;

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

.controller('Contact',['$scope', '$http', '$rootScope', function($scope, $http, $rootScope){
	var whatToDo = this;

/**
 * Sends an email using Email composer with attachments plugin and using
 * parameter email.
 *
 * @param email
 */
whatToDo.sendEmail = function (email) {
  if (window.plugins && window.plugins.emailComposer) { //check if plugin exists

    window.plugins.emailComposer.showEmailComposerWithCallback(function (result) {
        //console.log("Email sent successfully");
      },

      "Feedback APP QueroWorkar",        // Subject
      null,        // Body
      [email],     // To (Email to send)
      null,        // CC
      null,        // BCC
      false,       // isHTML
      null,        // Attachments
      null);       // Attachment Data
  }

}
}])

.controller('JobDetails',['$scope', '$rootScope','$stateParams', function($scope, $rootScope, $stateParams){
		$scope.jobs = $rootScope.jobs[$stateParams.jobsId];

		$scope.OtherShare=function(){
	      window.plugins.socialsharing.share("[QueroWorkar] "+$scope.jobs.title.rendered, $scope.jobs.featured_image,
				$scope.jobs.link , null, function(errormsg){alert("Error: Cannot Share")});
	  }

}])

.controller('BlogDaily',['$scope', '$http', '$rootScope',function($scope, $http, $rootScope){
	$scope.blog = {};
	//Exibindo o loading
  $scope.loading = true;
	var qwHttpRequest = function() {
			$http({
				method:'GET',
				url: 'http://queroworkar.com.br/blog/wp-json/wp/v2/posts/',
			})
			.success(function(data){
				$scope.blog = data;
				$rootScope.blog = data;
				//Removendo o loading
				$scope.loading = false;
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

	$scope.OtherShare=function(){
			window.plugins.socialsharing.share("[QueroWorkar] "+$scope.blog.title.rendered, $scope.blog.featured_image,
			$scope.jobs.link , null, function(errormsg){alert("Error: Cannot Share")});
	}
}]);
