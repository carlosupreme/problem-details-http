import { describe, it, expect } from 'vitest';
import { ProblemDetails } from '../src';

describe('ProblemDetails', () => {
    it('should create an instance with all properties', () => {
        const problem = new ProblemDetails('type1', 404, 'Not Found', 'Resource not found', 'instance1', { custom: 'value' });

        expect(problem.type).toBe('type1');
        expect(problem.status).toBe(404);
        expect(problem.title).toBe('Not Found');
        expect(problem.detail).toBe('Resource not found');
        expect(problem.instance).toBe('instance1');
        expect(problem.extensions).toEqual({ custom: 'value' });
    });

    it('should create an instance without optional properties', () => {
        const problem = new ProblemDetails('type1', 500, 'Internal Server Error', 'An unexpected error occurred');

        expect(problem.type).toBe('type1');
        expect(problem.status).toBe(500);
        expect(problem.title).toBe('Internal Server Error');
        expect(problem.detail).toBe('An unexpected error occurred');
        expect(problem.instance).toBeUndefined();
        expect(problem.extensions).toEqual({});
    });

    it('should convert to JSON without undefined properties', () => {
        const problem = new ProblemDetails('type1', 400, 'Bad Request', 'Invalid request', undefined, { custom: 'value' });
        const json = problem.toJson();

        expect(json).toEqual({
            type: 'type1',
            status: 400,
            title: 'Bad Request',
            detail: 'Invalid request',
            custom: 'value',
        });
    });

    it('should include instance in JSON when defined', () => {
        const problem = new ProblemDetails('type1', 200, 'OK', 'Operation successful', 'instance1', { custom: 'value' });
        const json = problem.toJson();

        expect(json).toEqual({
            type: 'type1',
            status: 200,
            title: 'OK',
            detail: 'Operation successful',
            instance: 'instance1',
            custom: 'value',
        });
    });

    it('should correctly handle the default method', () => {
        const problem = ProblemDetails.default(500);

        expect(problem.type).toBe("https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.1");
        expect(problem.status).toBe(500);
        expect(problem.title).toBe('Internal Server Error');
        expect(problem.detail).toBe('An error has occurred.');
        expect(problem.instance).toBeUndefined();
        expect(problem.extensions).toEqual({});
    });

    it('should convert to string correctly when only instance is defined', () => {
        const problem = new ProblemDetails('type1', 400, 'Bad Request', 'Invalid request', 'instance1');
        const str = problem.toString();

        expect(str).toBe(JSON.stringify({
            type: 'type1',
            status: 400,
            title: 'Bad Request',
            detail: 'Invalid request',
            instance: 'instance1',
        }));
    });

    it('should convert to string correctly when only extensions are defined', () => {
        const problem = new ProblemDetails('type1', 400, 'Bad Request', 'Invalid request', undefined, { custom: 'value' });
        const str = problem.toString();

        expect(str).toBe(JSON.stringify({
            type: 'type1',
            status: 400,
            title: 'Bad Request',
            detail: 'Invalid request',
            custom: 'value',
        }));
    });

    it('should convert to string correctly when both instance and extensions are defined', () => {
        const problem = new ProblemDetails('type1', 400, 'Bad Request', 'Invalid request', 'instance1', { custom: 'value' });
        const str = problem.toString();

        expect(str).toBe(JSON.stringify({
            type: 'type1',
            status: 400,
            title: 'Bad Request',
            detail: 'Invalid request',
            instance: 'instance1',
            custom: 'value',
        }));
    });
});
