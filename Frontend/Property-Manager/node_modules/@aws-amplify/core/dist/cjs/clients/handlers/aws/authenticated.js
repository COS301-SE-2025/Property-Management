'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticatedHandler = void 0;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const retry_1 = require("../../middleware/retry");
const signing_1 = require("../../middleware/signing");
const userAgent_1 = require("../../middleware/userAgent");
const composeTransferHandler_1 = require("../../internal/composeTransferHandler");
const fetch_1 = require("../fetch");
exports.authenticatedHandler = (0, composeTransferHandler_1.composeTransferHandler)(fetch_1.fetchTransferHandler, [
    userAgent_1.userAgentMiddlewareFactory,
    retry_1.amzSdkInvocationIdHeaderMiddlewareFactory,
    retry_1.retryMiddlewareFactory,
    retry_1.amzSdkRequestHeaderMiddlewareFactory,
    signing_1.signingMiddlewareFactory,
]);
//# sourceMappingURL=authenticated.js.map
