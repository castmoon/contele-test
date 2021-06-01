const { ListUsersController } = require('../../src/controllers');
const JsonDatabaseManager = require('../../src/database/JsonDatabaseManager');
const { NotFoundError } = require('../../src/protocols/errors');


describe('ListUsersController', () => {

    const jsonDatabaseManager = new JsonDatabaseManager(`${__dirname}/../mocks/multipleUsers.json`);
    const listUsersController = new ListUsersController(jsonDatabaseManager);

    test('should return an empty array if no users in db', () => {
        const jsonDatabaseManager = new JsonDatabaseManager(`${__dirname}/../mocks/empyDatabase.json`);
        const listUsersController = new ListUsersController(jsonDatabaseManager);
        const listUsersSpy = listUsersController.listAllUsers();
        expect(listUsersSpy.body).toEqual([]);
        expect(listUsersSpy.statusCode).toBe(200);
    });
    
    test('should return users', () => {
        const listUsersSpy = listUsersController.listAllUsers();
        expect(listUsersSpy.body).toEqual([{
            "id": "test_id",
            "email": "valid@email.com",
            "password": "test_password"
        },
        {
            "id": "test_id2",
            "email": "valid2@email.com",
            "password": "test2_password"
        }]);
        expect(listUsersSpy.statusCode).toBe(200);
    });

    test('should throws if invalid id is provided', () => {
        const listUserSpy = listUsersController.listUserById('invalid_id');
        expect(listUserSpy.body).toEqual(new NotFoundError('user'));
        expect(listUserSpy.statusCode).toBe(404);
    });

    test('should return an user if found', () => {
        const listUserSpy = listUsersController.listUserById('test_id');
        expect(listUserSpy.body).toEqual({
            "id": "test_id",
            "email": "valid@email.com",
            "password": "test_password"
        });
        expect(listUserSpy.statusCode).toBe(200);
    });
});