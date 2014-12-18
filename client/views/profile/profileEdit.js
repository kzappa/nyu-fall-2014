Template.profileEdit.helpers({
  myImage: function(){
    return Images.findOne({_id: this.imageId});
  }
});

Template.profileEdit.helpers({
  myImage: function(){
    return Images.findOne({_id: this.imageId});
  }
});

Template.profileEdit.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var currentProfileId = this._id;
    /*
    var myImage = $(e.target).find('[name=post-image]').get(0).files[0];

    var uploadedImage = Images.insert(myImage, function (error, fileObj) {
      //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      if (error) {
        return alert(error.reason)
      } else {
        console.log("Image Uploaded: " + fileObj._id);
        Posts.update(currentPostId, {$set: {imageId:fileObj._id}}, function(error){
          if(error)
            alert(error.reason)
        });
      }
    });
    */
    
    
    
    var profileProperties = {
      name: $(e.target).find('[name=profile-name]').val(),
      school: $(e.target).find('[name=profile-school]').val(),
      intro: $(e.target).find('[name=profile-intro]').val()
    }
    
    Profiles.update(currentProfileId, {$set: profileProperties}, function(error){
      if (error)
        alert(error.reason);
      
      Router.go('profile', {userId: Meteor.userId()});

    });
  },
  
  'click .delete': function(e) {
    e.preventDefault();
    
    if (confirm("Delete this post?")){
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      Router.go('me');
    }
  },
  
  'click .delete-image': function(e){
    e. preventDefault();
    if (confirm("Delete this image?")){
      var myImageId = this.imageId;
      
      Images.remove(myImageId);
      
      var currentPostId = this._id;
      Posts.update(currentPostId, {$set: {imageId:''}}, function(error){
        if (error)
          alert(error.reason);
      })
    }
  }
});