app.controller('QuizMenuController',['$scope', 'Quiz', function($scope, Quiz) {
  $scope.quizViewAll = true;
  $scope.questionView = false;
  $scope.quizzes = Quiz.query();
  
}]);