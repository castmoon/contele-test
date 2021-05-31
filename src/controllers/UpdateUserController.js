const { badRequest } = require('../protocols/http/http-helper');
const { MissingParamError, NotFoundError, InvalidParamError } = require('../protocols/errors');
const { passwordValidator, emailValidator } = require('../factories');
const writeData = require('../database/databaseWritter');

const User = require('../models/User');
const fs = require('fs');

class UpdateUserController {
    constructor(database) {
        this.database = database;
    }

     handle(id, email, password) {
        if(!id) {
            return badRequest(new MissingParamError('id'));
          }
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
          return badRequest(new InvalidParamError('password', 'Your password must have at least 8 characters, a capital letter, a lower letter, a number and a special character.'));
        }

        const indexOfUser = this.database.findIndex(user => user.id === id);
        if(indexOfUser === -1) {
          return badRequest(new NotFoundError('user'));
        }
    
    
        this.database[indexOfUser].password = password;
        writeData(this.database);
    
        return {
          statusCode: 200,
          body: {
            message: 'user successfully updated'
          }
        }
    }

}

module.exports = UpdateUserController;

