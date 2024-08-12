import {describe, expect, it} from "vitest";
import {DefaultProblemDetailsValues} from "../src/DefaultProblemDetailsValues";

describe('Default values', () => {
    it('should return a title and a type from a default value given a http error code', () => {
        const httpCode = 500;
        const {title, type} = DefaultProblemDetailsValues.DEFAULTS[httpCode];

        expect(title).toBe("Internal Server Error");
        expect(type).toBe("https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.1");
    });
});