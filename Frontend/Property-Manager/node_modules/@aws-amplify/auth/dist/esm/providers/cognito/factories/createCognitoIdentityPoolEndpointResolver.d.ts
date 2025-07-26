import { EndpointResolverOptions } from '@aws-amplify/core/internals/aws-client-utils';
export declare const createCognitoIdentityPoolEndpointResolver: ({ endpointOverride }: {
    endpointOverride: string | undefined;
}) => (input: EndpointResolverOptions) => {
    url: URL;
};
