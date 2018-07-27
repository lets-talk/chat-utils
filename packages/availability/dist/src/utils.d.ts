export declare const firstFromArray: <T>(array: T[]) => T | null;
export declare const lastFromArray: <T>(array: T[]) => T | null;
export declare const poorMansFlatmap: <T, U>(a: T[], f: (t: T) => U[]) => U[];
