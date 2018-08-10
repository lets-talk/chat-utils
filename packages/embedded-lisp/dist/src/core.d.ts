import { MalType, MalSymbol, MalFunction } from "./types";
export declare const symbolFunctionMapBuilder: (ns: {
    [symbol: string]: (...args: MalType[]) => MalType;
}) => Map<MalSymbol, MalFunction>;
export declare const ns: Map<MalSymbol, MalFunction>;
