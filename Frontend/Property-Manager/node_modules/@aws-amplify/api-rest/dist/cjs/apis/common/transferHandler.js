'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.transferHandler = void 0;
const aws_client_utils_1 = require("@aws-amplify/core/internals/aws-client-utils");
const utils_1 = require("../../utils");
const resolveHeaders_1 = require("../../utils/resolveHeaders");
const authenticatedHandler_1 = require("./baseHandlers/authenticatedHandler");
const unauthenticatedHandler_1 = require("./baseHandlers/unauthenticatedHandler");
/**
 * Make REST API call with best-effort IAM auth.
 * @param amplify Amplify instance to to resolve credentials and tokens. Should use different instance in client-side
 *   and SSR
 * @param options Options accepted from public API options when calling the handlers.
 * @param signingServiceInfo Internal-only options enable IAM auth as well as to to overwrite the IAM signing service
 *   and region. If specified, and NONE of API Key header or Auth header is present, IAM auth will be used.
 * @param iamAuthApplicable Callback function that is used to determine if IAM Auth should be used or not.
 *
 * @internal
 */
const transferHandler = async (amplify, options, iamAuthApplicable, signingServiceInfo) => {
    const { url, method, headers, body, withCredentials, abortSignal, retryStrategy, } = options;
    const resolvedBody = body
        ? body instanceof FormData
            ? body
            : JSON.stringify(body ?? '')
        : undefined;
    const resolvedHeaders = (0, resolveHeaders_1.resolveHeaders)(headers, body);
    const request = {
        url,
        headers: resolvedHeaders,
        method,
        body: resolvedBody,
    };
    const baseOptions = {
        retryDecider: getRetryDeciderFromStrategy(retryStrategy ?? amplify?.libraryOptions?.API?.REST?.retryStrategy),
        computeDelay: aws_client_utils_1.jitteredBackoff,
        withCrossDomainCredentials: withCredentials,
        abortSignal,
    };
    const isIamAuthApplicable = iamAuthApplicable(request, signingServiceInfo);
    let response;
    const credentials = await resolveCredentials(amplify);
    if (isIamAuthApplicable && credentials) {
        const signingInfoFromUrl = (0, utils_1.parseSigningInfo)(url);
        const signingService = signingServiceInfo?.service ?? signingInfoFromUrl.service;
        const signingRegion = signingServiceInfo?.region ?? signingInfoFromUrl.region;
        response = await (0, authenticatedHandler_1.authenticatedHandler)(request, {
            ...baseOptions,
            credentials,
            region: signingRegion,
            service: signingService,
        });
    }
    else {
        response = await (0, unauthenticatedHandler_1.unauthenticatedHandler)(request, {
            ...baseOptions,
        });
    }
    // Clean-up un-modeled properties from response.
    return {
        statusCode: response.statusCode,
        headers: response.headers,
        body: response.body,
    };
};
exports.transferHandler = transferHandler;
const getRetryDeciderFromStrategy = (retryStrategy) => {
    const strategy = retryStrategy?.strategy;
    if (strategy === 'no-retry') {
        return () => Promise.resolve({ retryable: false });
    }
    return (0, aws_client_utils_1.getRetryDecider)(utils_1.parseRestApiServiceError);
};
const resolveCredentials = async (amplify) => {
    try {
        const { credentials } = await amplify.Auth.fetchAuthSession();
        if (credentials) {
            return credentials;
        }
    }
    catch (e) {
        utils_1.logger.debug('No credentials available, the request will be unsigned.');
    }
    return null;
};
//# sourceMappingURL=transferHandler.js.map
