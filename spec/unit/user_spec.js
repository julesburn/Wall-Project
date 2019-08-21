const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;

describe("User", () => {

  beforeEach((done) => {
// #1
    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });

  });

  describe("#create()", () => {

    it("should create a User object with a username, an email, and a password", (done) => {
      User.create({
        username: "JoeUser",
        email: "user@example.com",
        password: "1234567890"
      })
      .then((user) => {
        expect(user.username).toBe("JoeUser");
        expect(user.email).toBe("user@example.com");
        expect(user.id).toBe(1);
        done();

      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

});