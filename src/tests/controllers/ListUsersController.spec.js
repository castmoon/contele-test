const { ListUsersController } = require('../../controllers');
const { NotFoundError } = require('../../protocols/errors');
const readTestDatabase = require('../database/testDatabaseLoader')


describe('ListUsersController', () => {

    const makeListUserController = () => {
        return new ListUsersController([{
            "id": "test_id",
            "email": "test@test.com",
            "password": "test"
        }]);
    }

    test('should throws if there no users in db', () => {
        const listUsersController = makeListUserController();
        listUsersController.database = [];
        const listUsers = listUsersController.listAllUsers();
        expect(listUsers.body).toEqual(new NotFoundError('users'));
        expect(listUsers.statusCode).toBe(400);
    });
    
    test('should return users', () => {
        const listUsersController = makeListUserController();
        const listAllUsers = listUsersController.listAllUsers();
        expect(listAllUsers.body).toEqual([{
            "id": "test_id",
            "email": "test@test.com",
            "password": "test"
        }]);
        expect(listAllUsers.statusCode).toBe(200);
    });
});