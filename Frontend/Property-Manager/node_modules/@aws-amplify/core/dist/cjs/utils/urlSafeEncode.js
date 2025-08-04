'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlSafeEncode = urlSafeEncode;
function urlSafeEncode(str) {
    return str
        .split('')
        .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('');
}
//# sourceMappingURL=urlSafeEncode.js.map
