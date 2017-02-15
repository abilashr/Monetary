monetaryApp.controller('monetaryCtrl', ['$scope', 'coinageService', ($scope, coinageService) => {
	$scope.convert = () => {
		$scope.isValid = true;
		if($scope.amount){
			$scope.coinage = coinageService.convert($scope.amount);
		}else{
			$scope.isValid = false;
		}
		$scope.amount = "test";
	};
}]);
