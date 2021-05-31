const { CreateUserController } = require('../../controllers');
const { NotFoundError, MissingParamError } = require('../../protocols/errors');


describe('CreateUsersController', () => {

    const makeCreateUserController = () => {
        return new CreateUserController([]);
    }
    test('should throws if no email is provided', () => {
        const createUserController = makeCreateUserController();
        const createUserSpy = createUserController.handle('', 'test_password');
        expect(createUserSpy.body).toEqual(new MissingParamError('email'));
        expect(createUserSpy.statusCode).toBe(400);
    });
});