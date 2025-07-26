'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.cognitoIdentityPoolEndpointResolver = void 0;
const clients_1 = require("../../../../clients");
const libraryUtils_1 = require("../../../../libraryUtils");
const constants_1 = require("./constants");
const cognitoIdentityPoolEndpointResolver = ({ region, }) => ({
    url: new libraryUtils_1.AmplifyUrl(`https://${constants_1.COGNITO_IDENTITY_SERVICE_NAME}.${region}.${(0, clients_1.getDnsSuffix)(region)}`),
});
exports.cognitoIdentityPoolEndpointResolver = cognitoIdentityPoolEndpointResolver;
//# sourceMappingURL=cognitoIdentityPoolEndpointResolver.js.map
