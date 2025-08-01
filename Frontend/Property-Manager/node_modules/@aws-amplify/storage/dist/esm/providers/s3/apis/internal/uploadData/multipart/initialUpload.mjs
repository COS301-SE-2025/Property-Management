import '../../../../utils/client/s3data/base.mjs';
import '../../../../utils/client/s3data/getObject.mjs';
import '../../../../utils/client/s3data/listObjectsV2.mjs';
import '../../../../utils/client/s3data/putObject.mjs';
import { createMultipartUpload } from '../../../../utils/client/s3data/createMultipartUpload.mjs';
import '../../../../utils/client/s3data/uploadPart.mjs';
import '../../../../utils/client/s3data/completeMultipartUpload.mjs';
import '../../../../utils/client/s3data/listParts.mjs';
import '../../../../utils/client/s3data/abortMultipartUpload.mjs';
import '../../../../utils/client/s3data/copyObject.mjs';
import '../../../../utils/client/s3data/headObject.mjs';
import '../../../../utils/client/s3data/deleteObject.mjs';
import '../../../../../../errors/types/validation.mjs';
import '@aws-amplify/core/internals/utils';
import { logger } from '../../../../../../utils/logger.mjs';
import { constructContentDisposition } from '../../../../utils/constructContentDisposition.mjs';
import { CHECKSUM_ALGORITHM_CRC32 } from '../../../../utils/constants.mjs';
import { calculateContentCRC32 } from '../../../../utils/crc32.mjs';
import { getUploadsCacheKey, findCachedUploadPartsAndEvictExpired, cacheMultipartUpload } from './uploadCache.mjs';

// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
/**
 * Load the in-progress multipart upload from local storage or async storage(RN) if it exists, or create a new multipart
 * upload.
 *
 * @internal
 */
const loadOrCreateMultipartUpload = async ({ s3Config, data, size, contentType, bucket, accessLevel, keyPrefix, key, contentDisposition, contentEncoding, metadata, abortSignal, checksumAlgorithm, optionsHash, resumableUploadsCache, expectedBucketOwner, }) => {
    const finalKey = keyPrefix !== undefined ? keyPrefix + key : key;
    let cachedUpload;
    if (!resumableUploadsCache) {
        logger.debug('uploaded cache instance cannot be determined, skipping cache.');
        cachedUpload = undefined;
    }
    else {
        const uploadCacheKey = getUploadsCacheKey({
            size,
            contentType,
            file: data instanceof File ? data : undefined,
            bucket,
            accessLevel,
            key,
            optionsHash,
        });
        const cachedUploadParts = await findCachedUploadPartsAndEvictExpired({
            s3Config,
            cacheKey: uploadCacheKey,
            bucket,
            finalKey,
            resumableUploadsCache,
        });
        cachedUpload = cachedUploadParts
            ? { ...cachedUploadParts, uploadCacheKey }
            : undefined;
    }
    if (cachedUpload) {
        return {
            uploadId: cachedUpload.uploadId,
            cachedParts: cachedUpload.parts,
            finalCrc32: cachedUpload.finalCrc32,
        };
    }
    else {
        /**
         * Note: This step reads the uploading file from beginning to end to calculate the CRC32 checksum of the entire
         * object before sending the 1st byte over the wire. This is a performance bottleneck when uploading large files.
         * The rationale to do this is S3 team wants to reduce the possibility of a file getting corrupted(on disk or in
         * memory). So we calculate the full-object checksum as soon as possible in the upload flow.
         *
         * Going forward we should re-evaluate this decision with S3 team. The alternative is calling calculateContentCRC32()
         * as we upload each part sequentially with seeds from already uploaded parts, ideally inside the data chunker.
         */
        const finalCrc32 = checksumAlgorithm === CHECKSUM_ALGORITHM_CRC32
            ? await calculateContentCRC32(data)
            : undefined;
        const { UploadId } = await createMultipartUpload({
            ...s3Config,
            abortSignal,
        }, {
            Bucket: bucket,
            Key: finalKey,
            ContentType: contentType,
            ContentDisposition: constructContentDisposition(contentDisposition),
            ContentEncoding: contentEncoding,
            Metadata: metadata,
            ChecksumAlgorithm: finalCrc32 ? 'CRC32' : undefined,
            ChecksumType: finalCrc32 ? 'FULL_OBJECT' : undefined,
            ExpectedBucketOwner: expectedBucketOwner,
        });
        if (resumableUploadsCache) {
            const uploadCacheKey = getUploadsCacheKey({
                size,
                contentType,
                file: data instanceof File ? data : undefined,
                bucket,
                accessLevel,
                key,
                optionsHash,
            });
            await cacheMultipartUpload(resumableUploadsCache, uploadCacheKey, {
                uploadId: UploadId,
                bucket,
                key,
                finalCrc32,
                fileName: data instanceof File ? data.name : '',
            });
        }
        return {
            uploadId: UploadId,
            cachedParts: [],
            finalCrc32,
        };
    }
};

export { loadOrCreateMultipartUpload };
//# sourceMappingURL=initialUpload.mjs.map
