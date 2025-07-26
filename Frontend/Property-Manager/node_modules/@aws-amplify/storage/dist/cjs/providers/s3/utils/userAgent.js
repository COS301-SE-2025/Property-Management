'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.getStorageUserAgentValue = getStorageUserAgentValue;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const utils_1 = require("@aws-amplify/core/internals/utils");
function getStorageUserAgentValue(action) {
    return (0, utils_1.getAmplifyUserAgent)({
        category: utils_1.Category.Storage,
        action,
    });
}
//# sourceMappingURL=userAgent.js.map
