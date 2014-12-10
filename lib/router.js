Router.configure({
  layoutTemplate:'layout'
});

Router.map(function() {
  this.route('postsList', {
    path:'/'
  }); 
  
  this.route('aboutPage', {
    path:'/about'    
  });
  
  this.route('contactPage', {
    path:'/contact'    
  });
  
  this.route('postPage', {
      path:'/posts/:_id',
      data:function(){
      return Posts.findOne(this.params._id);
        }
  });
  
  this.route('postEdit', {
      path:'/posts/:_id/edit',
      data:function(){
      return Posts.findOne(this.params._id);
        }
  });
  
  this.route('postsByAuthor',{
    path:'/author/:author',
    data: function(){
      return {author:this.params.author};
    }
  });
  
  this.route('postSubmit',{
    path:'/new' 
  });
  
  this.route("profile", {
    path:"/profile/:userId",
    data: function(){
      return Profiles.findOne({userId: this.params.userId});
    }
    //controller:"ProfileController"
  });
  
  this.route("me", {
    path:"/me",
    data: function(){
      var currentUser = Meteor.user();
      return Profiles.findOne({userId: currentUser._id});
    }
  });

});

var requireLogin = function() {
  if (! Meteor.user())
    this.render('accessDenied');
   
  this.next();
  
};

var checkProfile = function() {
  var currentUser = Meteor.user()
  
  if (!currentUser)
    this.render('accessDenied');
  
  if (currentUser && Profiles.findOne({userId: currentUser._id}))
    this.render('profile');
  
  this.next();
}

Router.onBeforeAction(requireLogin, {only:['postSubmit', 'postEdit']});
Router.onBeforeAction(checkProfile, {only:['me']});

// define the (usually global) loading template
/*
Router.configure({
    loadingTemplate:"loading"
});

// add the dataNotFound plugin, which is responsible for
// rendering the dataNotFound template if your RouteController
// data function returns a falsy value
Router.plugin("dataNotFound",{
    notFoundTemplate: "dataNotFound"
});
*/


  
