import { MalFunction } from "./types";
export declare function makeEval(extra: {
    [name: string]: typeof MalFunction.prototype.func;
}): (str: string) => string;
