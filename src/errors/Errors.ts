import { CustomError } from "./CustomError";

export class BadRequest extends CustomError {
    constructor(message?: string, meta?: any) {
        super(message || "Bad Request", 400, meta);
    }
}

export class Unauthorized extends CustomError {
    constructor(message?: string, meta?: any) {
        super(message || 'Unauthorized', 401, meta);
    }
}

export class NotFound extends CustomError {
    constructor(message?: string, meta?: any) {
        super(message || 'Resource Not Found', 404, meta);
    }
}


export class Forbidden extends CustomError {
    constructor(message?: string, meta?: any) {
        super(message || 'Forbidden Resource', 403, meta)
    }
}

export class Conflict extends CustomError {
    constructor(message?: string, meta?: any) {
        super(message || 'Conflict Error', 409, meta)
    }
}


export class InternalServerError extends CustomError {
    constructor(message?: string, meta?: any) {
        super(message || 'Something Went Wrong', 500, meta);
    }
}



export class UnprocessableEntity extends CustomError {
    constructor(message?: string, meta?: any) {
        super(message || "Validation Error", 422, meta);    }
}
