const { DeleteUserController } = require('./src/controllers');
const { NotFoundError } = require('./src/protocols/errors');
const JsonDatabaseManager = require('../../src/database/JsonDatabaseManager');
const { DeleteUserController } = require('../../src/controllers');

describe('DeleteUsersController', () => {
    const jsonDatabaseManager = new JsonDatabaseManager(__dirname);
    const deleteUserController = new DeleteUserController(jsonDatabaseManager);

    test('should throws if an invalid id is provided', () => {
        const deleteUserSpy = deleteUserController.deleteOne('invalid_id');
        expect(deleteUserSpy.body).toEqual(new NotFoundError('user'));
        expect(deleteUserSpy.statusCode).toBe(400); 
    });
});