var monetaryApp = angular.module("monetaryApp", ["ui.router"])
    .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
        $stateProvider
          .state("coinage", {
              url: "/",
              templateUrl: "monetary/monetary.html",
              controllerAs: "monetaryCtrl"
          })
          $urlRouterProvider.otherwise("/");
    }])

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

monetaryApp.factory('coinageService', () => {

    let coinageObj = {};

    const COINS = [
        {id: 1,label: '1p'},
        {id: 2,label: '2p'},
        {id: 20,label: '20p'},
        {id: 50,label: '50p'},
        {id: 100,label: '£1'},
        {id: 200,label: '£2'}
    ];

    coinageObj.convert = (input)  => {
        return coinageObj.getMinimumCoins(coinageObj.normalizeInput(input));
    };

    coinageObj.normalizeInput = (input) => {

        const CURRENCY      = ['£', 'p', /\.$/];
        let pounds          = false;
        let inputItem       = input.trim();
        let matches;

        if (inputItem.indexOf('£') !== -1) {
          pounds = true;
        }

        CURRENCY.map(x => inputItem = inputItem.replace(x, ''));

        matches = /^([\d]+(?:\.[\d]+)?)$/.exec(inputItem);

        if (matches) {
          var match = matches[1];
          if (pounds || (match.indexOf('.') !== -1)) {
            return parseInt(Math.round(match * Math.pow(10, 2)));
          } else {
            return parseInt(match);
          }
        }
        return;
    };

    coinageObj.getMinimumCoins = (input) => {

		const COIN_ARR  = [200, 100, 50, 20, 2, 1];
        let coinage     = [];
        let i           = 0;
		let pennies;

		if (input) {
            pennies = parseInt(input);
        }

        COIN_ARR.map(val => {
            i = Math.floor(pennies / val);
            if (i > 0) {
                pennies -= i * val;
                coinage.push({
                    coin: getAmountValue(val),
                    count: i
                });
            }
        });
        return coinage;
    };

    getAmountValue = (input) => {
    	let lbl = '';
        COINS.filter(x => x.id === input).map(x => lbl = x.label);
    	return lbl;
    };
    return coinageObj;
});
