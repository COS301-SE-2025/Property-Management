import { EndpointResolverOptions } from '../../../../../clients';
export interface ServiceClientFactoryInput {
    endpointResolver(options: EndpointResolverOptions): {
        url: URL;
    };
}
