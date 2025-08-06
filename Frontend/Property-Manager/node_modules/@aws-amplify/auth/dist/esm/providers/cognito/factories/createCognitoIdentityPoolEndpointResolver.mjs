import { cognitoIdentityPoolEndpointResolver } from '@aws-amplify/core';
import { AmplifyUrl } from '@aws-amplify/core/internals/utils';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const createCognitoIdentityPoolEndpointResolver = ({ endpointOverride }) => (input) => {
    if (endpointOverride) {
        return { url: new AmplifyUrl(endpointOverride) };
    }
    return cognitoIdentityPoolEndpointResolver(input);
};

export { createCognitoIdentityPoolEndpointResolver };
//# sourceMappingURL=createCognitoIdentityPoolEndpointResolver.mjs.map
