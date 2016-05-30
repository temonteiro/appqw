angular.module('starter.controllers', [])

.value('scopeVars', {
		jobs: []
})

.controller('JobsDaily',['$scope', '$http', '$rootScope', function($scope, $http, $rootScope){
	$scope.jobs = {};
	//Exibindo o loading
  $scope.loading = true;

	var qwHttpRequest = function() {
		console.log("entrei no metodo");
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

.controller('PostDetails',['$scope', '$http', '$stateParams', '$rootScope', function($scope, $http, $stateParams, $rootScope){
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
}]);
