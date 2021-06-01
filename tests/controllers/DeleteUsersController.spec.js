const { ListUsersController } = require('../../src/controllers');
const DeleteUserController = require('../../src/controllers/DeleteUserController');
const JsonDatabaseManager = require('../../src/database/JsonDatabaseManager');
const { NotFoundError } = require('../../src/protocols/errors');

describe('DeleteUsersController', () => {
    const jsonDatabaseManager = new JsonDatabaseManager(`${__dirname}/../mocks/deleteDatabase.json`);
    const deleteUserController = new DeleteUserController(jsonDatabaseManager);

    beforeEach(() => {
        deleteUserController.databaseManager.addUser('test_id', 'test@email', 'testPassword123@');
    })

    afterEach(() => {
        deleteUserController.databaseManager.deleteAll('test_id', 'test@email', 'testPassword123@');
    })

    test('should throws if an invalid id is provided', () => {
        const deleteUserSpy = deleteUserController.deleteOne('invalid_id');
        expect(deleteUserSpy.body).toEqual(new NotFoundError('user'));
        expect(deleteUserSpy.statusCode).toBe(400); 
    });

    test('should delete a user succesfully', () => {
        deleteUserController.deleteOne('test_id');
        const verifyUser = deleteUserController.databaseManager.getAllUsers().find(user => user.id === 'test_id');
        expect(verifyUser).toBeUndefined();
    });

    test('should delete all successfuly', () => {
        deleteUserController.deleteAll();
        const verifyUsers = deleteUserController.databaseManager.getAllUsers;
        expect(verifyUsers).toBeFalsy();
    })
});