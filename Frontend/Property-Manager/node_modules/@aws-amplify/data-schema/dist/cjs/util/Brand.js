'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.brandSymbol = void 0;
exports.brand = brand;
exports.getBrand = getBrand;
exports.brandSymbol = Symbol('brand');
/**
 * Create an object of a specific type Brand
 * string branded type.
 *
 * @param brand: The string to Brand onto a simple object
 * @returns A branded empty object
 *
 * @example
 * brand('example') => {[brandSymbol]: 'example'}
 *
 * Which I might use like this:
 * const myType = {content: "default content", ...brand<'example'>}
 */
function brand(brand) {
    return {
        [exports.brandSymbol]: brand,
    };
}
/**
 *
 * @param branded: Branded object
 * @returns The string brand value
 */
function getBrand(branded) {
    return branded[exports.brandSymbol];
}
//# sourceMappingURL=Brand.js.map
