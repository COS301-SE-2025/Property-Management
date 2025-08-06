import '../../../types/errors.mjs';
import '../../../errors/errorHelpers.mjs';
import '../../../utils/getClientInfo/getClientInfo.mjs';
import '../../../utils/retry/retry.mjs';
import '../../../parseAWSExports.mjs';
import { amplifyUuid } from '../../../utils/amplifyUuid/index.mjs';
import '../../../singleton/Auth/utils/errorHelpers.mjs';
import '@aws-crypto/sha256-js';
import '@smithy/util-hex-encoding';
import '../../../Platform/index.mjs';
import '../../../Platform/types.mjs';
import '../../../BackgroundProcessManager/types.mjs';
import '../../../Reachability/Reachability.mjs';
import '../../../Hub/index.mjs';
import '../../../utils/sessionListener/index.mjs';
import { AMZ_SDK_INVOCATION_ID_HEADER } from './constants.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Middleware injects a UUID string to `amz-sdk-invocation-id` header.
 * if the header is not set already. This header is helpful to provide
 * observability to group the requests caused by automatic retry.
 *
 * This middleware is standalone because of extra UUID dependency, we will
 * NOT use this middleware for API categories.
 *
 * Ref: https://sdk.amazonaws.com/kotlin/api/smithy-kotlin/api/1.0.9/http-client/aws.smithy.kotlin.runtime.http.operation/-http-operation-context/-sdk-invocation-id.html
 */
const amzSdkInvocationIdHeaderMiddlewareFactory = () => next => {
    return async function amzSdkInvocationIdHeaderMiddleware(request) {
        if (!request.headers[AMZ_SDK_INVOCATION_ID_HEADER]) {
            request.headers[AMZ_SDK_INVOCATION_ID_HEADER] = amplifyUuid();
        }
        return next(request);
    };
};

export { amzSdkInvocationIdHeaderMiddlewareFactory };
//# sourceMappingURL=amzSdkInvocationIdHeaderMiddleware.mjs.map
