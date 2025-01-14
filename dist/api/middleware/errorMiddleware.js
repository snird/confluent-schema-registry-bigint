"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseError extends Error {
    constructor(clientName, response) {
        super(`${clientName} - ${response.data().message ||
            `Error, status ${response.status()}${response.data() ? `: ${response.data()}` : ''}`}`);
        const request = response.request();
        this.name = this.constructor.name;
        this.status = response.status();
        this.unauthorized = this.status === 401;
        this.url = `${request.method()} ${request.url()}`;
    }
}
const errorMiddleware = ({ clientId }) => ({
    response: next => new Promise((resolve, reject) => next()
        .then(resolve)
        // @ts-ignore
        .catch((response) => reject(new ResponseError(clientId, response)))),
});
exports.default = errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map