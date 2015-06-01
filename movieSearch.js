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
      var actor2 = [];
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
     for (b = 0; b<actor1.length; b++){
     $.getJSON("http://api.themoviedb.org/3/movie/"+actor1[b]+"/credits?api_key=bc8d6eb8376311f84080885ca58a2fd8").then(function (data){
        for(e = 0; e<data.cast.length; e++){
          if(!data.cast[e].department){
          var me = data.cast[e].id;
          }
          actor2.push(me);
          console.log(actor2);
        }
        
      })
     }
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