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
      // increment the counter when button is clicked
      var text = event.target.text.value;
      console.log(text);
     $.getJSON("http://api.themoviedb.org/3/search/person?api_key=bc8d6eb8376311f84080885ca58a2fd8&query= "+ text).then(function (json){
      alert(json.results[0].id);
     })
     event.target.text.value = '';
      return false;
  }
  });
}

Meteor.methods({
    firstOne: function(text){
      Firsts.insert({
        text:text
      });
    }
  });