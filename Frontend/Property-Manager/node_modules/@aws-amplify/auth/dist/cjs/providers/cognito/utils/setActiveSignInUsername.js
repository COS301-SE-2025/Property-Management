'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.setActiveSignInUsername = setActiveSignInUsername;
const store_1 = require("../../../client/utils/store");
function setActiveSignInUsername(username) {
    const { dispatch } = store_1.signInStore;
    dispatch({ type: 'SET_USERNAME', value: username });
}
//# sourceMappingURL=setActiveSignInUsername.js.map
