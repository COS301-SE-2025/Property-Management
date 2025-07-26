import { DEFAULT_RETRY_ATTEMPTS, AMZ_SDK_REQUEST_HEADER } from './constants.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
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
const amzSdkRequestHeaderMiddlewareFactory = ({ maxAttempts = DEFAULT_RETRY_ATTEMPTS }) => (next, context) => {
    return async function amzSdkRequestHeaderMiddleware(request) {
        const attemptsCount = context.attemptsCount ?? 0;
        request.headers[AMZ_SDK_REQUEST_HEADER] =
            `attempt=${attemptsCount + 1}; max=${maxAttempts}`;
        return next(request);
    };
};

export { amzSdkRequestHeaderMiddlewareFactory };
//# sourceMappingURL=amzSdkRequestHeaderMiddleware.mjs.map
