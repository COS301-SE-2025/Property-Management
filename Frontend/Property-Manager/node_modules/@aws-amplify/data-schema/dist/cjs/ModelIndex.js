'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.modelIndex = modelIndex;
const util_1 = require("./util");
const brandName = 'modelIndexType';
function _modelIndex(partitionKeyFieldName) {
    const data = {
        partitionKey: partitionKeyFieldName,
        sortKeys: [],
        indexName: '',
        queryField: '',
    };
    const builder = {
        sortKeys(sortKeys) {
            data.sortKeys = sortKeys;
            return this;
        },
        name(name) {
            data.indexName = name;
            return this;
        },
        queryField(field) {
            data.queryField = field;
            return this;
        },
        ...(0, util_1.brand)(brandName),
    };
    return { ...builder, data };
}
function modelIndex(partitionKeyFieldName) {
    return _modelIndex(partitionKeyFieldName);
}
//# sourceMappingURL=ModelIndex.js.map
