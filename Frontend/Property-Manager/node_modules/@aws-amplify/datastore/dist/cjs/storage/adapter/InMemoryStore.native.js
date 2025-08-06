'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.createInMemoryStore = createInMemoryStore;
const tslib_1 = require("tslib");
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const async_storage_1 = tslib_1.__importDefault(require("@react-native-async-storage/async-storage"));
// See: https://react-native-async-storage.github.io/async-storage/
function createInMemoryStore() {
    return async_storage_1.default;
}
//# sourceMappingURL=InMemoryStore.native.js.map
