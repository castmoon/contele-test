const { badRequest } = require('../protocols/http/httpHelper');
const { MissingParamError, InvalidParamError } = require('../protocols/errors');
const { emailValidator, passwordValidator, generateId } = require('../utils')
const User = require('../models/User');
const fs = require('fs');

class CreateUserController {
    constructor(databaseManager) {
        this.databaseManager = databaseManager;
    }

     createUser( email, password ) {
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

        const searchEmailInDB = this.databaseManager.getAllUsers().find(u => u.email === email);

        if(searchEmailInDB) {
          return badRequest(new InvalidParamError('email', 'Email already used'))
        }
    
        const generatedId = generateId();
    
        let user = new User(generatedId, email, password);
        this.databaseManager.addUser(user);
        return {
          statusCode: 200,
          body: 'User successfully created'
        }
      }

}

module.exports = CreateUserController;

