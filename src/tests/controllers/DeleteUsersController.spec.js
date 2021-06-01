const { DeleteUserController } = require('../../controllers');
const { NotFoundError } = require('../../protocols/errors');

describe('DeleteUsersController', () => {
    const makeDeleteUserController = () => new DeleteUserController([{
        "id": "test_id",
        "email": "test@email",
        "password": "test_password"
    }]);

    test('should throws if an invalid id is provided', () => {
        const deleteUserController = makeDeleteUserController();
        const deleteUserSpy = deleteUserController.deleteOne('invalid_id');
        expect(deleteUserSpy.body).toEqual(new NotFoundError('user'));
        expect(deleteUserSpy.statusCode).toBe(400); 
    });
});