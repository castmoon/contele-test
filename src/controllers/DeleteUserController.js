const { badRequest } = require('../protocols/http/http-helper');
const { MissingParamError, NotFoundError } = require('../protocols/errors');

const User = require('../models/User');
const fs = require('fs');

class DeleteUserController {
    constructor(database) {
        this.database = database;
    }

    async deleteOne(id) {
        if(!id) {
          return badRequest(new MissingParamError('id'));
        }
        const indexOfUser = await this.database.findIndex(user => user.id === id);
        console.log(indexOfUser);
        if(indexOfUser === -1) {
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
    
      deleteAll() {
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

module.exports = DeleteUserController;

