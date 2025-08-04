import { HttpRequest, HttpResponse, Middleware } from '../../../clients';
/**
 * A Cognito Identity-specific middleware that disables caching for all requests.
 */
export declare const createDisableCacheMiddleware: Middleware<HttpRequest, HttpResponse, Record<string, unknown>>;
