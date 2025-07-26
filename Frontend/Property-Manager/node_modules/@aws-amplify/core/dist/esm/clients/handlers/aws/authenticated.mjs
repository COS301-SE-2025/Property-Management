import { retryMiddlewareFactory } from '../../middleware/retry/retryMiddleware.mjs';
import '../../../types/errors.mjs';
import '../../../errors/errorHelpers.mjs';
import '../../../utils/getClientInfo/getClientInfo.mjs';
import '../../../utils/retry/retry.mjs';
import { amzSdkInvocationIdHeaderMiddlewareFactory } from '../../middleware/retry/amzSdkInvocationIdHeaderMiddleware.mjs';
import { amzSdkRequestHeaderMiddlewareFactory } from '../../middleware/retry/amzSdkRequestHeaderMiddleware.mjs';
import { signingMiddlewareFactory } from '../../middleware/signing/middleware.mjs';
import { userAgentMiddlewareFactory } from '../../middleware/userAgent/middleware.mjs';
import { composeTransferHandler } from '../../internal/composeTransferHandler.mjs';
import { fetchTransferHandler } from '../fetch.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const authenticatedHandler = composeTransferHandler(fetchTransferHandler, [
    userAgentMiddlewareFactory,
    amzSdkInvocationIdHeaderMiddlewareFactory,
    retryMiddlewareFactory,
    amzSdkRequestHeaderMiddlewareFactory,
    signingMiddlewareFactory,
]);

export { authenticatedHandler };
//# sourceMappingURL=authenticated.mjs.map
