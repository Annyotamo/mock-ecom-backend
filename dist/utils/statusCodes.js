"use strict";
// src/utils/statusCodes.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusMessages = exports.StatusCodes = void 0;
exports.StatusCodes = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
};
exports.StatusMessages = {
    [exports.StatusCodes.OK]: "Request successful",
    [exports.StatusCodes.CREATED]: "Resource created successfully",
    [exports.StatusCodes.ACCEPTED]: "Request accepted for processing",
    [exports.StatusCodes.BAD_REQUEST]: "Bad request, please check your input",
    [exports.StatusCodes.UNAUTHORIZED]: "Authentication required",
    [exports.StatusCodes.FORBIDDEN]: "You don't have permission to access this resource",
    [exports.StatusCodes.NOT_FOUND]: "Resource not found",
    [exports.StatusCodes.INTERNAL_SERVER_ERROR]: "Internal server error",
    [exports.StatusCodes.NOT_IMPLEMENTED]: "Feature not implemented",
    [exports.StatusCodes.BAD_GATEWAY]: "Bad gateway",
};
