var postsData = [
  
  {
    title: "Moby Dick",
    author: "Herman Melville",
    url: "http://google.com"
  },
  
   {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    url: "http://yahoo.com"
  },
  
  {
    title: "Cujo",
    author: "Stephen King",
    url: "http://espn.com"
  },
    {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    url: "http://hotmail.com"
  },
    {
    title: "The Lion, the witch, and the wardrobe",
    author: "C.S. Lewis",
    url: "http://facebook.com"
  }
  
];
  
Template.postsList.helpers ({
  //posts: postsData
  posts: function(){
    return Posts.find();
  }
  });
 
  
  
  
