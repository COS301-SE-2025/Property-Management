import { Endpoint, Headers, HttpRequest } from '../../../../../clients';
export declare const createClientSerializer: <Input>(operation: string) => (input: Input, endpoint: Endpoint) => HttpRequest;
export declare const buildHttpRpcRequest: ({ url }: Endpoint, headers: Headers, body: any) => HttpRequest;
