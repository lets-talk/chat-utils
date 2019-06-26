import 'es6-map/implement';

export {
    Node,
    MalType,
    MalSymbol,
    MalFunction,
    MalNil,
    MalList,
    MalVector,
    MalBoolean,
    MalNumber,
    MalString,
    MalKeyword,
    MalHashMap,
    MalAtom,
    equals,
    isSeq
} from './src/types';

export {
    extractBoolean,
    extractHashMap,
    extractKeyword,
    extractList,
    extractNil,
    extractNumber,
    extractString,
    extractSymbol,
    extractVector
} from './src/extractors';

export {
    makeEval
} from './src/mal';
