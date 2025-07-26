import '../../../../../types/errors.mjs';
import '../../../../../errors/errorHelpers.mjs';
import { unauthenticatedHandler } from '../../../../../clients/handlers/aws/unauthenticated.mjs';
import '../../../../../utils/getClientInfo/getClientInfo.mjs';
import '../../../../../utils/retry/retry.mjs';
import '../../../../../parseAWSExports.mjs';
import 'uuid';
import '../../../../../singleton/Auth/utils/errorHelpers.mjs';
import '@aws-crypto/sha256-js';
import '@smithy/util-hex-encoding';
import '../../../../../Platform/index.mjs';
import '../../../../../Platform/types.mjs';
import '../../../../../BackgroundProcessManager/types.mjs';
import '../../../../../Reachability/Reachability.mjs';
import '../../../../../Hub/index.mjs';
import '../../../../../utils/sessionListener/index.mjs';
import { composeTransferHandler } from '../../../../../clients/internal/composeTransferHandler.mjs';
import { createDisableCacheMiddleware } from '../../../middleware/createDisableCacheMiddleware.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * A Cognito Identity-specific transfer handler that does NOT sign requests, and
 * disables caching.
 *
 * @internal
 */
const cognitoIdentityTransferHandler = composeTransferHandler(unauthenticatedHandler, [createDisableCacheMiddleware]);

export { cognitoIdentityTransferHandler };
//# sourceMappingURL=cognitoIdentityTransferHandler.mjs.map
