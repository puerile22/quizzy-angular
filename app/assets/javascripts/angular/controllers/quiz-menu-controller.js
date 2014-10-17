app.controller('QuizMenuController',['$scope','$timeout', 'Quiz', 'Question', 'Score', function($scope, $timeout, Quiz, Question, Score) {
  $scope.quizViewAll = true;
  $scope.questionView = false;
  $scope.scoreView = false;
  $scope.quizzes = Quiz.query();
  $scope.selectQuiz = function(quiz) {
    $scope.quizViewAll = false;
    $scope.questionView = true;
    $scope.currentQuestion = 0;
    $scope.quiz_id = quiz.id;
    $scope.questions = Question.query({quiz_id:quiz.id}, function(questions) {
      for (var i = 0; i < questions.length; i++) {
        questions[i].choices = questions[i].choices.split(';');
      }
      $scope.question = $scope.questions[$scope.currentQuestion]
      $scope.score = 0;
    });
  };
  $scope.answerQuestion = function() {
    if ($('input:checked').val() === $scope.questions[$scope.currentQuestion].answer) {
      $('.question').append('<h2>Correct!</h2>');
      $scope.score++;
    } else {
      $('.question').append('<h2>Incorrect!</h2>');
    }
    $scope.currentQuestion++;
    $timeout(function() {
      if ($scope.currentQuestion === $scope.questions.length) {
        $scope.questionView = false;
        $scope.scoreView = true;
        $scope.score = ($scope.score/$scope.questions.length *100).toFixed(0);
        Score.post({score:{score:$scope.score,user:$scope.user},quiz_id:$scope.quiz_id});
        $timeout(function(){
          $scope.quizViewAll = true;
          $scope.scoreView = false;
        },1000);
      } else {
        $('.question').find('h2').remove();
        $scope.question = $scope.questions[$scope.currentQuestion];
      }
    },1000);
  };
}]);