const { badRequest } = require('../protocols/http/http-helper');
const { MissingParamError, NotFoundError, InvalidParamError } = require('../protocols/errors');
const { passwordValidator, emailValidator } = require('../factories');
const writeData = require('../database/databaseWritter');

const User = require('../models/User');
const fs = require('fs');
const { UV_FS_O_FILEMAP } = require('constants');

class UpdateUserController {
    constructor(database) {
        this.database = database;
    }

     handle(id, email, password) {
        if(!id) {
            return badRequest(new MissingParamError('id'));
          }
        if(!email && !password) {
          return badRequest(new MissingParamError('email & password'));
        }
        const indexOfUser = this.database.findIndex(user => user.id === id);
        if(indexOfUser === -1) {
          return badRequest(new NotFoundError('user'));
        }



        if(email) {
          const validateEmail = emailValidator(email);
          if(!validateEmail) {
            return badRequest(new InvalidParamError('email'));
          }
        }


        if(password) {
          const validatePassword = passwordValidator(password);
          if(!validatePassword) {
            return badRequest(new InvalidParamError('password', 'Your password must have at least 8 characters, a capital letter, a lower letter, a number and a special character.'));
          }
        }

        const certifyEmailInDb = this.database.find(user => user.email = email)
        if(certifyEmailInDb) {
          return badRequest(new InvalidParamError('email'));
        }

        this.database[indexOfUser].email = email;
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

