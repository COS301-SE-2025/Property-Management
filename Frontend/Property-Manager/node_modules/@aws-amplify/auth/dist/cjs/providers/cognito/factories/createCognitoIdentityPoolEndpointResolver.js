'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.createCognitoIdentityPoolEndpointResolver = void 0;
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const core_1 = require("@aws-amplify/core");
const utils_1 = require("@aws-amplify/core/internals/utils");
const createCognitoIdentityPoolEndpointResolver = ({ endpointOverride }) => (input) => {
    if (endpointOverride) {
        return { url: new utils_1.AmplifyUrl(endpointOverride) };
    }
    return (0, core_1.cognitoIdentityPoolEndpointResolver)(input);
};
exports.createCognitoIdentityPoolEndpointResolver = createCognitoIdentityPoolEndpointResolver;
//# sourceMappingURL=createCognitoIdentityPoolEndpointResolver.js.map
