const postQueries = require("../db/queries.posts.js");

module.exports = {
  index(req, res, next){

     postQueries.getAllPosts((err, posts) => {

       if(err){
         res.redirect(500, "static/index");
       } else {
         res.render("posts/index", {posts});
       }
     })
  }
}