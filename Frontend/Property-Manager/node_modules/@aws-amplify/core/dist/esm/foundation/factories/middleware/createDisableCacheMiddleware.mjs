// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * A Cognito Identity-specific middleware that disables caching for all requests.
 */
const createDisableCacheMiddleware = () => next => async function disableCacheMiddleware(request) {
    request.headers['cache-control'] = 'no-store';
    return next(request);
};

export { createDisableCacheMiddleware };
//# sourceMappingURL=createDisableCacheMiddleware.mjs.map
