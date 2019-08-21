module.exports = {
    init(app){
      const staticRoutes = require("../routes/static");
      const postRoutes = require("../routes/posts");
      const userRoutes = require("../routes/users");

      app.use(staticRoutes);
      app.use(userRoutes);
      app.use(postRoutes);
    }
  }