app.factory('Score', function($resource) {
  return $resource(
    '/scores/:id',
    {id:'@id'},
    {post:{method:'POST'}}
  );
});