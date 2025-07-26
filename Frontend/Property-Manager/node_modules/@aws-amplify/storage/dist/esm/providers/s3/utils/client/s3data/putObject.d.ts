import { Endpoint, HttpResponse } from '@aws-amplify/core/internals/aws-client-utils';
import type { PutObjectCommandInput, PutObjectCommandOutput } from './types';
export type PutObjectInput = Pick<PutObjectCommandInput, 'Bucket' | 'Key' | 'Body' | 'ACL' | 'CacheControl' | 'ContentDisposition' | 'ContentEncoding' | 'ContentType' | 'ContentMD5' | 'Expires' | 'Metadata' | 'Tagging' | 'ChecksumCRC32' | 'ExpectedBucketOwner' | 'IfNoneMatch'>;
export type PutObjectOutput = Pick<PutObjectCommandOutput, '$metadata' | 'ETag' | 'VersionId'>;
export declare const putObject: (config: {
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
}, input: PutObjectInput) => Promise<PutObjectOutput>;
