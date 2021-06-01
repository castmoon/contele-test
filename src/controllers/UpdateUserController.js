const { badRequest, notFound } = require('../protocols/http/httpHelper');
const { MissingParamError, NotFoundError, InvalidParamError } = require('../protocols/errors');
const { passwordValidator, emailValidator } = require('../utils');

const User = require('../models/User');
const fs = require('fs');

class UpdateUserController {
    constructor(databaseManager) {
        this.databaseManager = databaseManager;
    }

     update(id, email, password) {
        if(!id) {
            return badRequest(new MissingParamError('id'));
          }

        if(!email && !password) {
          return badRequest(new MissingParamError('email & password'));
        }
        

        if(password) {
          const validatePassword = passwordValidator(password);
          if(!validatePassword) {
            return badRequest(new InvalidParamError('password', 'Your password must have at least 8 characters, a capital letter, a lower letter, a number and a special character.'));
          }
        }

        const indexOfUser = this.databaseManager.getAllUsers().findIndex(user => user.id === id);
        if(indexOfUser === -1) {
          return notFound(new NotFoundError('user'));
        }

        const user = this.databaseManager.getUserById(id);

        const newUser = new User(id, email || user.email, password || user.password);

        this.databaseManager.updateUser(newUser);
    
        return {
          statusCode: 200,
          body: {
            message: 'user successfully updated'
          }
        }
    }

}

module.exports = UpdateUserController;

