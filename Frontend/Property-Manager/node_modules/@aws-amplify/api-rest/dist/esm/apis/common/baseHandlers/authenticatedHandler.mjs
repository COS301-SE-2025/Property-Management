import { fetchTransferHandler, userAgentMiddlewareFactory, retryMiddlewareFactory, signingMiddlewareFactory } from '@aws-amplify/core/internals/aws-client-utils';
import { composeTransferHandler } from '@aws-amplify/core/internals/aws-client-utils/composers';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * @internal
 */
const authenticatedHandler = composeTransferHandler(fetchTransferHandler, [
    userAgentMiddlewareFactory,
    retryMiddlewareFactory,
    signingMiddlewareFactory,
]);

export { authenticatedHandler };
//# sourceMappingURL=authenticatedHandler.mjs.map
