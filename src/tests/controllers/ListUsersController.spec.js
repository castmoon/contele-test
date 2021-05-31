const { ListUsersController } = require('../../controllers');
const { NotFoundError } = require('../../protocols/errors');
const readTestDatabase = require('../database/testDatabaseLoader')


describe('ListUsersController', () => {
    test('should throws if there no users in db', () => {
        const listUsersController = new ListUsersController(readTestDatabase());
        const listUsers = listUsersController.listAllUsers();
        expect(listUsers.body).toEqual(new NotFoundError('users'));
        expect(listUsers.statusCode).toBe(400);
    });
    
});