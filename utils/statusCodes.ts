// src/utils/statusCodes.ts

export const StatusCodes = {
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

export const StatusMessages = {
    [StatusCodes.OK]: "Request successful",
    [StatusCodes.CREATED]: "Resource created successfully",
    [StatusCodes.ACCEPTED]: "Request accepted for processing",

    [StatusCodes.BAD_REQUEST]: "Bad request, please check your input",
    [StatusCodes.UNAUTHORIZED]: "Authentication required",
    [StatusCodes.FORBIDDEN]: "You don't have permission to access this resource",
    [StatusCodes.NOT_FOUND]: "Resource not found",

    [StatusCodes.INTERNAL_SERVER_ERROR]: "Internal server error",
    [StatusCodes.NOT_IMPLEMENTED]: "Feature not implemented",
    [StatusCodes.BAD_GATEWAY]: "Bad gateway",
};
