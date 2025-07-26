/**
 * Calculate the CRC32 checksum for given content and return base64 encoded checksum.
 */
export declare const calculateContentCRC32: (content: Blob | string | ArrayBuffer | ArrayBufferView, seed?: number) => Promise<string>;
