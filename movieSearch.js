Firsts = new Mongo.Collection("firsts");
var text;

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


//"http://api.themoviedb.org/3/search/person/query="+ text+ "&api_key=bc8d6eb8376311f84080885ca58a2fd8"

if (Meteor.isClient) {

  Template.body.helpers({
    firsts: function(){
      return Firsts.find({});
    }
  });

  Template.body.events({
    'submit .firstOne': function () {
      var actor1= [];
      // increment the counter when button is clicked
      var text = event.target.text.value;
      console.log(text);
     $.getJSON("http://api.themoviedb.org/3/search/person?api_key=bc8d6eb8376311f84080885ca58a2fd8&query= "+ text).then(function (json){
      var id = json.results[0].id;
      console.log(id);
      $.getJSON("http://api.themoviedb.org/3/person/"+id+"/movie_credits?api_key=bc8d6eb8376311f84080885ca58a2fd8").then(function (data){
       for (i = 0; i <data.cast.length; i++){
       actor1.push(data.cast[i].id);

     }
     console.log(actor1);
     })
  });
     event.target.text.value = '';
      return false;
}
})
}

Meteor.methods({
    firstOne: function(text){
      Firsts.insert({
        text:text
      });
    }
  });