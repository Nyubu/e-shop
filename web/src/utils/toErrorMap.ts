import { FieldError } from "../generated/graphql";

export const toErrorMap = (errors: FieldError[]) => {
    const errorMap: Record<string, string> = {};

    // Mapping errors using key-value (field - message)
    errors.forEach( ({field, message}) => {
        errorMap[field] = message;
    });

    return errorMap;
}