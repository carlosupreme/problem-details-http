export class ProblemDetails {
  type: string;
  status: number;
  title: string;
  detail: string;
  instance?: string;
  extensions: object = {};

  constructor(
    type: string,
    status: number,
    title: string,
    detail: string,
    instance?: string,
    extensions?: object
  ) {
    this.type = type;
    this.status = status;
    this.title = title;
    this.detail = detail;
    this.instance = instance;
    if (extensions) this.extensions = extensions;
  }

  static default(): ProblemDetails {
    return new ProblemDetails(
      "about:blank",
      500,
      "Internal Server Error",
      "An error has ocurred."
    );
  }

  toString() {
    const extensionsIsUndefined = Object.keys(this.extensions).length === 0;

    if (this.instance && extensionsIsUndefined) {
      return this.onlyInstance();
    }

    if (!extensionsIsUndefined && !this.instance) {
      return this.onlyExtensions();
    }

    return JSON.stringify({
      type: this.type,
      status: this.status,
      title: this.title,
      detail: this.detail,
      instance: this.instance,
      ...this.extensions,
    });
  }

  private onlyExtensions() {
    return JSON.stringify({
      type: this.type,
      status: this.status,
      title: this.title,
      detail: this.detail,
      ...this.extensions,
    });
  }

  private onlyInstance() {
    return JSON.stringify({
      type: this.type,
      status: this.status,
      title: this.title,
      detail: this.detail,
      instance: this.instance,
    });
  }
}
