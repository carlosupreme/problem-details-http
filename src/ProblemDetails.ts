import { DefaultProblemDetailsValues } from "./DefaultProblemDetailsValues";

export class ProblemDetails {
    type: string;
    status: number;
    title: string;
    detail: string;
    instance?: string;
    extensions?: object;

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
        this.extensions = extensions ?? {};
    }

    static default(code: number): ProblemDetails {
        const { type, title } = DefaultProblemDetailsValues.DEFAULTS[code];
        return new ProblemDetails(
            type,
            code,
            title,
            "An error has occurred."
        );
    }

    toJson(): object {
        const json: any = {
            type: this.type,
            status: this.status,
            title: this.title,
            detail: this.detail,
            ...this.extensions,
        };

        if (this.instance) {
            json.instance = this.instance;
        }

        return json;
    }

    toString() {
        const extensionsIsEmpty = !this.extensions || Object.keys(this.extensions).length === 0;

        if (this.instance && extensionsIsEmpty) {
            return this.onlyInstance();
        }

        if (!extensionsIsEmpty && !this.instance) {
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
