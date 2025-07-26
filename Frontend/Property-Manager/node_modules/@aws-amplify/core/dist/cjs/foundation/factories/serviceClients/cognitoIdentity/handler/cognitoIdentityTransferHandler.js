'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.cognitoIdentityTransferHandler = void 0;
const clients_1 = require("../../../../../clients");
const internal_1 = require("../../../../../clients/internal");
const middleware_1 = require("../../../middleware");
/**
 * A Cognito Identity-specific transfer handler that does NOT sign requests, and
 * disables caching.
 *
 * @internal
 */
exports.cognitoIdentityTransferHandler = (0, internal_1.composeTransferHandler)(clients_1.unauthenticatedHandler, [middleware_1.createDisableCacheMiddleware]);
//# sourceMappingURL=cognitoIdentityTransferHandler.js.map
