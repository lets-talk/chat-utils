import { Env } from "./env";
export declare type MalType = MalList | MalNumber | MalString | MalNil | MalBoolean | MalSymbol | MalKeyword | MalVector | MalHashMap | MalFunction | MalAtom;
export declare const enum Node {
    List = 1,
    Number = 2,
    String = 3,
    Nil = 4,
    Boolean = 5,
    Symbol = 6,
    Keyword = 7,
    Vector = 8,
    HashMap = 9,
    Function = 10,
    Atom = 11
}
export declare function equals(a: MalType, b: MalType, strict?: boolean): boolean;
export declare function isSeq(ast: MalType): ast is MalList | MalVector;
export declare function isAST(v: MalType): v is MalType;
export declare class MalList {
    list: MalType[];
    type: Node.List;
    meta?: MalType;
    constructor(list: MalType[]);
    withMeta(meta: MalType): MalList;
}
export declare class MalNumber {
    v: number;
    type: Node.Number;
    meta?: MalType;
    constructor(v: number);
    withMeta(meta: MalType): MalNumber;
}
export declare class MalString {
    v: string;
    type: Node.String;
    meta?: MalType;
    constructor(v: string);
    withMeta(meta: MalType): MalString;
}
export declare class MalNil {
    private static _instance?;
    static readonly instance: MalNil;
    type: Node.Nil;
    meta?: MalType;
    private constructor();
    withMeta(_meta: MalType): MalNil;
}
export declare class MalBoolean {
    v: boolean;
    type: Node.Boolean;
    meta?: MalType;
    constructor(v: boolean);
    withMeta(meta: MalType): MalBoolean;
}
export declare class MalSymbol {
    v: string;
    static map: Map<symbol, MalSymbol>;
    static get(name: string): MalSymbol;
    type: Node.Symbol;
    meta?: MalType;
    private constructor();
    withMeta(_meta: MalType): MalSymbol;
}
export declare class MalKeyword {
    v: string;
    static map: Map<symbol, MalKeyword>;
    static get(name: string): MalKeyword;
    type: Node.Keyword;
    meta?: MalType;
    private constructor();
    withMeta(_meta: MalType): MalKeyword;
}
export declare class MalVector {
    list: MalType[];
    type: Node.Vector;
    meta?: MalType;
    constructor(list: MalType[]);
    withMeta(meta: MalType): MalVector;
}
export declare class MalHashMap {
    type: Node.HashMap;
    stringMap: {
        [key: string]: MalType;
    };
    keywordMap: Map<MalType, MalType>;
    meta?: MalType;
    constructor(list: MalType[]);
    withMeta(meta: MalType): MalHashMap;
    has(key: MalKeyword | MalString): boolean;
    get(key: MalKeyword | MalString): MalType;
    entries(): [MalType, MalType][];
    keys(): MalType[];
    vals(): MalType[];
    assoc(args: MalType[]): MalHashMap;
    dissoc(args: MalType[]): MalHashMap;
}
declare type MalF = (...args: MalType[]) => MalType;
export declare class MalFunction {
    static fromLisp(evalMal: (ast: MalType, env: Env) => MalType, env: Env, params: MalSymbol[], bodyAst: MalType): MalFunction;
    static fromBootstrap(func: MalF): MalFunction;
    type: Node.Function;
    func: MalF;
    ast: MalType;
    env: Env;
    params: MalSymbol[];
    isMacro: boolean;
    meta?: MalType;
    private constructor();
    withMeta(meta: MalType): MalFunction;
    newEnv(args: MalType[]): Env;
}
export declare class MalAtom {
    v: MalType;
    type: Node.Atom;
    meta?: MalType;
    constructor(v: MalType);
    withMeta(meta: MalType): MalAtom;
}
export {};
