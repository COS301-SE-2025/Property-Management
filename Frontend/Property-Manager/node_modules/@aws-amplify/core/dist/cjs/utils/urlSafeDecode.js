'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlSafeDecode = urlSafeDecode;
function urlSafeDecode(hex) {
    const matchArr = hex.match(/.{2}/g) || [];
    return matchArr.map(char => String.fromCharCode(parseInt(char, 16))).join('');
}
//# sourceMappingURL=urlSafeDecode.js.map
