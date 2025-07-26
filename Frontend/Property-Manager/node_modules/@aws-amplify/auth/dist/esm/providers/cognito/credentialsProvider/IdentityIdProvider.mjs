import { createGetIdClient } from '@aws-amplify/core';
import { AuthError } from '../../../errors/AuthError.mjs';
import { assertServiceError } from '../../../errors/utils/assertServiceError.mjs';
import { getRegionFromIdentityPoolId } from '../../../foundation/parsers/regionParsers.mjs';
import '@aws-amplify/core/internals/utils';
import '@aws-amplify/core/internals/aws-client-utils';
import { createCognitoIdentityPoolEndpointResolver } from '../factories/createCognitoIdentityPoolEndpointResolver.mjs';
import { formLoginsMap } from './utils.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Provides a Cognito identityId
 *
 * @param tokens - The AuthTokens received after SignIn
 * @returns string
 * @throws configuration exceptions: `InvalidIdentityPoolIdException`
 *  - Auth errors that may arise from misconfiguration.
 * @throws service exceptions: {@link GetIdException }
 */
async function cognitoIdentityIdProvider({ tokens, authConfig, identityIdStore, }) {
    identityIdStore.setAuthConfig({ Cognito: authConfig });
    // will return null only if there is no identityId cached or if there is an error retrieving it
    const identityId = await identityIdStore.loadIdentityId();
    if (identityId) {
        return identityId.id;
    }
    const logins = tokens?.idToken
        ? formLoginsMap(tokens.idToken.toString())
        : {};
    const generatedIdentityId = await generateIdentityId(logins, authConfig);
    // Store generated identityId
    identityIdStore.storeIdentityId({
        id: generatedIdentityId,
        type: tokens ? 'primary' : 'guest',
    });
    return generatedIdentityId;
}
async function generateIdentityId(logins, authConfig) {
    const identityPoolId = authConfig?.identityPoolId;
    const region = getRegionFromIdentityPoolId(identityPoolId);
    const getId = createGetIdClient({
        endpointResolver: createCognitoIdentityPoolEndpointResolver({
            endpointOverride: authConfig.identityPoolEndpoint,
        }),
    });
    // IdentityId is absent so get it using IdentityPoolId with Cognito's GetId API
    let idResult;
    // for a first-time user, this will return a brand new identity
    // for a returning user, this will retrieve the previous identity assocaited with the logins
    try {
        idResult = (await getId({
            region,
        }, {
            IdentityPoolId: identityPoolId,
            Logins: logins,
        })).IdentityId;
    }
    catch (e) {
        assertServiceError(e);
        throw new AuthError(e);
    }
    if (!idResult) {
        throw new AuthError({
            name: 'GetIdResponseException',
            message: 'Received undefined response from getId operation',
            recoverySuggestion: 'Make sure to pass a valid identityPoolId in the configuration.',
        });
    }
    return idResult;
}

export { cognitoIdentityIdProvider };
//# sourceMappingURL=IdentityIdProvider.mjs.map
