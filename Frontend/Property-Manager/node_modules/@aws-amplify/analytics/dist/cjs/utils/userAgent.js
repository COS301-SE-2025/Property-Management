'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalyticsUserAgent = getAnalyticsUserAgent;
exports.getAnalyticsUserAgentString = getAnalyticsUserAgentString;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const utils_1 = require("@aws-amplify/core/internals/utils");
function getAnalyticsUserAgent(action) {
    return (0, utils_1.getAmplifyUserAgentObject)({
        category: utils_1.Category.Analytics,
        action,
    });
}
function getAnalyticsUserAgentString(action) {
    return (0, utils_1.getAmplifyUserAgent)({
        category: utils_1.Category.Analytics,
        action,
    });
}
//# sourceMappingURL=userAgent.js.map
