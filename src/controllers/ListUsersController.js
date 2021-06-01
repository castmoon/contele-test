const { badRequest, notFound } = require('../protocols/http/httpHelper');
const { NotFoundError } = require('../protocols/errors');

class ListUsersController {
    constructor(databaseManager) {
        this.databaseManager = databaseManager;
    }

    listAllUsers() {
        return {
          statusCode: 200,
          body: this.databaseManager.getAllUsers(),
        };
      }

    listUserById(id) {
        const user = this.databaseManager.getUserById(id);
        if(!user) {
          return notFound(new NotFoundError('user'));
        }
        return {
          statusCode: 200,
          body: user
        };
      }
}

module.exports = ListUsersController;
