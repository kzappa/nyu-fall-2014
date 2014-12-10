Template.me.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var myProfile = {
      name : $(e.target).find('[name=profile-name]').val(),
      school : $(e.target).find('[name=profile-school]').val()
    }
    
    Meteor.call('newProfile', myProfile, function(error, result){
      if (error)
        return alert(error.reason);
         
      var profile = Profiles.findOne(result);
      
      Router.go('profile', {userId : profile.userId}); 
  
    }); 
  }
});