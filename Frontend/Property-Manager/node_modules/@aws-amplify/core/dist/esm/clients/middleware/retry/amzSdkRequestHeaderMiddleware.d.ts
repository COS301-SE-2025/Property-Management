import { HttpRequest, HttpResponse, Middleware } from '../../types';
import { RetryOptions } from './retryMiddleware';
export type AmzSdkRequestHeaderMiddlewareOptions = Pick<RetryOptions, 'maxAttempts'>;
/**
 * Middleware injects `amz-sdk-request` header to indicate the retry state at the time an HTTP request is made.
 * This middleware should co-exist with retryMiddleware as it relies on the retryAttempts value in middleware context
 * set by the retry middleware.
 *
 * Example header: `amz-sdk-request: attempt=1; max=3`.
 *
 * This middleware is standalone because of extra headers may conflict with custom endpoint settings(e.g. CORS), we will
 * NOT use this middleware for API categories.
 */
export declare const amzSdkRequestHeaderMiddlewareFactory: Middleware<HttpRequest, HttpResponse, AmzSdkRequestHeaderMiddlewareOptions>;
