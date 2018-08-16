import { Node, MalType } from "./types";

export const extractList = (s: MalType): MalType[] => {
    if (s.type !== Node.List) {
      throw new Error(`unexpected symbol: ${s.type}, expected: list`);
    }
    return s.list;
  };

export const extractNumber = (s: MalType): number => {
    if (s.type !== Node.Number) {
      throw new Error(`unexpected symbol: ${s.type}, expected: number`);
    }
    return s.v;
  };

export const extractString = (s: MalType): string => {
    if (s.type !== Node.String) {
      throw new Error(`unexpected symbol: ${s.type}, expected: string`);
    }
    return s.v;
  };

export const extractNil = (s: MalType): null => {
    if (s.type !== Node.Nil) {
      throw new Error(`unexpected symbol: ${s.type}, expected: nil`);
    }
    return null;
  };

export const extractBoolean = (s: MalType): boolean => {
    if (s.type !== Node.Boolean) {
      throw new Error(`unexpected symbol: ${s.type}, expected: boolean`);
    }
    return s.v;
  };

export const extractSymbol = (s: MalType): string => {
    if (s.type !== Node.Symbol) {
      throw new Error(`unexpected symbol: ${s.type}, expected: symbol`);
    }
    return s.v;
  };

export const extractKeyword = (s: MalType): string => {
    if (s.type !== Node.Keyword) {
      throw new Error(`unexpected symbol: ${s.type}, expected: keyword`);
    }
    return s.v;
  };

export const extractVector = (s: MalType): MalType[] => {
    if (s.type !== Node.Vector) {
      throw new Error(`unexpected symbol: ${s.type}, expected: vector`);
    }
    return s.list;
  };

export const extractHashMap = (s: MalType): [MalType, MalType][] => {
    if (s.type !== Node.HashMap) {
      throw new Error(`unexpected symbol: ${s.type}, expected: hashMap`);
    }
    return s.entries();
  };
