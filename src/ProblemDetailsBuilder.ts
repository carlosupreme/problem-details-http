import { ProblemDetails } from "./ProblemDetails";
import { DefaultProblemDetailsValues } from "./DefaultProblemDetailsValues";

export class ProblemDetailsBuilder {
    private _type: string;
    private _status: number;
    private _title?: string;
    private _detail: string;
    private _instance?: string;
    private _extensions?: object;

    constructor() {
        this._status = 500;
        this._type = DefaultProblemDetailsValues.DEFAULTS[500].type;
        this._title = DefaultProblemDetailsValues.DEFAULTS[500].title;
        this._detail = "An error has occurred.";
        this._extensions = {};
    }

    static fromStatus(status: number): ProblemDetailsBuilder {
        return new ProblemDetailsBuilder().status(status);
    }

    type(type: string): ProblemDetailsBuilder {
        this._type = type;
        return this;
    }

    status(status: number): ProblemDetailsBuilder {
        this._status = status;
        const { type, title } = DefaultProblemDetailsValues.DEFAULTS[status] || DefaultProblemDetailsValues.DEFAULTS[500];
        this._type = type;

        if (!this._title) {
            this._title = title;
        }

        return this;
    }

    title(title: string): ProblemDetailsBuilder {
        this._title = title;
        return this;
    }

    detail(detail: string): ProblemDetailsBuilder {
        this._detail = detail;
        return this;
    }

    instance(instance?: string): ProblemDetailsBuilder {
        this._instance = instance;
        return this;
    }

    extensions(extensions?: object): ProblemDetailsBuilder {
        this._extensions = extensions ?? {};
        return this;
    }

    build(): ProblemDetails {
        return new ProblemDetails(
            this._type,
            this._status,
            this._title || DefaultProblemDetailsValues.DEFAULTS[this._status].title,
            this._detail,
            this._instance,
            this._extensions
        );
    }
}
