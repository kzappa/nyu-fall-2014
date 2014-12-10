Profiles = new Meteor.Collection('profiles');

Profiles.allow({
  update: function(userId, profile){
    return ownsDocument(userId, profile);
  }, 
  remove: function(userId, profile){
    return ownsDocument(userId, profile);     
  }
});

Meteor.methods({
  newProfile: function(myProfile){
    
    var user = Meteor.user();
    
    var duplicateProfile = Profiles.findOne({userId: user._id});
      
    // make sure user is logged in
    if(!user)
      throw new Meteor.Error(401, "You need to be logged in!");
    
    //if current user has a profile, then throw error
    if(user && duplicateProfile){
      throw new Meteor.Error(302, "This user already has a profile!", duplicateProfile._id);
    }
    
    //make sure that myProfile has a name and school
    if(!myProfile.name)
      throw new Meteor.Error(422, "You need a name!");

    if(!myProfile.school)
      throw new Meteor.Error(422, "You need a school!");
     
    //grab the right fields, and new fields such as username, time stamp
    var profile = _.extend(_.pick(myProfile, 'name', 'school'), {
      userId: user._id,
      submitted: new Date().getTime()
    });
    
    var result = Profiles.insert(profile);
    
    return result;
    
  }
});