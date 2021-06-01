const { UpdateUserController } = require('../../controllers');
const { NotFoundError, MissingParamError, InvalidParamError } = require('../../protocols/errors');


describe('UpdateUsersController', () => {

    const makeUpdateUserController = () => {
        return new UpdateUserController([{
            "id": "test_id",
            "email": "valid@email.com",
            "password": "test_password"
        },
        {
            "id": "test_id2",
            "email": "valid2@email.com",
            "password": "test2_password"
        }]);
    }
    test('should throws if no id is provided', () => {
        const updateUserController = makeUpdateUserController();
        const updateUserSpy = updateUserController.handle('','test_password');
        expect(updateUserSpy.body).toEqual(new MissingParamError('id'));
        expect(updateUserSpy.statusCode).toBe(400);
    });

    test('should throws if no password is provided', () => {
        const updateUserController = makeUpdateUserController();
        const updateUserSpy = updateUserController.handle('test_id', '');
        expect(updateUserSpy.body).toEqual(new MissingParamError('password'));
        expect(updateUserSpy.statusCode).toBe(400);
    });

    test('should throws if an invalid password is provided', () => {
        const updateUserController = makeUpdateUserController();
        const updateUserSpy = updateUserController.handle('test_id', 'test@test.com','invalid_password');
        expect(updateUserSpy.body).toEqual(new InvalidParamError('password', 'Your password must have at least 8 characters, a capital letter, a lower letter, a number and a special character.'));
        expect(updateUserSpy.statusCode).toBe(400);
    });

    test('should throws if an invalid id is provided', () => {
        const updateUserController = makeUpdateUserController();
        const updateUserSpy = updateUserController.handle('invalid_id', 'test@test.com','testPassword123@');
        expect(updateUserSpy.body).toEqual(new NotFoundError('user'));
        expect(updateUserSpy.statusCode).toBe(400);
    });
});