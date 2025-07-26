'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.graphqlRequest = graphqlRequest;
const utils_1 = require("@aws-amplify/core/internals/utils");
const internals_1 = require("@aws-amplify/api-rest/internals");
async function graphqlRequest(amplify, url, options, abortController, _post) {
    const p = _post ?? internals_1.post;
    const { body: responseBody } = await p(amplify, {
        url: new utils_1.AmplifyUrl(url),
        options,
        abortController,
    });
    const response = await responseBody.json();
    return response;
}
//# sourceMappingURL=graphqlRequest.js.map
