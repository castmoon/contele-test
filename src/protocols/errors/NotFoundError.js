module.exports = class NotFoundError extends Error {
    constructor(param) {
        super(`Not found: ${param}`);
        this.name = `Not found: ${param}`;
    }
}