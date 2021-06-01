const { badRequest } = require('../protocols/http/httpHelper');
const { NotFoundError } = require('../protocols/errors');

const fs = require('fs');

class DeleteUserController {
    constructor(databaseManager) {
        this.databaseManager = databaseManager;
    }

     deleteOne(id) {
        const indexOfUser = this.databaseManager.getAllUsers().findIndex(user => user.id === id);
        if(indexOfUser === -1) {
          return badRequest(new NotFoundError('user'));
        }
        this.databaseManager.deleteOne(id);
        return {
          statusCode: 200,
          body: {
            message: 'user successfully deleted'
          }
        }
      }
    
      deleteAll() {
        this.databaseManager.deleteAll();
        return {
          statusCode: 200,
          body: {
            message: 'users successfully deleted'
          }
        }
      }

}

module.exports = DeleteUserController;

