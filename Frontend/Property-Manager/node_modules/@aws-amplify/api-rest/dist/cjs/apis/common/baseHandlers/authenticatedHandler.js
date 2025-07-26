'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticatedHandler = void 0;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const aws_client_utils_1 = require("@aws-amplify/core/internals/aws-client-utils");
const composers_1 = require("@aws-amplify/core/internals/aws-client-utils/composers");
/**
 * @internal
 */
exports.authenticatedHandler = (0, composers_1.composeTransferHandler)(aws_client_utils_1.fetchTransferHandler, [
    aws_client_utils_1.userAgentMiddlewareFactory,
    aws_client_utils_1.retryMiddlewareFactory,
    aws_client_utils_1.signingMiddlewareFactory,
]);
//# sourceMappingURL=authenticatedHandler.js.map
