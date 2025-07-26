'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProperties = getProperties;
const core_1 = require("@aws-amplify/core");
const getProperties_1 = require("./internal/getProperties");
function getProperties(input) {
    return (0, getProperties_1.getProperties)(core_1.Amplify, input);
}
//# sourceMappingURL=getProperties.js.map
