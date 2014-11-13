Posts = new Meteor.Collection('posts');

Posts.allow({
  insert: function(userId, doc){
    return !! userId; 
  },
  update: function(userId, doc){
    return !! userId;
  }
});

Meteor.methods({
  post: function(postAttributes){
    
    var user = Meteor.user(),
        duplicatePost = Posts.findOne({url: postAttributes.url});
      
    // make sure user is logged in
    if(!user)
      throw new Meteor.Error(401, "You need to be logged in!");
    
    //make sure that postAttributes has a title and a URL
    if(!postAttributes.title)
      throw new Meteor.Error(422, "You need a title!");

    if(!postAttributes.url)
      throw new Meteor.Error(422, "You need a URL!");
      
    //check to make sure that the URL has not already been submitted
    if(postAttributes.url && duplicatePost){
      throw new Meteor.Error(302, "This link has already been posted!", duplicatePost._id);
      }
     
    //grab the right fields, and new fields such as username, time stamp
    var post = _.extend(_.pick(postAttributes, 'url', 'title', 'description'), {
      userID: user._id,
      author: user.username,
      sumbitted: new Date().getTime()
    });
    
    var postId = Posts.insert(post);
    
    return postId;
    
  }
});