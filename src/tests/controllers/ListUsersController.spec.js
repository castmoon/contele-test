const { ListUsersController } = require('../../controllers');
const { NotFoundError } = require('../../protocols/errors');


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

    test('should throws if invalid id is provided', () => {
        const listUsersController = makeListUserController();
        const listUserByIdSpy = listUsersController.listUserById('invalid_id');
        expect(listUserByIdSpy.body).toEqual(new NotFoundError('user')); 
        expect(listUserByIdSpy.statusCode).toBe(400);
    });

});