module.exports = class MissingParamError extends Error {
    constructor() {
        super(`Server Error}`);
        this.name = `Server Error`;
    }
}