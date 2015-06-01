Router.route('/first', function() {
  this.render('firsts');

});

Router.route('/', function() {
  this.render('first');
});