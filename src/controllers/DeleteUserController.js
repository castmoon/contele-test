const { badRequest } = require('../protocols/http/http-helper');
const { MissingParamError, NotFoundError } = require('../protocols/errors');
const writeData = require('../database/databaseWritter');

const fs = require('fs');

class DeleteUserController {
    constructor(database) {
        this.database = database;
    }

     deleteOne(id) {
        const indexOfUser = this.database.findIndex(user => user.id === id);
        if(indexOfUser === -1) {
          return badRequest(new NotFoundError('user'));
        }
        this.database.splice(indexOfUser, 1);
        fs.writeFileSync(`${__dirname}/../database/database.json`, JSON.stringify(this.database), 'utf-8')
        return {
          statusCode: 200,
          body: {
            message: 'user successfully deleted'
          }
        }
      }
    
      deleteAll() {
        this.database = [];
        writeData(this.database);
        return {
          statusCode: 200,
          body: {
            message: 'users successfully deleted'
          }
        }
      }

}

module.exports = DeleteUserController;

