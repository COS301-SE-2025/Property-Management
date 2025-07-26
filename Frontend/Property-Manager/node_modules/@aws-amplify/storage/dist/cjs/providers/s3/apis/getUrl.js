'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrl = getUrl;
const core_1 = require("@aws-amplify/core");
const getUrl_1 = require("./internal/getUrl");
function getUrl(input) {
    return (0, getUrl_1.getUrl)(core_1.Amplify, input);
}
//# sourceMappingURL=getUrl.js.map
