// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Default cache config
 */
const defaultConfig = {
    keyPrefix: 'aws-amplify-cache',
    capacityInBytes: 1048576, // 1MB
    itemMaxSize: 210000, // about 200kb
    defaultTTL: 259200000, // about 3 days
    defaultPriority: 5,
    warningThreshold: 0.8,
};
const currentSizeKey = 'CurSize';

export { currentSizeKey, defaultConfig };
//# sourceMappingURL=constants.mjs.map
