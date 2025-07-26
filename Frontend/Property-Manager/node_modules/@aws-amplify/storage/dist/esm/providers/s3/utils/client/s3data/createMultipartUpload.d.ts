import { Endpoint, HttpResponse } from '@aws-amplify/core/internals/aws-client-utils';
import type { CreateMultipartUploadCommandInput, CreateMultipartUploadCommandOutput } from './types';
import type { PutObjectInput } from './putObject';
export type CreateMultipartUploadInput = Extract<CreateMultipartUploadCommandInput, PutObjectInput> & Pick<CreateMultipartUploadCommandInput, 'ChecksumType'>;
export type CreateMultipartUploadOutput = Pick<CreateMultipartUploadCommandOutput, 'UploadId' | '$metadata'>;
export declare const createMultipartUpload: (config: {
    responseType?: "blob" | "text" | undefined;
    service?: string | undefined;
    endpointResolver?: (((options: import("@aws-amplify/core/internals/aws-client-utils").EndpointResolverOptions, input?: any) => Endpoint) & ((options: import("./base").S3EndpointResolverOptions, apiInput?: {
        Bucket?: string;
    }) => {
        url: URL;
    })) | undefined;
    retryDecider?: (((response?: HttpResponse | undefined, error?: unknown, middlewareContext?: import("@aws-amplify/core/internals/aws-client-utils").MiddlewareContext) => Promise<import("@aws-amplify/core/internals/aws-client-utils").RetryDeciderOutput>) & import("../utils/createRetryDecider").RetryDecider) | undefined;
    computeDelay?: ((attempt: number) => number) | undefined;
    userAgentValue?: string | undefined;
    useAccelerateEndpoint?: boolean | undefined;
    uriEscapePath?: boolean | undefined;
} & {
    credentials: import("@aws-amplify/core/internals/aws-client-utils").Credentials | ((options?: import("@aws-amplify/core/internals/aws-client-utils").CredentialsProviderOptions) => Promise<import("@aws-amplify/core/internals/aws-client-utils").Credentials>);
    region: string;
    onDownloadProgress?: ((event: import("../../../../..").TransferProgressEvent) => void) | undefined;
    onUploadProgress?: ((event: import("../../../../..").TransferProgressEvent) => void) | undefined;
    abortSignal?: AbortSignal | undefined;
    maxAttempts?: number | undefined;
    customEndpoint?: string | undefined;
    forcePathStyle?: boolean | undefined;
    userAgentHeader?: string | undefined;
}, input: CreateMultipartUploadInput) => Promise<CreateMultipartUploadOutput>;
