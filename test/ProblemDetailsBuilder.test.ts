import { describe, it, expect } from 'vitest';
import ProblemDetailsBuilder, {DefaultProblemDetailsValues} from '../src';

describe('ProblemDetailsBuilder', () => {

    it('should create a ProblemDetails with default values', () => {
        const problemDetails = new ProblemDetailsBuilder().build();
        const defaultValues = DefaultProblemDetailsValues.DEFAULTS[500];

        expect(problemDetails.type).toBe(defaultValues.type);
        expect(problemDetails.status).toBe(500);
        expect(problemDetails.title).toBe(defaultValues.title);
        expect(problemDetails.detail).toBe('An error has occurred.');
        expect(problemDetails.instance).toBeUndefined();
        expect(problemDetails.extensions).toEqual({});
    });

    it('should override the title if set before status', () => {
        const problemDetails = new ProblemDetailsBuilder()
            .title('Custom Title')
            .status(404)
            .build();

        expect(problemDetails.status).toBe(404);
        expect(problemDetails.title).toBe('Custom Title');
    });

    it('should override the title if set after status', () => {
        const problemDetails = new ProblemDetailsBuilder()
            .status(404)
            .title('Custom Title')
            .build();

        expect(problemDetails.status).toBe(404);
        expect(problemDetails.title).toBe('Custom Title');
    });

    it('should use the default title for the status if title is not set', () => {
        const problemDetails = new ProblemDetailsBuilder()
            .status(500)
            .build();

        const defaultValues = DefaultProblemDetailsValues.DEFAULTS[500];
        expect(problemDetails.status).toBe(500);
        expect(problemDetails.title).toBe(defaultValues.title);
    });

    it('should set the detail, instance, and extensions', () => {
        const problemDetails = new ProblemDetailsBuilder()
            .detail('A specific error occurred.')
            .instance('/some/resource')
            .extensions({ additional: 'info' })
            .build();

        expect(problemDetails.detail).toBe('A specific error occurred.');
        expect(problemDetails.instance).toBe('/some/resource');
        expect(problemDetails.extensions).toEqual({ additional: 'info' });
    });

    it('should handle no extensions provided', () => {
        const problemDetails = new ProblemDetailsBuilder()
            .status(400)
            .detail('Bad Request')
            .build();

        expect(problemDetails.extensions).toEqual({});
    });

    it('should handle no instance provided', () => {
        const problemDetails = new ProblemDetailsBuilder()
            .status(400)
            .detail('Bad Request')
            .build();

        expect(problemDetails.instance).toBeUndefined();
    });

    it('should allow chaining of methods', () => {
        const problemDetails = new ProblemDetailsBuilder()
            .status(403)
            .type('https://example.com/problem/forbidden')
            .title('Forbidden')
            .detail('You do not have permission to access this resource.')
            .instance('/forbidden/resource')
            .extensions({ reason: 'User is not authorized.' })
            .build();

        expect(problemDetails.status).toBe(403);
        expect(problemDetails.type).toBe('https://example.com/problem/forbidden');
        expect(problemDetails.title).toBe('Forbidden');
        expect(problemDetails.detail).toBe('You do not have permission to access this resource.');
        expect(problemDetails.instance).toBe('/forbidden/resource');
        expect(problemDetails.extensions).toEqual({ reason: 'User is not authorized.' });
    });
});
