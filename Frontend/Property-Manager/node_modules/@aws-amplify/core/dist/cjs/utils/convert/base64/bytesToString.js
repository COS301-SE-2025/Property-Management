'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.bytesToString = bytesToString;
function bytesToString(input) {
    return Array.from(input, byte => String.fromCodePoint(byte)).join('');
}
//# sourceMappingURL=bytesToString.js.map
