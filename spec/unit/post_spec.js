const sequelize = require("../../src/db/models/index").sequelize;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("Post", () => {

    beforeEach((done) => {
        this.post;
        this.user;
   
        sequelize.sync({force: true}).then((res) => {
   
          User.create({
            username: "SirJeanLuc",
            email: "starman@tesla.com",
            password: "Trekkie4lyfe"
          })
          .then((user) => {
            this.user = user; //store the user
   
            Post.create({

                title: "My first visit to Proxima Centauri b",
                body: "I saw some rocks.",
                userId: this.user.id
            })
          })
        });
      });
});
    