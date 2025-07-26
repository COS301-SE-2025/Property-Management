import { getDnsSuffix } from '../../clients/endpoints/getDnsSuffix.mjs';
import { jitteredBackoff } from '../../clients/middleware/retry/jitteredBackoff.mjs';
import { getRetryDecider } from '../../clients/middleware/retry/defaultRetryDecider.mjs';
import '../../types/errors.mjs';
import '../../errors/errorHelpers.mjs';
import '../../utils/getClientInfo/getClientInfo.mjs';
import '../../utils/retry/retry.mjs';
import '../../parseAWSExports.mjs';
import 'uuid';
import { AmplifyUrl } from '../../utils/amplifyUrl/index.mjs';
import '../../singleton/Auth/utils/errorHelpers.mjs';
import '@aws-crypto/sha256-js';
import '@smithy/util-hex-encoding';
import { getAmplifyUserAgent } from '../../Platform/index.mjs';
import '../../Platform/types.mjs';
import '../../BackgroundProcessManager/types.mjs';
import '../../Reachability/Reachability.mjs';
import '../../Hub/index.mjs';
import '../../utils/sessionListener/index.mjs';
import { parseJsonError } from '../../clients/serde/json.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * The service name used to sign requests if the API requires authentication.
 */
const SERVICE_NAME = 'mobiletargeting';
/**
 * The endpoint resolver function that returns the endpoint URL for a given region.
 */
const endpointResolver = ({ region }) => ({
    url: new AmplifyUrl(`https://pinpoint.${region}.${getDnsSuffix(region)}`),
});
/**
 * @internal
 */
const defaultConfig = {
    service: SERVICE_NAME,
    endpointResolver,
    retryDecider: getRetryDecider(parseJsonError),
    computeDelay: jitteredBackoff,
    userAgentValue: getAmplifyUserAgent(),
};
/**
 * @internal
 */
const getSharedHeaders = () => ({
    'content-type': 'application/json',
});

export { defaultConfig, getSharedHeaders };
//# sourceMappingURL=base.mjs.map
