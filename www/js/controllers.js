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

.controller('Contact',['$scope', function($scope){

		$scope.sendEmail = function() {
			window.plugins.socialsharing.shareViaEmail(null,'Feedback APP QueroWorkar','thalita.monteiro@queroworkar.com.br');
		};

}])

.controller('JobDetails',['$scope', '$rootScope','$stateParams','$ionicActionSheet', function($scope, $rootScope,
				$stateParams,$ionicActionSheet){
		$scope.jobs = $rootScope.jobs[$stateParams.jobsId];

		$scope.showActionsheet = function() {

				$ionicActionSheet.show({
				titleText: 'Compartilhar com...',
				buttons: [
					{ text: '<i class="icon ion-social-twitter"></i> Twitter' },
					{ text: '<i class="icon ion-social-facebook"></i> Facebook' },
					{ text: '<i class="icon ion-social-whatsapp"></i> WhatsApp' },
					{ text: '<i class="icon ion-android-share-alt"></i> Compartilhar' },
				],
				cancelText: 'Cancelar',
				cancel: function() {
					console.log('CANCELLED');
				},
				buttonClicked: function(index) {
					switch (index){
						case 0 :
							window.plugins.socialsharing.shareViaTwitter("[QueroWorkar] "+$scope.jobs.title.rendered, null,	$scope.jobs.link);
							return true;
						case 1 :
							window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint(null, null,	$scope.jobs.link, "[QueroWorkar] "+$scope.jobs.title.rendered);
							return true;
						case 2:
						 window.plugins.socialsharing.shareViaWhatsApp("[QueroWorkar] "+$scope.jobs.title.rendered, null,	$scope.jobs.link, null);
						 return true;
						 case 3:
						 window.plugins.socialsharing.share(null, null,	$scope.jobs.link);
					}
				}
			});
		};

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

.controller('PostDetails',['$scope', '$http', '$stateParams', '$rootScope','$ionicActionSheet', function($scope, $http,
				$stateParams, $rootScope,$ionicActionSheet){
	$scope.blog = $rootScope.blog[$stateParams.postId];

	$scope.showActionsheet = function() {

	$ionicActionSheet.show({
			titleText: 'Compartilhar com...',
			buttons: [
				{ text: '<i class="icon ion-social-twitter"></i> Twitter' },
				{ text: '<i class="icon ion-social-facebook"></i> Facebook' },
				{ text: '<i class="icon ion-social-whatsapp"></i> WhatsApp' },
				{ text: '<i class="icon ion-android-share-alt"></i> Compartilhar' },
			],
			cancelText: 'Cancelar',
			cancel: function() {
				console.log('CANCELLED');
			},
			buttonClicked: function(index) {
				switch (index){
					case 0 :
						window.plugins.socialsharing.shareViaTwitter("[QueroWorkar] "+$scope.blog.title.rendered, null,	$scope.blog.link);
						return true;
					case 1 :
						window.plugins.socialsharing.shareViaFacebookWithPasteMessageHint(null, null,	$scope.blog.link, "[QueroWorkar] "+$scope.blog.title.rendered);
						return true;
					case 2:
					 window.plugins.socialsharing.shareViaWhatsApp("[QueroWorkar] "+$scope.blog.title.rendered, null,	$scope.blog.link, null);
					 return true;
					 case 3:
					 window.plugins.socialsharing.share(null, null,	$scope.blog.link);
				}
			}
		});
	};
}]);
