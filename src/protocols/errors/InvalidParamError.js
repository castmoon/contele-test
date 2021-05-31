module.exports = class InvalidParamError extends Error {
    constructor(param, errorMessage) {
        super(`Invalid param: ${param}`);
        this.name = errorMessage ? errorMessage : `Invalid param: ${param}`
    }
}