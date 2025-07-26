import { fetchTransferHandler, userAgentMiddlewareFactory, retryMiddlewareFactory } from '@aws-amplify/core/internals/aws-client-utils';
import { composeTransferHandler } from '@aws-amplify/core/internals/aws-client-utils/composers';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * @internal
 */
const unauthenticatedHandler = composeTransferHandler(fetchTransferHandler, [userAgentMiddlewareFactory, retryMiddlewareFactory]);

export { unauthenticatedHandler };
//# sourceMappingURL=unauthenticatedHandler.mjs.map
