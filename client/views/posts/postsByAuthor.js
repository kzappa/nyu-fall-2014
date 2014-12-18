Template.postsByAuthor.helpers({  
  posts: function() {
    return Posts.find({author:this.author});
  }
});
  
Template.postPage.helpers({
  comments: function() {
    return Comments.find({postId: this._id});
  }
});