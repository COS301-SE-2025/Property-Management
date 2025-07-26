'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildHttpRpcRequest = exports.createClientSerializer = void 0;
const createClientSerializer = (operation) => (input, endpoint) => {
    const headers = getSharedHeaders(operation);
    const body = JSON.stringify(input);
    return (0, exports.buildHttpRpcRequest)(endpoint, headers, body);
};
exports.createClientSerializer = createClientSerializer;
const getSharedHeaders = (operation) => ({
    'content-type': 'application/x-amz-json-1.1',
    'x-amz-target': `AWSCognitoIdentityService.${operation}`,
});
const buildHttpRpcRequest = ({ url }, headers, body) => ({
    headers,
    url,
    body,
    method: 'POST',
});
exports.buildHttpRpcRequest = buildHttpRpcRequest;
//# sourceMappingURL=createClientSerializer.js.map
