export { DataStore, DataStoreClass, initSchema, ModelInstanceCreator, AsyncCollection, AsyncItem, } from './datastore/datastore';
export { Predicates, ModelPredicateCreator, ModelSortPredicateCreator, } from './predicates';
export { Adapter as StorageAdapter } from './storage/adapter';
export { NAMESPACES } from './util';
export declare const utils: {
    USER: import("./util").NAMESPACES;
    traverseModel: <T extends import("./types").PersistentModel>(srcModelName: string, instance: T, namespace: import("./types").SchemaNamespace, modelInstanceCreator: import("./datastore/datastore").ModelInstanceCreator, getModelConstructorByModelName: (namsespaceName: import("./util").NAMESPACES, modelName: string) => import("./types").PersistentModelConstructor<any>) => {
        modelName: string;
        item: T;
        instance: T;
    }[];
    validatePredicate: <T extends import("./types").PersistentModel>(model: T, groupType: keyof import("./types").PredicateGroups<T>, predicatesOrGroups: (import("./types").PredicateObject<T> | import("./types").PredicatesGroup<T>)[]) => any;
    isNonModelConstructor: (obj: any) => obj is import("./types").NonModelTypeConstructor<any>;
    isModelConstructor: <T extends import("./types").PersistentModel>(obj: any) => obj is import("./types").PersistentModelConstructor<T>;
};
export * from './types';
