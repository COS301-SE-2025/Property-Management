'use strict';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
Object.defineProperty(exports, "__esModule", { value: true });
exports.amzSdkInvocationIdHeaderMiddlewareFactory = void 0;
const libraryUtils_1 = require("../../../libraryUtils");
const constants_1 = require("./constants");
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
        if (!request.headers[constants_1.AMZ_SDK_INVOCATION_ID_HEADER]) {
            request.headers[constants_1.AMZ_SDK_INVOCATION_ID_HEADER] = (0, libraryUtils_1.amplifyUuid)();
        }
        return next(request);
    };
};
exports.amzSdkInvocationIdHeaderMiddlewareFactory = amzSdkInvocationIdHeaderMiddlewareFactory;
//# sourceMappingURL=amzSdkInvocationIdHeaderMiddleware.js.map
