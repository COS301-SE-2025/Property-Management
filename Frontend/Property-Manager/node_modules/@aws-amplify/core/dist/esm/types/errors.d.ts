import { ResponseMetadata as SdkResponseMetadata } from '@aws-sdk/types';
export type ResponseMetadata = Pick<SdkResponseMetadata, 'extendedRequestId' | 'httpStatusCode' | 'requestId'>;
export declare enum AmplifyErrorCode {
    NoEndpointId = "NoEndpointId",
    PlatformNotSupported = "PlatformNotSupported",
    Unknown = "Unknown",
    NetworkError = "NetworkError"
}
export interface AmplifyErrorParams<ErrorCode extends string = string> {
    message: string;
    name: ErrorCode;
    recoverySuggestion?: string;
    underlyingError?: Error | unknown;
    metadata?: ResponseMetadata;
}
export type AmplifyErrorMap<ErrorCode extends string = string> = Record<ErrorCode, {
    message: string;
    recoverySuggestion?: string;
}>;
export interface ServiceError {
    name: string;
    message: string;
}
export type AssertionFunction<ErrorCode extends string = string> = (assertion: boolean, name: ErrorCode, additionalContext?: string) => asserts assertion;
