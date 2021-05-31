const { badRequest } = require('../protocols/http/http-helper');
const { NotFoundError } = require('../protocols/errors');

class ListUsersController {
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
}

module.exports = ListUsersController;
