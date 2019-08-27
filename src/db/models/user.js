'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { 
      type: DataTypes.STRING,
      unique: true, 
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: "must be a valid email" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "member"
  }
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Post, {
      foreignKey: "userId",
      as: "posts"
    });
  };

  User.prototype.isAdmin = function() {
    return this.role === "admin";
  };
  
  return User;
};