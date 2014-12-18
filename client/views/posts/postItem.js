Template.postItem.helpers({
  myImage: function(){
    return Images.findOne({_id: this.imageId});
  },
  ownPost: function() {
    return this.userId === Meteor.userId();
  },
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  commentsCount: function() {
    return Comments.find({postId: this._id}).count();
  }

});

Template.postItem.rendered = function() {
  return Holder.run();
};