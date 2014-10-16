app.factory('Quiz',function($resource) {
  return $resource(
    '/quizzes/:id',
    {id:'@id'},
    {update:{method:'PATCH'}}
  );
});