'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_SERVICE_CLIENT_API_CONFIG = exports.COGNITO_IDENTITY_SERVICE_NAME = void 0;
const clients_1 = require("../../../../clients");
/**
 * The service name used to sign requests if the API requires authentication.
 */
exports.COGNITO_IDENTITY_SERVICE_NAME = 'cognito-identity';
exports.DEFAULT_SERVICE_CLIENT_API_CONFIG = {
    service: exports.COGNITO_IDENTITY_SERVICE_NAME,
    retryDecider: (0, clients_1.getRetryDecider)(clients_1.parseJsonError),
    computeDelay: clients_1.jitteredBackoff,
    cache: 'no-store',
};
//# sourceMappingURL=constants.js.map
