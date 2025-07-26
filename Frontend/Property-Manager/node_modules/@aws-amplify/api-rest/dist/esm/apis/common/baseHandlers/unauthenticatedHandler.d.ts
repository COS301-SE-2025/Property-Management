import { HttpRequest, HttpResponse, RetryOptions, UserAgentOptions } from '@aws-amplify/core/internals/aws-client-utils';
/**
 * @internal
 */
export declare const unauthenticatedHandler: (request: HttpRequest, options: UserAgentOptions & RetryOptions<HttpResponse> & import("@aws-amplify/core/internals/aws-client-utils").HttpTransferOptions) => Promise<HttpResponse>;
