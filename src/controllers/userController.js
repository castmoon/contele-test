const User = require("../models/User");
const fs = require('fs');
const { InvalidParamError, NotFoundError, MissingParamError } = require('../protocols/errors');
const badRequest = require('../protocols/http/http-helper');

class UserController {
  constructor(database) {
    this.database = database;
  }

  listAllUsers() {
    if(this.database.length === 0) {
      return badRequest(new NotFoundError('users'));
    }
    return {
      statusCode: 200,
      body: this.database
    };
  }

    listUserById(id) {
    const filteredUser = this.database.find(user => user.id === id);
    if(!filteredUser) {
      return badRequest(new NotFoundError('user'));
    }
    return {
      statusCode: 200,
      body: filteredUser
    };
  }

  createUser({ email, password }) {
    if(!email) {
      return badRequest(new MissingParamError('email'));
    }
    if(!password) {
      return badRequest(new MissingParamError('password'));
    }
    const generatedId = Math.random().toString(32).substr(2,9)
    let user = new User(generatedId, email, password);
    this.database.push(user);
    fs.writeFileSync(`${__dirname}/../database.json`, JSON.stringify(this.database), 'utf-8');
    return {
      statusCode: 200,
      body: {
        message: "user successfully created"
      }
    };
  }

  updateUser(id, {password}) {
    const indexOfUser = this.database.findIndex(user => user.id === id);
    this.database[indexOfUser].password = password;
    fs.writeFileSync(`${__dirname}/../database.json`, JSON.stringify(this.database), 'utf-8');
  }

  deleteUser(id) {
    const indexOfUser = this.database.findIndex(user => user.id === id);
    this.database.splice(indexOfUser, 1);
    fs.writeFileSync(`${__dirname}/../database.json`, JSON.stringify(this.database), 'utf-8');
  }

  deleteAllUsers() {
    this.database = [];
    fs.writeFileSync(`${__dirname}/../database.json`, JSON.stringify(this.database), 'utf-8');
  }
}

module.exports = UserController;