'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.cognitoIdentityIdProvider = cognitoIdentityIdProvider;
const core_1 = require("@aws-amplify/core");
const AuthError_1 = require("../../../errors/AuthError");
const assertServiceError_1 = require("../../../errors/utils/assertServiceError");
const parsers_1 = require("../../../foundation/parsers");
const factories_1 = require("../factories");
const utils_1 = require("./utils");
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
        ? (0, utils_1.formLoginsMap)(tokens.idToken.toString())
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
    const region = (0, parsers_1.getRegionFromIdentityPoolId)(identityPoolId);
    const getId = (0, core_1.createGetIdClient)({
        endpointResolver: (0, factories_1.createCognitoIdentityPoolEndpointResolver)({
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
        (0, assertServiceError_1.assertServiceError)(e);
        throw new AuthError_1.AuthError(e);
    }
    if (!idResult) {
        throw new AuthError_1.AuthError({
            name: 'GetIdResponseException',
            message: 'Received undefined response from getId operation',
            recoverySuggestion: 'Make sure to pass a valid identityPoolId in the configuration.',
        });
    }
    return idResult;
}
//# sourceMappingURL=IdentityIdProvider.js.map
