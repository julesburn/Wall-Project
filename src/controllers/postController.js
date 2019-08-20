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
  },

  new(req, res, next){
    res.render("posts/new");
  },

  create(req, res, next){
    let newPost = {
      title: req.body.title,
      body: req.body.body
    };
    postQueries.addPost(newPost, (err, post) => {
      if(err){
        res.redirect(500, "/posts/new");
      } else {
        res.redirect(303, `/posts/${post.id}`);
      }
    });
  },

  show(req, res, next){

         postQueries.getPost(req.params.id, (err, post) => {
    
           if(err || post == null){
             res.redirect(404, "/");
           } else {
             res.render("posts/show", {post});
           }
         });
       },

   destroy(req, res, next){
     postQueries.deletePost(req.params.id, (err, post) => {
       if(err){
         res.redirect(500, `/posts/${post.id}`)
       } else {
         res.redirect(303, "/posts")
       }
     });
   },

   edit(req, res, next){
    postQueries.getPost(req.params.id, (err, post) => {
      if(err || post == null){
        res.redirect(404, "/");
      } else {
        res.render("posts/edit", {post});
      }
    });
  },

  update(req, res, next){
         postQueries.updatePost(req.params.id, req.body, (err, post) => {
    
           if(err || post == null){
             res.redirect(404, `/posts/${req.params.id}/edit`);
           } else {
             res.redirect(`/posts/${post.id}`);
           }
         });
       }
  
}