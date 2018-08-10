"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
class Reader {
    constructor(tokens) {
        this.tokens = tokens;
        this.position = 0;
    }
    next() {
        const ret = this.peek();
        this.position += 1;
        return ret;
    }
    peek() {
        return this.tokens[this.position];
    }
}
function readStr(input) {
    const tokens = tokenizer(input);
    const reader = new Reader(tokens);
    return readForm(reader);
}
exports.readStr = readStr;
function tokenizer(input) {
    const regexp = /[\s,]*(~@|[\[\]{}()'`~^@]|"(?:\\.|[^\\"])*"|;.*|[^\s\[\]{}('"`,;)]*)/g;
    const tokens = [];
    while (true) {
        const matches = regexp.exec(input);
        if (!matches) {
            break;
        }
        const match = matches[1];
        if (match === "") {
            break;
        }
        if (match[0] !== ";") {
            tokens.push(match);
        }
    }
    return tokens;
}
function readForm(reader) {
    const token = reader.peek();
    switch (token) {
        case "(":
            return readList(reader);
        case "[":
            return readVector(reader);
        case "{":
            return readHashMap(reader);
        case "'":
            return readSymbol("quote");
        case "`":
            return readSymbol("quasiquote");
        case "~":
            return readSymbol("unquote");
        case "~@":
            return readSymbol("splice-unquote");
        case "@":
            return readSymbol("deref");
        case "^":
            {
                reader.next();
                const sym = types_1.MalSymbol.get("with-meta");
                const target = readForm(reader);
                return new types_1.MalList([sym, readForm(reader), target]);
            }
        default:
            return readAtom(reader);
    }
    function readSymbol(name) {
        reader.next();
        const sym = types_1.MalSymbol.get(name);
        const target = readForm(reader);
        return new types_1.MalList([sym, target]);
    }
}
function readList(reader) {
    return readParen(reader, types_1.MalList, "(", ")");
}
function readVector(reader) {
    return readParen(reader, types_1.MalVector, "[", "]");
}
function readHashMap(reader) {
    return readParen(reader, types_1.MalHashMap, "{", "}");
}
function readParen(reader, ctor, open, close) {
    const token = reader.next();
    if (token !== open) {
        throw new Error(`unexpected token ${token}, expected ${open}`);
    }
    const list = [];
    while (true) {
        const next = reader.peek();
        if (next === close) {
            break;
        }
        else if (!next) {
            throw new Error("unexpected EOF");
        }
        list.push(readForm(reader));
    }
    reader.next();
    return new ctor(list);
}
function readAtom(reader) {
    const token = reader.next();
    if (token.match(/^-?[0-9]+$/)) {
        const v = parseInt(token, 10);
        return new types_1.MalNumber(v);
    }
    if (token.match(/^-?[0-9]\.[0-9]+$/)) {
        const v = parseFloat(token);
        return new types_1.MalNumber(v);
    }
    if (token[0] === '"') {
        const v = token.slice(1, token.length - 1)
            .replace(/\\(.)/g, (_, c) => c == 'n' ? '\n' : c);
        return new types_1.MalString(v);
    }
    if (token[0] === ":") {
        return types_1.MalKeyword.get(token.substr(1));
    }
    switch (token) {
        case "nil":
            return types_1.MalNil.instance;
        case "true":
            return new types_1.MalBoolean(true);
        case "false":
            return new types_1.MalBoolean(false);
    }
    return types_1.MalSymbol.get(token);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZGVyLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJzcmMvcmVhZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQW1JO0FBRW5JLE1BQU0sTUFBTTtJQUdSLFlBQW9CLE1BQWdCO1FBQWhCLFdBQU0sR0FBTixNQUFNLENBQVU7UUFGcEMsYUFBUSxHQUFHLENBQUMsQ0FBQztJQUUyQixDQUFDO0lBRXpDLElBQUk7UUFDQSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUM7UUFDbkIsT0FBTyxHQUFHLENBQUM7SUFDZixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEMsQ0FBQztDQUNKO0FBRUQsU0FBZ0IsT0FBTyxDQUFDLEtBQWE7SUFDakMsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFKRCwwQkFJQztBQUVELFNBQVMsU0FBUyxDQUFDLEtBQWE7SUFDNUIsTUFBTSxNQUFNLEdBQUcsdUVBQXVFLENBQUM7SUFDdkYsTUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDO0lBQzVCLE9BQU8sSUFBSSxFQUFFO1FBQ1QsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1YsTUFBTTtTQUNUO1FBQ0QsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUNkLE1BQU07U0FDVDtRQUNELElB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