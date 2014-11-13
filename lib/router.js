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
  
  this.route('postsByAuthor',{
    path:'/author/:author',
    date: function(){
      return {author:this.params.author};
    }
  });
  
  this.route('postSubmit',{
    path:'/new' 
  });

});


var requireLogin = function() {
  if (!Meteor.user()){
    this.render('accessDenied');
    this.pause();    
  }
};

Router.onBeforeAction(requireLogin, {only:'postSubmit'});

  
