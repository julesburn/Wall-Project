const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/posts/";
const sequelize = require("../../src/db/models/index").sequelize;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("routes : posts", () => {

  beforeEach((done) => {
    this.post;
    this.user;
    sequelize.sync({force: true}).then((res) => {

      User.create({
        username: "SirJeanLuc",
        email: "starman@tesla.com",
        password: "Trekkie4lyfe",
      })
      .then((user) => {
        this.user = user;

        Post.create({
          title: "The Best Post",
          body: "This is the best post!",
          userId: this.user.id
        
        }, {})
        .then((post) => {
          this.post = post;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      })
    });
  });


  describe("GET /posts", () => {

    it("should return a status code 200 and all posts", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Posts");
        expect(body).toContain("The Best Post");
        done();
      });
    });
  });

  describe("GET /posts/new", () => {

    it("should render a new post form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Post");
        done();
      });
    });


      describe("POST /posts/create", () => {

        it("should create a new post and redirect", (done) => {
          const options = {
            url: `${base}/create`,
            form: {
              title: "Watching snow melt",
              body: "Without a doubt my favoriting things to do besides watching paint dry!"
            }
          };
          request.post(options,
            (err, res, body) => {
              if (err) {
                console.log("This is the error: ", err)
              }
              Post.findOne({where: {title: "Watching snow melt"}})
              .then((post) => {
                expect(post).not.toBeNull();
                expect(post.title).toBe("Watching snow melt");
                expect(post.body).toBe("Without a doubt my favoriting things to do besides watching paint dry!");
                done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          }
        );
      });
    });

    describe("GET /posts/:id", () => {

      it("should render a view with the selected post", (done) => {
        request.get(`${base}${this.post.id}`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Posts");
          done();
        });
      });
    });

    describe("POST /posts/:id/destroy", () => {

      it("should delete the post with the associated ID", (done) => {
 
        Post.findAll()
        .then((posts) => {
 
          const postCountBeforeDelete = posts.length;
 
          expect(postCountBeforeDelete).toBe(1);
 
          request.post(`${base}${this.post.id}/destroy`, (err, res, body) => {
            Post.findAll()
            .then((posts) => {
              expect(err).toBeNull();
              expect(posts.length).toBe(postCountBeforeDelete - 1);
              done();
            })
          });
        });
      });
    });

    describe("GET /posts/:id/edit", () => {

      it("should render a view with an edit post form", (done) => {
        request.get(`${base}${this.post.id}/edit`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Edit Post");
          expect(body).toContain("Posts");
          done();
        });
      });
    });
    
    describe("POST /posts/:id/update", () => {

      it("should update the post with the given values", (done) => {
         const options = {
            url: `${base}${this.post.id}/update`,
            form: {
              title: "JavaScript Frameworks",
              description: "There are a lot of them",
              userId: this.user.id
            }
          };
          request.post(options,
            (err, res, body) => {
 
            expect(err).toBeNull();
            Post.findOne({
              where: { id: this.post.id }
            })
            .then((post) => {
              expect(post.title).toBe("JavaScript Frameworks");
              done();
            });
          });
      });
    });

  });
});