/**
 * The types of validations supported
 */
var ValidationType;
(function (ValidationType) {
    ValidationType["GT"] = "gt";
    ValidationType["LT"] = "lt";
    ValidationType["GTE"] = "gte";
    ValidationType["LTE"] = "lte";
    ValidationType["MIN_LENGTH"] = "minLength";
    ValidationType["MAX_LENGTH"] = "maxLength";
    ValidationType["STARTS_WITH"] = "startsWith";
    ValidationType["ENDS_WITH"] = "endsWith";
    ValidationType["MATCHES"] = "matches";
})(ValidationType || (ValidationType = {}));
/**
 * Creates an internal validation builder for a specific field type
 * @typeParam T - The type of the field being validated
 */
function createValidationBuilderInternal() {
    const rules = [];
    const builder = {
        /**
         * Validates that a numeric field is greater than the specified value
         * @param value - The value that the field must be greater than
         * @param errorMessage - Optional custom error message
         */
        gt(value, errorMessage) {
            rules.push({ type: ValidationType.GT, value, errorMessage });
            return this;
        },
        /**
         * Validates that a numeric field is less than the specified value
         * @param value - The value that the field must be less than
         * @param errorMessage - Optional custom error message
         */
        lt(value, errorMessage) {
            rules.push({ type: ValidationType.LT, value, errorMessage });
            return this;
        },
        /**
         * Validates that a numeric field is greater than or equal to the specified value
         * @param value - The value that the field must be greater than or equal to
         * @param errorMessage - Optional custom error message
         */
        gte(value, errorMessage) {
            rules.push({ type: ValidationType.GTE, value, errorMessage });
            return this;
        },
        /**
         * Validates that a numeric field is less than or equal to the specified value
         * @param value - The value that the field must be less than or equal to
         * @param errorMessage - Optional custom error message
         */
        lte(value, errorMessage) {
            rules.push({ type: ValidationType.LTE, value, errorMessage });
            return this;
        },
        /**
         * Validates that a numeric field is positive. We use gt(0) internally to achieve this.
         * @param errorMessage - Optional custom error message
         */
        positive(errorMessage) {
            rules.push({ type: ValidationType.GT, value: 0, errorMessage });
            return this;
        },
        /**
         * Validates that a numeric field is negative. We use lt(0) internally to achieve this.
         * @param errorMessage - Optional custom error message
         */
        negative(errorMessage) {
            rules.push({ type: ValidationType.LT, value: 0, errorMessage });
            return this;
        },
        /**
         * Validates that a string field has at least the specified length
         * @param length - The minimum length required
         * @param errorMessage - Optional custom error message
         */
        minLength(length, errorMessage) {
            rules.push({ type: ValidationType.MIN_LENGTH, value: length, errorMessage });
            return this;
        },
        /**
         * Validates that a string field does not exceed the specified length
         * @param length - The maximum length allowed
         * @param errorMessage - Optional custom error message
         */
        maxLength(length, errorMessage) {
            rules.push({ type: ValidationType.MAX_LENGTH, value: length, errorMessage });
            return this;
        },
        /**
         * Validates that a string field starts with the specified prefix
         * @param prefix - The prefix the string must start with
         * @param errorMessage - Optional custom error message
         */
        startsWith(prefix, errorMessage) {
            rules.push({ type: ValidationType.STARTS_WITH, value: prefix, errorMessage });
            return this;
        },
        /**
         * Validates that a string field ends with the specified suffix
         * @param suffix - The suffix the string must end with
         * @param errorMessage - Optional custom error message
         */
        endsWith(suffix, errorMessage) {
            rules.push({ type: ValidationType.ENDS_WITH, value: suffix, errorMessage });
            return this;
        },
        /**
         * Validates that a string field matches the specified regular expression pattern
         * @param pattern - The regex pattern the string must match
         * @param errorMessage - Optional custom error message
         */
        matches(pattern, errorMessage) {
            rules.push({ type: ValidationType.MATCHES, value: pattern, errorMessage });
            return this;
        },
        /**
         * Returns all the validation rules defined by this builder
         */
        getRules() {
            return rules;
        }
    };
    return builder;
}
/**
 * Creates a type-safe validation builder for a specific field type with access to get the rules
 * @returns An object containing the validation builder and a function to get the rules
 */
function createValidationBuilder() {
    const internalBuilder = createValidationBuilderInternal();
    return {
        builder: internalBuilder,
        getRules: () => internalBuilder.getRules()
    };
}

export { ValidationType, createValidationBuilder };
//# sourceMappingURL=Validate.mjs.map
