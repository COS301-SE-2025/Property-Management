import { Endpoint, HttpResponse } from '../../clients/types';
import type { PutEventsCommandInput as PutEventsInput, PutEventsCommandOutput as PutEventsOutput } from './types';
export type { PutEventsInput, PutEventsOutput };
/**
 * @internal
 */
export declare const putEvents: (config: {
    service?: string | undefined;
    endpointResolver?: (((options: import("../../clients/types").EndpointResolverOptions, input?: any) => Endpoint) & (({ region }: import("../../clients/types").EndpointResolverOptions) => {
        url: URL;
    })) | undefined;
    retryDecider?: (((response?: HttpResponse | undefined, error?: unknown, middlewareContext?: import("../../clients/types").MiddlewareContext) => Promise<import("../../clients").RetryDeciderOutput>) & ((response?: HttpResponse, error?: unknown) => Promise<import("../../clients").RetryDeciderOutput>)) | undefined;
    computeDelay?: ((attempt: number) => number) | undefined;
    userAgentValue?: string | undefined;
} & {
    abortSignal?: AbortSignal | undefined;
    cache?: RequestCache | undefined;
    withCrossDomainCredentials?: boolean | undefined;
    maxAttempts?: number | undefined;
    region: string;
    credentials: import("@smithy/types/dist-types/identity/awsCredentialIdentity").AwsCredentialIdentity | ((options?: import("../../clients").CredentialsProviderOptions) => Promise<import("@smithy/types/dist-types/identity/awsCredentialIdentity").AwsCredentialIdentity>);
    uriEscapePath?: boolean | undefined;
    userAgentHeader?: string | undefined;
}, input: import("./types").PutEventsRequest) => Promise<PutEventsOutput>;
