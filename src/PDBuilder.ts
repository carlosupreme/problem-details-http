import { ProblemDetails } from "./ProblemDetails";

export class PDBuilder {
  static DEFAULT_STATUS: number = 400;
  DEFAULTS: { [status: number]: { type: string; title: string } } = {
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
  private problemDetails!: ProblemDetails;

  private constructor() {
    this.reset();
  }

  static fromError(error: Error): PDBuilder {
    const builder = PDBuilder.fromDetail(error.message);
    const title = error.constructor.name.replace(/([A-Z])/g, " $1").trimStart();
    builder.title(title);
    builder.detail(error.message);
    return builder;
  }

  static fromDetail(detail: string): PDBuilder {
    const builder = new PDBuilder();
    builder.fromStatus(this.DEFAULT_STATUS);
    builder.problemDetails.detail = detail;
    return builder;
  }

  reset() {
    this.problemDetails = new ProblemDetails("about:blank", 0, "", "");
  }

  title(title: string): PDBuilder {
    this.problemDetails.title = title;
    return this;
  }

  type(type: string): PDBuilder {
    this.problemDetails.type = type;
    return this;
  }

  status(status: number): PDBuilder {
    this.problemDetails.status = status;
    return this;
  }

  detail(detail: string): PDBuilder {
    this.problemDetails.detail = detail;
    return this;
  }

  instance(instance: string): PDBuilder {
    this.problemDetails.instance = instance;
    return this;
  }

  extensions(extensions: object): PDBuilder {
    this.problemDetails.extensions = extensions;
    return this;
  }

  private fromStatus(status: number): PDBuilder {
    const { type, title } = this.DEFAULTS[status];
    this.problemDetails.type = type;
    if (!this.problemDetails.title) this.problemDetails.title = title;
    this.problemDetails.status = status;
    return this;
  }

  status400 = (): PDBuilder => this.fromStatus(400);
  status401 = (): PDBuilder => this.fromStatus(401);
  status402 = (): PDBuilder => this.fromStatus(402);
  status403 = (): PDBuilder => this.fromStatus(403);
  status404 = (): PDBuilder => this.fromStatus(404);
  status405 = (): PDBuilder => this.fromStatus(405);
  status409 = (): PDBuilder => this.fromStatus(409);
  status415 = (): PDBuilder => this.fromStatus(415);
  status422 = (): PDBuilder => this.fromStatus(422);
  status423 = (): PDBuilder => this.fromStatus(423);
  status424 = (): PDBuilder => this.fromStatus(424);
  status429 = (): PDBuilder => this.fromStatus(429);
  status500 = (): PDBuilder => this.fromStatus(500);
  status501 = (): PDBuilder => this.fromStatus(501);
  status503 = (): PDBuilder => this.fromStatus(503);
  status504 = (): PDBuilder => this.fromStatus(504);
  status505 = (): PDBuilder => this.fromStatus(505);

  build(): ProblemDetails {
    const pb = this.problemDetails;
    this.reset();
    return pb;
  }
}
