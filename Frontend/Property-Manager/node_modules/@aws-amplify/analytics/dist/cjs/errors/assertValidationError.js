'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertValidationError = assertValidationError;
const AnalyticsError_1 = require("./AnalyticsError");
const validation_1 = require("./validation");
/**
 * @internal
 */
function assertValidationError(assertion, name, message) {
    const { message: defaultMessage, recoverySuggestion } = validation_1.validationErrorMap[name];
    if (!assertion) {
        throw new AnalyticsError_1.AnalyticsError({
            name,
            message: message ?? defaultMessage,
            recoverySuggestion,
        });
    }
}
//# sourceMappingURL=assertValidationError.js.map
