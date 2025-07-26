'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGraphQLResponseWithErrors = isGraphQLResponseWithErrors;
function isGraphQLResponseWithErrors(response) {
    if (!response) {
        return false;
    }
    const r = response;
    return Array.isArray(r.errors) && r.errors.length > 0;
}
//# sourceMappingURL=isGraphQLResponseWithErrors.js.map
