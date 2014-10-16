app.controller('QuizMenuController',['$scope','$timeout', 'Quiz', 'Question', function($scope, $timeout, Quiz, Question) {
  $scope.quizViewAll = true;
  $scope.questionView = false;
  $scope.scoreView = false;
  $scope.quizzes = Quiz.query();
  $scope.selectQuiz = function(quiz) {
    $scope.quizViewAll = false;
    $scope.questionView = true;
    $scope.currentQuestion = 0;
    $scope.questions = Question.query({quiz_id:quiz.id}, function(questions) {
      for (var i = 0; i < questions.length; i++) {
        questions[i].choices = questions[i].choices.split(';');
      }
      $scope.question = $scope.questions[$scope.currentQuestion]
      $scope.score = 0;
    });
  };
  $scope.answerQuestion = function() {
    if ($scope.currentQuestion === $scope.questions.length) {
      $scope.questionView = false;
      $scope.scoreView = true;
    } else {
      if ($('input:checked').val() === $scope.questions[$scope.currentQuestion].answer) {
        $('.question').append('<h2>Correct!</h2>');
        $scope.score++;
      } else {
        $('.question').append('<h2>Incorrect!</h2>');
      }
      $timeout(function() {
        $('.question').find('h2').remove();
        $scope.question = $scope.questions[++$scope.currentQuestion];
        console.log($scope.question);
      },1000);
    }
  };
  // $scope.showQuestion = function(index) {
  //   $scope.questionView = true;
  //   $scope.question = $scope.questions[index];
  // };
}]);