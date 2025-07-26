'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = remove;
const adapter_core_1 = require("@aws-amplify/core/internals/adapter-core");
const remove_1 = require("../internal/remove");
function remove(contextSpec, input) {
    return (0, remove_1.remove)((0, adapter_core_1.getAmplifyServerContext)(contextSpec).amplify, input);
}
//# sourceMappingURL=remove.js.map
