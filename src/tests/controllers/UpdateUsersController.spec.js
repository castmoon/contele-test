const { UpdateUserController } = require('../../controllers');
const { NotFoundError, MissingParamError, InvalidParamError } = require('../../protocols/errors');


describe('UpdateUsersController', () => {

    const makeUpdateUserController = () => {
        return new UpdateUserController([{
            "id": "test_id",
            "email": "test@email.com",
            "password": "test_password"
        }]);
    }
    test('should throws if no id is provided', () => {
        const updateUserController = makeUpdateUserController();
        const updateUserSpy = updateUserController.handle('',"test@email.com",'test_password');
        expect(updateUserSpy.body).toEqual(new MissingParamError('id'));
        expect(updateUserSpy.statusCode).toBe(400);
    });

    test('should throws if no email is provided', () => {
        const updateUserController = makeUpdateUserController();
        const updateUserSpy = updateUserController.handle('test_id', '','test_password');
        expect(updateUserSpy.body).toEqual(new MissingParamError('email'));
        expect(updateUserSpy.statusCode).toBe(400);
    });

    test('should throws if no password is provided', () => {
        const updateUserController = makeUpdateUserController();
        const updateUserSpy = updateUserController.handle('test_id', 'test@email.com','');
        expect(updateUserSpy.body).toEqual(new MissingParamError('password'));
        expect(updateUserSpy.statusCode).toBe(400);
    });

    test('should throws if an invalid email is provided', () => {
        const updateUserController = makeUpdateUserController();
        const updateUserSpy = updateUserController.handle('test_id', 'invalid_email','test_password');
        expect(updateUserSpy.body).toEqual(new InvalidParamError('email'));
        expect(updateUserSpy.statusCode).toBe(400);
    });

});