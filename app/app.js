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
