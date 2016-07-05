angular.module('starter.controllers', [])

.value('scopeVars', {
		jobs: []
})


.controller('JobsDaily',['$scope', '$http', '$rootScope','$ionicPopover',function($scope, $http, $rootScope,$ionicPopover){

	var qwHttpRequest = function() {
		//Exibindo o loading
	  $scope.loading = true;

		// Tipos de Job
		$scope.job_types = {};
		// Jobs
		$scope.jobs = {};

		// Request para as categorias
		$http({
			method: 'GET',
			url: 'http://queroworkar.com.br/blog/wp-json/wp/v2/job_type?per_page=30'
		})
		.success(function(data){
			$scope.job_types = data;
			$rootScope.job_types = data;
		});

		// Ultimos Jobs
		var jobsRequestUrl = 'http://queroworkar.com.br/blog/wp-json/wp/v2/jobs/?_embed';
		var viewTitle = '<span class="view-title">Vagas</span>';
		if ($rootScope.jobTypeId) {
			// Ultimos Jobs
			jobsRequestUrl += '&job_type='+$rootScope.jobTypeId;
			viewTitle += '<span class="view-subtitle"> - ' + $rootScope.jobTypeName + '</span>';
		}
		$scope.viewtitle = viewTitle;

		$http({
			method:'GET',
			url: jobsRequestUrl,
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

	// Menu das categorias
	$ionicPopover.fromTemplateUrl('templates/submenu/job_types.html', {
		scope: $scope,
	}).then(function(popover) {
		$scope.popover = popover;
	});

  // Pulldow to Refresh
	$scope.doRefresh = function() {
		qwHttpRequest();
	}

	$scope.loadJobsFromType = function ($jobType) {
		$rootScope.jobTypeId = $jobType.id;
		$rootScope.jobTypeName = $jobType.name
		$scope.popover.hide();
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

.controller('BlogDaily',['$scope', '$http', '$rootScope', '$ionicPopover', function($scope, $http, $rootScope, $ionicPopover){

	var qwHttpRequest = function() {
		//Exibindo o loading
	  $scope.loading = true;

		// Categorias
		$scope.categories = {};
		// Posts
		$scope.blog = {};

		// Request para as categorias
		$http({
			method: 'GET',
			url: 'http://queroworkar.com.br/blog/wp-json/wp/v2/categories?per_page=30'
		})
		.success(function(data){
			$scope.categories = data;
			$rootScope.categories = data;
		});

		// Ultimas noticias
		var postsRequestUrl = 'http://queroworkar.com.br/blog/wp-json/wp/v2/posts/';
		var viewTitle = '<span class="view-title">Blog</span>';
		if ($rootScope.catId) {
			// Ultimas noticias da categoria
			postsRequestUrl += '?categories='+$rootScope.catId;
			viewTitle += '<span class="view-subtitle"> - ' + $rootScope.catName + '</span>';
		}
		$scope.viewtitle = viewTitle;

		// Request para os posts
		$http({
			method:'GET',
			url: postsRequestUrl,
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

	// Menu das categorias
	$ionicPopover.fromTemplateUrl('templates/submenu/categorias.html', {
		scope: $scope,
	}).then(function(popover) {
		$scope.popover = popover;
	});

  // Pulldow to Refresh
	$scope.doRefresh = function() {
		qwHttpRequest();
	}

	$scope.loadPostsFromCategory = function ($cat) {
		$rootScope.catId = $cat.id;
		$rootScope.catName = $cat.name;
		$scope.popover.hide();
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
