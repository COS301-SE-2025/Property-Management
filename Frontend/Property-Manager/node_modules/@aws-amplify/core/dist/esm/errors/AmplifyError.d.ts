import { AmplifyErrorParams, ResponseMetadata } from '../types/errors';
export declare class AmplifyError extends Error {
    readonly underlyingError?: Error | unknown;
    readonly recoverySuggestion?: string;
    /**
     * Additional metadata that can be used to provide more context to the error.
     */
    readonly metadata?: ResponseMetadata;
    /**
     *  Constructs an AmplifyError.
     *
     * @param message text that describes the main problem.
     * @param underlyingError the underlying cause of the error.
     * @param recoverySuggestion suggestion to recover from the error.
     *
     */
    constructor({ message, name, recoverySuggestion, underlyingError, metadata, }: AmplifyErrorParams);
}
