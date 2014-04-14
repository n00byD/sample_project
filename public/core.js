//public/core.js
var nathanMovies = angular.module('nathanMovies', []);

function mainController($scope, $http) {
	$scope.forData = {};

	//when you get to the page get all of the movies and show them 
	$http.get('/api/movies')
		.success(function(data){
			$scope.movies = data;
			console.log(data);
		})
		.error(function(data){
			console.log('Error: ' + data);
		});


	//when when submitting the add form, send the text to node API
	$scope.createMovies = function(){
		$http.post('/api/movies', $scope.formData)
			.success(function(data){
				$scope.formData = {};
				$scope.movies = data;
				console.log(data);
			})

			.error(function(data){
				console.log('Error: '+ data);
			});
	};

	// delete a movie after checking it
	$scope.deleteMovies = function(id){
		$http.delete('/api/movies/'+id)
			.success(function(data){
				$scope.movies = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
			});
	};
	
	

}

