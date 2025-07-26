'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.nuxtWebDetect = nuxtWebDetect;
exports.nuxtSSRDetect = nuxtSSRDetect;
const helpers_1 = require("./helpers");
// Tested with nuxt 2.15 / vue 2.7
function nuxtWebDetect() {
    return ((0, helpers_1.windowExists)() &&
        (window.__NUXT__ !== undefined ||
            window.$nuxt !== undefined));
}
function nuxtSSRDetect() {
    return ((0, helpers_1.globalExists)() && typeof global.__NUXT_PATHS__ !== 'undefined');
}
//# sourceMappingURL=Nuxt.js.map
