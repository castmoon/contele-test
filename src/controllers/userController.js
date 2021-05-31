const User = require("../models/User");
const fs = require('fs');
const { InvalidParamError, NotFoundError, MissingParamError } = require('../protocols/errors');
const badRequest = require('../protocols/http/http-helper');
const generateNewId = require('../factories/id-generator');
const emailValidator = require('../factories/email-validator');
const passwordValidator = require('../factories/password-validator');


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

    const validateEmail = emailValidator(email);
    if(!validateEmail) {
      return badRequest(new InvalidParamError('email'));
    }

    const validatePassword = passwordValidator(password);
    if(!validatePassword) {
      return badRequest(new InvalidParamError('password', 'Your password must have at least 8 characters, a capital letter, a lower letter, a number and a special character.'))
    }

    const generatedId = generateNewId()

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
    if(!id) {
      return badRequest(new MissingParamError('id'));
    }

    if(!password) {
      return badRequest(new MissingParamError('password'));
    }
    const indexOfUser = this.database.findIndex(user => user.id === id);

    if(!indexOfUser) {
      return badRequest(new NotFoundError('user'));
    }


    this.database[indexOfUser].password = password;
    fs.writeFileSync(`${__dirname}/../database.json`, JSON.stringify(this.database), 'utf-8');

    return {
      statusCode: 200,
      body: {
        message: 'user successfully updated'
      }
    }
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