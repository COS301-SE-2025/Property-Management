import { AmplifyClassV6 } from '@aws-amplify/core';
/**
 * @internal
 */
export declare const resolveLibraryOptions: (amplify: AmplifyClassV6) => {
    headers: ((options?: {
        query?: string;
        variables?: Record<string, import("@aws-amplify/core/internals/utils").DocumentType>;
    }) => Promise<import("@aws-amplify/core/internals/aws-client-utils").Headers | Record<string, unknown>>) | undefined;
    withCredentials: boolean | undefined;
};
