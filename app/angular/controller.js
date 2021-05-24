var app = angular.module("MTW-App", [])

app.controller("risk-controller", ["$scope",function($scope){
 $scope.nombre = "Arturo";
 $scope.nuevoCapital = {};
 $scope.capitales = [
    
  ];
 $scope.agregarCapital = function() {
   $scope.capitales.push($scope.nuevoCapital);
   $scope.nuevoCapital = {};
  }

  




}])