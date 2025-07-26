"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RULE_NAME = void 0;
const bundled_angular_compiler_1 = require("@angular-eslint/bundled-angular-compiler");
const utils_1 = require("@angular-eslint/utils");
const create_eslint_rule_1 = require("../utils/create-eslint-rule");
const literal_primitive_1 = require("../utils/literal-primitive");
const messageId = 'preferTemplateLiteral';
exports.RULE_NAME = 'prefer-template-literal';
exports.default = (0, create_eslint_rule_1.createESLintRule)({
    name: exports.RULE_NAME,
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Ensure that template literals are used instead of concatenating strings or expressions.',
        },
        fixable: 'code',
        schema: [],
        messages: {
            preferTemplateLiteral: 'Prefer using template literal instead of concatenating strings or expressions',
        },
    },
    defaultOptions: [],
    create(context) {
        (0, utils_1.ensureTemplateParser)(context);
        const { sourceCode } = context;
        return {
            'Binary[operation="+"]'(node) {
                const { left, right } = node;
                const isLeftString = (0, literal_primitive_1.isStringLiteralPrimitive)(left) || left instanceof bundled_angular_compiler_1.TemplateLiteral;
                const isRightString = (0, literal_primitive_1.isStringLiteralPrimitive)(right) || right instanceof bundled_angular_compiler_1.TemplateLiteral;
                // If both sides are not strings, we don't report anything
                if (!isLeftString && !isRightString) {
                    return;
                }
                const { sourceSpan: { start, end }, } = node;
                function getQuote() {
                    const leftValue = sourceCode.text.at(left.sourceSpan.start);
                    if (leftValue === "'" || leftValue === '"') {
                        return leftValue;
                    }
                    const rightValue = sourceCode.text.at(right.sourceSpan.start);
                    if (rightValue === "'" || rightValue === '"') {
                        return rightValue;
                    }
                    return '`';
                }
                context.report({
                    loc: {
                        start: sourceCode.getLocFromIndex(start),
                        end: sourceCode.getLocFromIndex(end),
                    },
                    messageId,
                    fix: (fixer) => {
                        // If both sides are literals, we remove the `+` sign, escape if necessary and concatenate them
                        if (left instanceof bundled_angular_compiler_1.LiteralPrimitive &&
                            right instanceof bundled_angular_compiler_1.LiteralPrimitive) {
                            const quote = getQuote();
                            return fixer.replaceTextRange([start, end], `${quote}${(0, literal_primitive_1.getLiteralPrimitiveStringValue)(left, quote)}${(0, literal_primitive_1.getLiteralPrimitiveStringValue)(right, quote)}${quote}`);
                        }
                        const fixes = new Array();
                        // Fix the left side
                        fixes.push(...getLeftSideFixes(fixer, left));
                        // Remove the `+` sign
                        fixes.push(fixer.removeRange([left.sourceSpan.end, right.sourceSpan.start]));
                        // Fix the right side
                        fixes.push(...getRightSideFixes(fixer, right));
                        return fixes;
                    },
                });
            },
        };
    },
});
function getLeftSideFixes(fixer, left) {
    const { start, end } = left.sourceSpan;
    if (left instanceof bundled_angular_compiler_1.TemplateLiteral) {
        // Remove the end ` sign from the left side
        return [fixer.removeRange([end - 1, end])];
    }
    else if ((0, literal_primitive_1.isLiteralPrimitive)(left)) {
        // Transform left side to template literal
        return [
            fixer.replaceTextRange([start, end], `\`${(0, literal_primitive_1.getLiteralPrimitiveStringValue)(left, '`')}`),
        ];
    }
    else {
        // Transform left side to template literal
        return [
            fixer.insertTextBeforeRange([start, end], '`${'),
            fixer.insertTextAfterRange([start, end], '}'),
        ];
    }
}
function getRightSideFixes(fixer, right) {
    const { start, end } = right.sourceSpan;
    if (right instanceof bundled_angular_compiler_1.TemplateLiteral) {
        // Remove the start ` sign from the right side
        return [fixer.removeRange([start, start + 1])];
    }
    else if ((0, literal_primitive_1.isLiteralPrimitive)(right)) {
        // Transform right side to template literal if it's a string
        return [
            fixer.replaceTextRange([start, end], `${(0, literal_primitive_1.getLiteralPrimitiveStringValue)(right, '`')}\``),
        ];
    }
    else {
        // Transform right side to template literal
        return [
            fixer.insertTextBeforeRange([start, end], '${'),
            fixer.insertTextAfterRange([start, end], '}`'),
        ];
    }
}
