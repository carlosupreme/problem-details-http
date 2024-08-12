export class DefaultProblemDetailsValues {
    static DEFAULTS: { [status: number]: { type: string; title: string } } = {
        400: {
            type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.1",
            title: "Bad Request",
        },
        401: {
            type: "https://datatracker.ietf.org/doc/html/rfc7235#section-3.1",
            title: "Unauthorized",
        },
        402: {
            type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.2",
            title: "Payment Required",
        },
        403: {
            type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.3",
            title: "Forbidden",
        },
        404: {
            type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.4",
            title: "Not Found",
        },
        405: {
            type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.5",
            title: "Method Not Allowed",
        },
        409: {
            type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.8",
            title: "Conflict",
        },
        415: {
            type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.13",
            title: "Unsupported Media Type",
        },
        422: {
            type: "https://datatracker.ietf.org/doc/html/rfc4918#section-11.2",
            title: "Unprocessable Entity",
        },
        423: {
            type: "https://datatracker.ietf.org/doc/html/rfc4918#section-11.3",
            title: "Locked",
        },
        424: {
            type: "https://datatracker.ietf.org/doc/html/rfc4918#section-11.4",
            title: "Failed Dependency",
        },
        429: {
            type: "https://datatracker.ietf.org/doc/html/rfc6585#section-4",
            title: "Too Many Requests",
        },
        500: {
            type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.1",
            title: "Internal Server Error",
        },
        501: {
            type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.2",
            title: "Not Implemented",
        },
        503: {
            type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.4",
            title: "Service Unavailable",
        },
        504: {
            type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.5",
            title: "Gateway Timeout",
        },
        505: {
            type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.6",
            title: "HTTP Version Not Supported",
        },
    };
}