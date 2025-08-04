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
                const parentIsTemplateLiteral = 'parent' in node && node.parent instanceof bundled_angular_compiler_1.TemplateLiteral;
                function getQuote() {
                    if (parentIsTemplateLiteral) {
                        return '';
                    }
                    if (left instanceof bundled_angular_compiler_1.LiteralPrimitive &&
                        right instanceof bundled_angular_compiler_1.LiteralPrimitive) {
                        const leftValue = sourceCode.text.at(left.sourceSpan.start);
                        if (leftValue === "'" || leftValue === '"') {
                            return leftValue;
                        }
                        const rightValue = sourceCode.text.at(right.sourceSpan.start);
                        if (rightValue === "'" || rightValue === '"') {
                            return rightValue;
                        }
                    }
                    return '`';
                }
                function getLeftSideFixes(fixer, quote) {
                    const { start, end } = left.sourceSpan;
                    if (left instanceof bundled_angular_compiler_1.TemplateLiteral) {
                        // Remove the end ` sign from the left side
                        return [
                            fixer.replaceTextRange([start, start + 1], quote),
                            fixer.removeRange([end - 1, end]),
                        ];
                    }
                    if ((0, literal_primitive_1.isLiteralPrimitive)(left)) {
                        // Transform left side to template literal
                        return [
                            fixer.replaceTextRange([start, end], parentIsTemplateLiteral
                                ? `${(0, literal_primitive_1.getLiteralPrimitiveStringValue)(left, '`')}`
                                : `${quote}${(0, literal_primitive_1.getLiteralPrimitiveStringValue)(left, quote)}`),
                        ];
                    }
                    // Transform left side to template literal
                    return [
                        fixer.insertTextBeforeRange([start, end], `${quote}\${`),
                        fixer.insertTextAfterRange([start, end], '}'),
                    ];
                }
                function getRightSideFixes(fixer, quote) {
                    const { start, end } = right.sourceSpan;
                    if (right instanceof bundled_angular_compiler_1.TemplateLiteral) {
                        // Remove the start ` sign from the right side
                        return [
                            fixer.removeRange([start, start + 1]),
                            fixer.replaceTextRange([end - 1, end], quote),
                        ];
                    }
                    if ((0, literal_primitive_1.isLiteralPrimitive)(right)) {
                        // Transform right side to template literal if it's a string
                        return [
                            fixer.replaceTextRange([start, end], parentIsTemplateLiteral
                                ? `${(0, literal_primitive_1.getLiteralPrimitiveStringValue)(right, '`')}`
                                : `${(0, literal_primitive_1.getLiteralPrimitiveStringValue)(right, quote)}${quote}`),
                        ];
                    }
                    // Transform right side to template literal
                    return [
                        fixer.insertTextBeforeRange([start, end], '${'),
                        fixer.insertTextAfterRange([start, end], `}${quote}`),
                    ];
                }
                function hasParentheses(node) {
                    const { start, end } = node.sourceSpan;
                    const text = sourceCode.text.slice(start - 1, end + 1);
                    return text.startsWith('(') && text.endsWith(')');
                }
                context.report({
                    loc: {
                        start: sourceCode.getLocFromIndex(start),
                        end: sourceCode.getLocFromIndex(end),
                    },
                    messageId,
                    fix: (fixer) => {
                        const quote = getQuote();
                        const fixes = Array();
                        // If the parent is a template literal, remove the `${` sign
                        if (parentIsTemplateLiteral) {
                            const templateInterpolationStartIndex = sourceCode.text.lastIndexOf('${', node.sourceSpan.start);
                            fixes.push(fixer.removeRange([
                                templateInterpolationStartIndex,
                                node.sourceSpan.start,
                            ]));
                        }
                        // If both sides are literals, we remove the `+` sign, escape if necessary and concatenate them
                        if (left instanceof bundled_angular_compiler_1.LiteralPrimitive &&
                            right instanceof bundled_angular_compiler_1.LiteralPrimitive) {
                            fixes.push(fixer.replaceTextRange([start, end], parentIsTemplateLiteral
                                ? `${(0, literal_primitive_1.getLiteralPrimitiveStringValue)(left, '`')}${(0, literal_primitive_1.getLiteralPrimitiveStringValue)(right, '`')}`
                                : `${quote}${(0, literal_primitive_1.getLiteralPrimitiveStringValue)(left, quote)}${(0, literal_primitive_1.getLiteralPrimitiveStringValue)(right, quote)}${quote}`));
                        }
                        else {
                            const leftHasParentheses = hasParentheses(left);
                            const rightHasParentheses = hasParentheses(right);
                            // Remove the left first parenthesis if it exists
                            if (leftHasParentheses) {
                                fixes.push(fixer.removeRange([
                                    left.sourceSpan.start - 1,
                                    left.sourceSpan.start,
                                ]));
                            }
                            // Fix the left side
                            fixes.push(...getLeftSideFixes(fixer, quote));
                            // Remove the left last parenthesis if it exists
                            if (leftHasParentheses) {
                                fixes.push(fixer.removeRange([
                                    left.sourceSpan.end,
                                    left.sourceSpan.end + 1,
                                ]));
                            }
                            // Remove the `+` sign
                            fixes.push(fixer.removeRange([
                                leftHasParentheses
                                    ? left.sourceSpan.end + 1
                                    : left.sourceSpan.end,
                                rightHasParentheses
                                    ? right.sourceSpan.start - 1
                                    : right.sourceSpan.start,
                            ]));
                            // Remove the right first parenthesis if it exists
                            if (rightHasParentheses) {
                                fixes.push(fixer.removeRange([
                                    right.sourceSpan.start - 1,
                                    right.sourceSpan.start,
                                ]));
                            }
                            // Fix the right side
                            fixes.push(...getRightSideFixes(fixer, quote));
                            // Remove the right last parenthesis if it exists
                            if (rightHasParentheses) {
                                fixes.push(fixer.removeRange([
                                    right.sourceSpan.end,
                                    right.sourceSpan.end + 1,
                                ]));
                            }
                        }
                        // If the parent is a template literal, remove the `}` sign
                        if (parentIsTemplateLiteral) {
                            const templateInterpolationEndIndex = sourceCode.text.indexOf('}', node.sourceSpan.end);
                            fixes.push(fixer.removeRange([
                                node.sourceSpan.end,
                                templateInterpolationEndIndex + 1,
                            ]));
                        }
                        return fixes;
                    },
                });
            },
        };
    },
});
