import {Factory} from "../models";
import {getColumn} from "../decorators";

/**
 * Convert a query result to an object.
 * @param sourceClass The class with MySQL decorations for mappping.
 * @param results The query results received from the MySQL query.
 * @returns A generated object from the sourceClass value.
 */
export function queryResultToObject<T = any>(classObject: any, results: any[]) {
    if ((results ?? []).length <= 0) {
        return [] as T[];
    }

    const factory = new Factory();
    const targetClass = factory.create(classObject);
    const classProperties = Object.getOwnPropertyNames(targetClass);
    const result: any[] = [];

    (results ?? []).forEach((r) => {
        const resultObject = factory.create(classObject) as any;
        classProperties.forEach((p) => {
            const column = getColumn(classObject, p);
            if (column) {
                resultObject[p] = r[column];
            }
        });
        result.push(resultObject);
    });
    return (result as T[]);
}