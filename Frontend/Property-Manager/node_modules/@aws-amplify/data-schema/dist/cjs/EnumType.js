'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.enumType = enumType;
function _enum(values) {
    const data = {
        type: 'enum',
        values,
    };
    return data;
}
/**
 * this type param pattern allows us to infer literal type values from the array without using the `as const` suffix
 */
function enumType(values) {
    return _enum(values);
}
//# sourceMappingURL=EnumType.js.map
