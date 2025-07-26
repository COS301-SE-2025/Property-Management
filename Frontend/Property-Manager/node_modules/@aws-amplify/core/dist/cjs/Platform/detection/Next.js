'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextWebDetect = nextWebDetect;
exports.nextSSRDetect = nextSSRDetect;
const helpers_1 = require("./helpers");
// Tested with next 13.4 / react 18.2
function nextWebDetect() {
    return ((0, helpers_1.windowExists)() &&
        window.next &&
        typeof window.next === 'object');
}
function nextSSRDetect() {
    return ((0, helpers_1.globalExists)() &&
        ((0, helpers_1.keyPrefixMatch)(global, '__next') || (0, helpers_1.keyPrefixMatch)(global, '__NEXT')));
}
//# sourceMappingURL=Next.js.map
