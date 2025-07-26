import { HttpResponse } from '../../../../clients';
import { GetCredentialsForIdentityCommandOutput, GetCredentialsForIdentityInput, ServiceClientFactoryInput } from './types';
export declare const createGetCredentialsForIdentityClient: (config: ServiceClientFactoryInput) => (config: {
    userAgentValue?: string | undefined;
    endpointResolver?: (((options: import("../../../../clients").EndpointResolverOptions, input?: any) => import("../../../../clients").Endpoint) & ((options: import("../../../../clients").EndpointResolverOptions) => {
        url: URL;
    })) | undefined;
    service?: string | undefined;
    retryDecider?: (((response?: HttpResponse | undefined, error?: unknown, middlewareContext?: import("../../../../clients").MiddlewareContext) => Promise<import("../../../../clients").RetryDeciderOutput>) & ((response?: HttpResponse, error?: unknown) => Promise<import("../../../../clients").RetryDeciderOutput>)) | undefined;
    computeDelay?: ((attempt: number) => number) | undefined;
    cache?: "default" | "force-cache" | "no-cache" | "no-store" | "only-if-cached" | "reload" | undefined;
} & {
    [x: string]: unknown;
}, input: GetCredentialsForIdentityInput) => Promise<GetCredentialsForIdentityCommandOutput>;
