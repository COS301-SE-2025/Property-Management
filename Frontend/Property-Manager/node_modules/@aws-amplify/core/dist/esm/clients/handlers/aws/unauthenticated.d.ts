import { AmzSdkRequestHeaderMiddlewareOptions, RetryOptions } from '../../middleware/retry';
import { UserAgentOptions } from '../../middleware/userAgent';
import { HttpRequest, HttpResponse } from '../../types';
export declare const unauthenticatedHandler: (request: HttpRequest, options: UserAgentOptions & object & RetryOptions<HttpResponse> & AmzSdkRequestHeaderMiddlewareOptions & import("../../types").HttpTransferOptions) => Promise<HttpResponse>;
