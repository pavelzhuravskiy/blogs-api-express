"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authBasic = void 0;
const authBasic = (req, res, next) => {
    if (req.headers.authorization !== "Basic YWRtaW46cXdlcnR5") {
        res.sendStatus(401);
    }
    else {
        next();
    }
};
exports.authBasic = authBasic;
