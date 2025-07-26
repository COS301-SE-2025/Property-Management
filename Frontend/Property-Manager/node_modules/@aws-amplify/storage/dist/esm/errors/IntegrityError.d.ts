import { AmplifyErrorParams } from '@aws-amplify/core/internals/utils';
import { StorageError } from './StorageError';
export declare class IntegrityError extends StorageError {
    constructor(params?: Pick<AmplifyErrorParams, 'metadata'>);
}
