import { MalType, MalSymbol } from "./types";
export declare class Env {
    outer?: Env | undefined;
    data: Map<MalSymbol, MalType>;
    constructor(outer?: Env | undefined, binds?: MalSymbol[], exprts?: MalType[]);
    set(key: MalSymbol, value: MalType): MalType;
    find(key: MalSymbol): Env | undefined;
    get(key: MalSymbol): MalType;
}
