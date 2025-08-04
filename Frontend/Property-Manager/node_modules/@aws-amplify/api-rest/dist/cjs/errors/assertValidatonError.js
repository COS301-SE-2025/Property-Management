'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertValidationError = assertValidationError;
const RestApiError_1 = require("./RestApiError");
const validation_1 = require("./validation");
/**
 * @internal
 */
function assertValidationError(assertion, name) {
    const { message, recoverySuggestion } = validation_1.validationErrorMap[name];
    if (!assertion) {
        throw new RestApiError_1.RestApiError({ name, message, recoverySuggestion });
    }
}
//# sourceMappingURL=assertValidatonError.js.map
