const User = require("../models/User");
const fs = require('fs');
const { InvalidParamError, NotFoundError, MissingParamError } = require('../protocols/errors');
const { badRequest, serverError } = require('../protocols/http/http-helper');
const generateNewId = require('../factories/id-generator');
const emailValidator = require('../factories/email-validator');
const passwordValidator = require('../factories/password-validator');


class UserController {
  constructor(database) {
    this.database = database;
  }


  deleteUser(id) {
    if(!id) {
      return badRequest(new MissingParamError('id'));
    }
    const indexOfUser = this.database.findIndex(user => user.id === id);
    if(!indexOfUser) {
      return badRequest(new NotFoundError('user'));
    }
    this.database.splice(indexOfUser, 1);
    fs.writeFileSync(`${__dirname}/../database.json`, JSON.stringify(this.database), 'utf-8');
    return {
      statusCode: 200,
      body: {
        message: 'user successfully deleted'
      }
    }
  }

  deleteAllUsers() {
    this.database = [];
    fs.writeFileSync(`${__dirname}/../database.json`, JSON.stringify(this.database), 'utf-8');

    return {
      statusCode: 200,
      body: {
        message: 'users successfully deleted'
      }
    }
  }
}

module.exports = UserController;