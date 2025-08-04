// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const createClientSerializer = (operation) => (input, endpoint) => {
    const headers = getSharedHeaders(operation);
    const body = JSON.stringify(input);
    return buildHttpRpcRequest(endpoint, headers, body);
};
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

export { buildHttpRpcRequest, createClientSerializer };
//# sourceMappingURL=createClientSerializer.mjs.map
