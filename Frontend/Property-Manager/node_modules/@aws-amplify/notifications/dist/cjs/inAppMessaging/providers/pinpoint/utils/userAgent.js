'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.getInAppMessagingUserAgent = getInAppMessagingUserAgent;
exports.getInAppMessagingUserAgentString = getInAppMessagingUserAgentString;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const utils_1 = require("@aws-amplify/core/internals/utils");
function getInAppMessagingUserAgent(action) {
    return (0, utils_1.getAmplifyUserAgentObject)({
        category: utils_1.Category.InAppMessaging,
        action,
    });
}
function getInAppMessagingUserAgentString(action) {
    return (0, utils_1.getAmplifyUserAgent)({
        category: utils_1.Category.InAppMessaging,
        action,
    });
}
//# sourceMappingURL=userAgent.js.map
