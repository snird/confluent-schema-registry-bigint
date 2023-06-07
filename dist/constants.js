"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_API_CLIENT_ID = exports.DEFAULT_SEPERATOR = exports.COMPATIBILITY = void 0;
var COMPATIBILITY;
(function (COMPATIBILITY) {
    COMPATIBILITY["NONE"] = "NONE";
    COMPATIBILITY["FULL"] = "FULL";
    COMPATIBILITY["BACKWARD"] = "BACKWARD";
    COMPATIBILITY["FORWARD"] = "FORWARD";
    COMPATIBILITY["BACKWARD_TRANSITIVE"] = "BACKWARD_TRANSITIVE";
    COMPATIBILITY["FORWARD_TRANSITIVE"] = "FORWARD_TRANSITIVE";
    COMPATIBILITY["FULL_TRANSITIVE"] = "FULL_TRANSITIVE";
})(COMPATIBILITY || (exports.COMPATIBILITY = COMPATIBILITY = {}));
exports.DEFAULT_SEPERATOR = '.';
exports.DEFAULT_API_CLIENT_ID = 'Confluent_Schema_Registry';
//# sourceMappingURL=constants.js.map