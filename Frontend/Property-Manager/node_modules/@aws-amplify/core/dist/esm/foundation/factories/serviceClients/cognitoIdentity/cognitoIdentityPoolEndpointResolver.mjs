import { getDnsSuffix } from '../../../../clients/endpoints/getDnsSuffix.mjs';
import '../../../../types/errors.mjs';
import '../../../../errors/errorHelpers.mjs';
import '../../../../utils/getClientInfo/getClientInfo.mjs';
import '../../../../utils/retry/retry.mjs';
import '../../../../parseAWSExports.mjs';
import 'uuid';
import { AmplifyUrl } from '../../../../utils/amplifyUrl/index.mjs';
import '../../../../singleton/Auth/utils/errorHelpers.mjs';
import '@aws-crypto/sha256-js';
import '@smithy/util-hex-encoding';
import '../../../../Platform/index.mjs';
import '../../../../Platform/types.mjs';
import '../../../../BackgroundProcessManager/types.mjs';
import '../../../../Reachability/Reachability.mjs';
import '../../../../Hub/index.mjs';
import '../../../../utils/sessionListener/index.mjs';
import { COGNITO_IDENTITY_SERVICE_NAME } from './constants.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const cognitoIdentityPoolEndpointResolver = ({ region, }) => ({
    url: new AmplifyUrl(`https://${COGNITO_IDENTITY_SERVICE_NAME}.${region}.${getDnsSuffix(region)}`),
});

export { cognitoIdentityPoolEndpointResolver };
//# sourceMappingURL=cognitoIdentityPoolEndpointResolver.mjs.map
