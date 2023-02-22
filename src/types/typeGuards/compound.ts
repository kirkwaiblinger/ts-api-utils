import * as ts from "typescript";

import { isTypeFlagSet } from "../../flags.js";
import { isTupleType, isTypeReference } from "./objects.js";

/**
 * `LiteralType` from typescript except that it allows for it to work on arbitrary types.
 *
 * @category Type Types
 */
export interface UnknownLiteralType extends ts.Type {
	freshType: UnknownLiteralType;
	regularType: UnknownLiteralType;
	value: unknown;
}

/**
 * A boolean literal.
 *
 * @category Type Types
 */
export interface BooleanLiteralType extends UnknownLiteralType {
	value: boolean;
}

/**
 * A "true" literal.
 *
 * @category Type Types
 */

export interface TrueLiteralType extends BooleanLiteralType {
	value: true;
}

/**
 * A "false" literal.
 *
 * @category Type Types
 */
export interface FalseLiteralType extends BooleanLiteralType {
	value: false;
}

/**
 * Test if a type is a {@link UnknownLiteralType}?
 *
 * @param type
 * @returns
 */
export function isUnknownLiteralType(
	type: ts.Type
): type is UnknownLiteralType {
	return isTypeFlagSet(type, ts.TypeFlags.Literal);
}

/**
 * Determines whether the given type is a boolean literal type.
 *
 * @category Types - Utilities
 */
export function isBooleanLiteralType(
	type: ts.Type
): type is BooleanLiteralType {
	return isTypeFlagSet(type, ts.TypeFlags.BooleanLiteral);
}

/**
 * Determines whether the given type is a boolean literal type for "true".
 *
 * @category Types - Utilities
 */
export function isTrueLiteralType(type: ts.Type): type is TrueLiteralType {
	return (
		isBooleanLiteralType(type) &&
		(type as unknown as { intrinsicName: string }).intrinsicName === "true"
	);
}

/**
 * Determines whether the given type is a boolean literal type for "false".
 *
 * @category Types - Utilities
 */
export function isFalseLiteralType(type: ts.Type): type is FalseLiteralType {
	return (
		isBooleanLiteralType(type) &&
		(type as unknown as { intrinsicName: string }).intrinsicName === "false"
	);
}

/**
 * Test if a type is a `TupleTypeReference`.
 *
 * @category Types - Type Guards
 */
export function isTupleTypeReference(
	type: ts.Type
): type is ts.TupleTypeReference {
	return isTypeReference(type) && isTupleType(type.target);
}
