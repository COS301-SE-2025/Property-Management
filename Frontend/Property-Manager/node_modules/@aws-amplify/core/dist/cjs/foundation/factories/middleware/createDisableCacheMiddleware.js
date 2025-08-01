'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDisableCacheMiddleware = void 0;
/**
 * A Cognito Identity-specific middleware that disables caching for all requests.
 */
const createDisableCacheMiddleware = () => next => async function disableCacheMiddleware(request) {
    request.headers['cache-control'] = 'no-store';
    return next(request);
};
exports.createDisableCacheMiddleware = createDisableCacheMiddleware;
//# sourceMappingURL=createDisableCacheMiddleware.js.map
