import { HttpRequest, HttpResponse, RetryOptions, SigningOptions, UserAgentOptions } from '@aws-amplify/core/internals/aws-client-utils';
/**
 * @internal
 */
export declare const authenticatedHandler: (request: HttpRequest, options: UserAgentOptions & RetryOptions<HttpResponse> & SigningOptions & import("@aws-amplify/core/internals/aws-client-utils").HttpTransferOptions) => Promise<HttpResponse>;
