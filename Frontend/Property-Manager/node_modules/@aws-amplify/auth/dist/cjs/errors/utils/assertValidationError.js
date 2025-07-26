'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertValidationError = assertValidationError;
const AuthErrorStrings_1 = require("../../common/AuthErrorStrings");
const AuthError_1 = require("../AuthError");
function assertValidationError(assertion, name) {
    const { message, recoverySuggestion } = AuthErrorStrings_1.validationErrorMap[name];
    if (!assertion) {
        throw new AuthError_1.AuthError({ name, message, recoverySuggestion });
    }
}
//# sourceMappingURL=assertValidationError.js.map
