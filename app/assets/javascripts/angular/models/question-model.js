app.factory('Question',function($resource) {
  return $resource(
    '/quizzes/:quiz_id/questions/:id',
    {id:'@id', quiz_id:'@quiz_id'},
    {update:{method:'PATCH'}}
  );
});