const { badRequest, serverError } = require('../protocols/http/http-helper');
const { MissingParamError, InvalidParamError } = require('../protocols/errors');
const { emailValidator, passwordValidator, idGenerator } = require('../factories')
const User = require('../models/User');
const fs = require('fs');
const writeData = require('../database/databaseWritter');

class CreateUserController {
    constructor(database) {
        this.database = database;
    }

     handle( email, password ) {
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

        const searchEmailInDB = this.database.find(user => user.email === email);


        if(searchEmailInDB) {
          return badRequest(new InvalidParamError('email', 'Email already used'))
        }
    
        const generatedId = idGenerator()
    
        let user = new User(generatedId, email, password);
        this.database.push(user);
        writeData(this.database);
        return {
          statusCode: 200,
          body: 'User successfully created'
        }
      }

}

module.exports = CreateUserController;

