"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const reader_1 = require("./reader");
const printer_1 = require("./printer");
exports.symbolFunctionMapBuilder = (ns) => {
    const map = new Map();
    Object.keys(ns).forEach(key => map.set(types_1.MalSymbol.get(key), types_1.MalFunction.fromBootstrap(ns[key])));
    return map;
};
exports.ns = (() => {
    const ns = {
        "="(a, b) {
            return new types_1.MalBoolean(types_1.equals(a, b));
        },
        throw(v) {
            throw v;
        },
        "nil?"(v) {
            return new types_1.MalBoolean(v.type === 4);
        },
        "true?"(v) {
            return new types_1.MalBoolean(v.type === 5 && v.v);
        },
        "false?"(v) {
            return new types_1.MalBoolean(v.type === 5 && !v.v);
        },
        "string?"(v) {
            return new types_1.MalBoolean(v.type === 3);
        },
        symbol(v) {
            if (v.type !== 3) {
                throw new Error(`unexpected symbol: ${v.type}, expected: string`);
            }
            return types_1.MalSymbol.get(v.v);
        },
        "symbol?"(v) {
            return new types_1.MalBoolean(v.type === 6);
        },
        keyword(v) {
            if (v.type !== 3) {
                throw new Error(`unexpected symbol: ${v.type}, expected: string`);
            }
            return types_1.MalKeyword.get(v.v);
        },
        "keyword?"(v) {
            return new types_1.MalBoolean(v.type === 7);
        },
        "number?"(v) {
            return new types_1.MalBoolean(v.type === 2);
        },
        "fn?"(v) {
            return new types_1.MalBoolean(v.type === 10 && !v.isMacro);
        },
        "macro?"(v) {
            return new types_1.MalBoolean(v.type === 10 && v.isMacro);
        },
        "pr-str"(...args) {
            return new types_1.MalString(args.map(v => printer_1.prStr(v, true)).join(" "));
        },
        "str"(...args) {
            return new types_1.MalString(args.map(v => printer_1.prStr(v, false)).join(""));
        },
        prn(...args) {
            const str = args.map(v => printer_1.prStr(v, true)).join(" ");
            console.log(str);
            return types_1.MalNil.instance;
        },
        println(...args) {
            const str = args.map(v => printer_1.prStr(v, false)).join(" ");
            console.log(str);
            return types_1.MalNil.instance;
        },
        "read-string"(v) {
            if (v.type !== 3) {
                throw new Error(`unexpected symbol: ${v.type}, expected: string`);
            }
            return reader_1.readStr(v.v);
        },
        "<"(a, b) {
            if (a.type !== 2) {
                throw new Error(`unexpected symbol: ${a.type}, expected: number`);
            }
            if (b.type !== 2) {
                throw new Error(`unexpected symbol: ${b.type}, expected: number`);
            }
            return new types_1.MalBoolean(a.v < b.v);
        },
        "<="(a, b) {
            if (a.type !== 2) {
                throw new Error(`unexpected symbol: ${a.type}, expected: number`);
            }
            if (b.type !== 2) {
                throw new Error(`unexpected symbol: ${b.type}, expected: number`);
            }
            return new types_1.MalBoolean(a.v <= b.v);
        },
        ">"(a, b) {
            if (a.type !== 2) {
                throw new Error(`unexpected symbol: ${a.type}, expected: number`);
            }
            if (b.type !== 2) {
                throw new Error(`unexpected symbol: ${b.type}, expected: number`);
            }
            return new types_1.MalBoolean(a.v > b.v);
        },
        ">="(a, b) {
            if (a.type !== 2) {
                throw new Error(`unexpected symbol: ${a.type}, expected: number`);
            }
            if (b.type !== 2) {
                throw new Error(`unexpected symbol: ${b.type}, expected: number`);
            }
            return new types_1.MalBoolean(a.v >= b.v);
        },
        "+"(a, b) {
            if (a.type !== 2) {
                throw new Error(`unexpected symbol: ${a.type}, expected: number`);
            }
            if (b.type !== 2) {
                throw new Error(`unexpected symbol: ${b.type}, expected: number`);
            }
            return new types_1.MalNumber(a.v + b.v);
        },
        "-"(a, b) {
            if (a.type !== 2) {
                throw new Error(`unexpected symbol: ${a.type}, expected: number`);
            }
            if (b.type !== 2) {
                throw new Error(`unexpected symbol: ${b.type}, expected: number`);
            }
            return new types_1.MalNumber(a.v - b.v);
        },
        "*"(a, b) {
            if (a.type !== 2) {
                throw new Error(`unexpected symbol: ${a.type}, expected: number`);
            }
            if (b.type !== 2) {
                throw new Error(`unexpected symbol: ${b.type}, expected: number`);
            }
            return new types_1.MalNumber(a.v * b.v);
        },
        "/"(a, b) {
            if (a.type !== 2) {
                throw new Error(`unexpected symbol: ${a.type}, expected: number`);
            }
            if (b.type !== 2) {
                throw new Error(`unexpected symbol: ${b.type}, expected: number`);
            }
            return new types_1.MalNumber(a.v / b.v);
        },
        "time-ms"() {
            return new types_1.MalNumber(Date.now());
        },
        list(...args) {
            return new types_1.MalList(args);
        },
        "list?"(v) {
            return new types_1.MalBoolean(v.type === 1);
        },
        vector(...args) {
            return new types_1.MalVector(args);
        },
        "vector?"(v) {
            return new types_1.MalBoolean(v.type === 8);
        },
        "hash-map"(...args) {
            return new types_1.MalHashMap(args);
        },
        "map?"(v) {
            return new types_1.MalBoolean(v.type === 9);
        },
        assoc(v, ...args) {
            if (v.type !== 9) {
                throw new Error(`unexpected symbol: ${v.type}, expected: hash-map`);
            }
            return v.assoc(args);
        },
        dissoc(v, ...args) {
            if (v.type !== 9) {
                throw new Error(`unexpected symbol: ${v.type}, expected: hash-map`);
            }
            return v.dissoc(args);
        },
        get(v, key) {
            if (v.type === 4) {
                return types_1.MalNil.instance;
            }
            if (v.type !== 9) {
                throw new Error(`unexpected symbol: ${v.type}, expected: hash-map`);
            }
            if (key.type !== 3 && key.type !== 7) {
                throw new Error(`unexpected symbol: ${key.type}, expected: string or keyword`);
            }
            return v.get(key) || types_1.MalNil.instance;
        },
        "contains?"(v, key) {
            if (v.type === 4) {
                return types_1.MalNil.instance;
            }
            if (v.type !== 9) {
                throw new Error(`unexpected symbol: ${v.type}, expected: hash-map`);
            }
            if (key.type !== 3 && key.type !== 7) {
                throw new Error(`unexpected symbol: ${key.type}, expected: string or keyword`);
            }
            return new types_1.MalBoolean(v.has(key));
        },
        keys(v) {
            if (v.type !== 9) {
                throw new Error(`unexpected symbol: ${v.type}, expected: hash-map`);
            }
            return new types_1.MalList([...v.keys()]);
        },
        vals(v) {
            if (v.type !== 9) {
                throw new Error(`unexpected symbol: ${v.type}, expected: hash-map`);
            }
            return new types_1.MalList([...v.vals()]);
        },
        "sequential?"(v) {
            return new types_1.MalBoolean(types_1.isSeq(v));
        },
        cons(a, b) {
            if (!types_1.isSeq(b)) {
                throw new Error(`unexpected symbol: ${b.type}, expected: list or vector`);
            }
            return new types_1.MalList([a].concat(b.list));
        },
        concat(...args) {
            const list = args
                .map(arg => {
                if (!types_1.isSeq(arg)) {
                    throw new Error(`unexpected symbol: ${arg.type}, expected: list or vector`);
                }
                return arg;
            })
                .reduce((p, c) => p.concat(c.list), []);
            return new types_1.MalList(list);
        },
        nth(list, idx) {
            if (!types_1.isSeq(list)) {
                throw new Error(`unexpected symbol: ${list.type}, expected: list or vector`);
            }
            if (idx.type !== 2) {
                throw new Error(`unexpected symbol: ${idx.type}, expected: number`);
            }
            const v = list.list[idx.v];
            if (!v) {
                throw new Error("nth: index out of range");
            }
            return v;
        },
        first(v) {
            if (v.type === 4) {
                return types_1.MalNil.instance;
            }
            if (!types_1.isSeq(v)) {
                throw new Error(`unexpected symbol: ${v.type}, expected: list or vector`);
            }
            return v.list[0] || types_1.MalNil.instance;
        },
        rest(v) {
            if (v.type === 4) {
                return new types_1.MalList([]);
            }
            if (!types_1.isSeq(v)) {
                throw new Error(`unexpected symbol: ${v.type}, expected: list or vector`);
            }
            return new types_1.MalList(v.list.slice(1));
        },
        "empty?"(v) {
            if (!types_1.isSeq(v)) {
                return new types_1.MalBoolean(false);
            }
            return new types_1.MalBoolean(v.list.length === 0);
        },
        count(v) {
            if (types_1.isSeq(v)) {
                return new types_1.MalNumber(v.list.length);
            }
            if (v.type === 4) {
                return new types_1.MalNumber(0);
            }
            throw new Error(`unexpected symbol: ${v.type}`);
        },
        apply(f, ...list) {
            if (f.type !== 10) {
                throw new Error(`unexpected symbol: ${f.type}, expected: function`);
            }
            const tail = list[list.length - 1];
            if (!types_1.isSeq(tail)) {
                throw new Error(`unexpected symbol: ${tail.type}, expected: list or vector`);
            }
            const args = list.slice(0, -1).concat(tail.list);
            return f.func(...args);
        },
        map(f, list) {
            if (f.type !== 10) {
                throw new Error(`unexpected symbol: ${f.type}, expected: function`);
            }
            if (!types_1.isSeq(list)) {
                throw new Error(`unexpected symbol: ${list.type}, expected: list or vector`);
            }
            return new types_1.MalList(list.list.map(v => f.func(v)));
        },
        conj(list, ...args) {
            switch (list.type) {
                case 1:
                    const newList = new types_1.MalList(list.list);
                    args.forEach(arg => newList.list.unshift(arg));
                    return newList;
                case 8:
                    return new types_1.MalVector([...list.list, ...args]);
            }
            throw new Error(`unexpected symbol: ${list.type}, expected: list or vector`);
        },
        seq(v) {
            if (v.type === 1) {
                if (v.list.length === 0) {
                    return types_1.MalNil.instance;
                }
                return v;
            }
            if (v.type === 8) {
                if (v.list.length === 0) {
                    return types_1.MalNil.instance;
                }
                return new types_1.MalList(v.list);
            }
            if (v.type === 3) {
                if (v.v.length === 0) {
                    return types_1.MalNil.instance;
                }
                return new types_1.MalList(v.v.split("").map(s => new types_1.MalString(s)));
            }
            if (v.type === 4) {
                return types_1.MalNil.instance;
            }
            throw new Error(`unexpected symbol: ${v.type}, expected: list or vector or string`);
        },
        meta(v) {
            return v.meta || types_1.MalNil.instance;
        },
        "with-meta"(v, m) {
            return v.withMeta(m);
        },
        atom(v) {
            return new types_1.MalAtom(v);
        },
        "atom?"(v) {
            return new types_1.MalBoolean(v.type === 11);
        },
        deref(v) {
            if (v.type !== 11) {
                throw new Error(`unexpected symbol: ${v.type}, expected: atom`);
            }
            return v.v;
        },
        "reset!"(atom, v) {
            if (atom.type !== 11) {
                throw new Error(`unexpected symbol: ${atom.type}, expected: atom`);
            }
            atom.v = v;
            return v;
        },
        "swap!"(atom, f, ...args) {
            if (atom.type !== 11) {
                throw new Error(`unexpected symbol: ${atom.type}, expected: atom`);
            }
            if (f.type !== 10) {
                throw new Error(`unexpected symbol: ${f.type}, expected: function`);
            }
            atom.v = f.func(...[atom.v].concat(args));
            return atom.v;
        },
    };
    return exports.symbolFunctionMapBuilder(ns);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsic3JjL2NvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSxtQ0FBOEs7QUFDOUsscUNBQW1DO0FBQ25DLHVDQUFrQztBQUVyQixRQUFBLHdCQUF3QixHQUFHLENBQUMsRUFBNEQsRUFBK0IsRUFBRTtJQUNsSSxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBMEIsQ0FBQztJQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsbUJBQVcsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hHLE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQyxDQUFDO0FBRVcsUUFBQSxFQUFFLEdBQWdDLENBQUMsR0FBRyxFQUFFO0lBQ2pELE1BQU0sRUFBRSxHQUE2RDtRQUNqRSxHQUFHLENBQUMsQ0FBVSxFQUFFLENBQVU7WUFDdEIsT0FBTyxJQUFJLGtCQUFVLENBQUMsY0FBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFDRCxLQUFLLENBQUMsQ0FBVTtZQUNaLE1BQU0sQ0FBQyxDQUFDO1FBQ1osQ0FBQztRQUVELE1BQU0sQ0FBQyxDQUFVO1lBQ2IsT0FBTyxJQUFJLGtCQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBYSxDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUNELE9BQU8sQ0FBQyxDQUFVO1lBQ2QsT0FBTyxJQUFJLGtCQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBaUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUQsQ0FBQztRQUNELFFBQVEsQ0FBQyxDQUFVO1lBQ2YsT0FBTyxJQUFJLGtCQUFV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