'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.angularWebDetect = angularWebDetect;
exports.angularSSRDetect = angularSSRDetect;
const helpers_1 = require("./helpers");
// Tested with @angular/core 16.0.0
function angularWebDetect() {
    const angularVersionSetInDocument = Boolean((0, helpers_1.documentExists)() && document.querySelector('[ng-version]'));
    const angularContentSetInWindow = Boolean((0, helpers_1.windowExists)() && typeof window.ng !== 'undefined');
    return angularVersionSetInDocument || angularContentSetInWindow;
}
function angularSSRDetect() {
    return (((0, helpers_1.processExists)() &&
        typeof process.env === 'object' &&
        process.env.npm_lifecycle_script?.startsWith('ng ')) ||
        false);
}
//# sourceMappingURL=Angular.js.map
