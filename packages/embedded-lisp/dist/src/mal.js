"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const env_1 = require("./env");
const core = require("./core");
const reader_1 = require("./reader");
const printer_1 = require("./printer");
function read(str) {
    return reader_1.readStr(str);
}
function quasiquote(ast) {
    if (!isPair(ast)) {
        return new types_1.MalList([types_1.MalSymbol.get("quote"), ast]);
    }
    if (!types_1.isSeq(ast)) {
        throw new Error(`unexpected token type: ${ast.type}, expected: list or vector`);
    }
    const [arg1, arg2] = ast.list;
    if (arg1.type === 6 && arg1.v === "unquote") {
        return arg2;
    }
    if (isPair(arg1)) {
        if (!types_1.isSeq(arg1)) {
            throw new Error(`unexpected token type: ${arg1.type}, expected: list or vector`);
        }
        const [arg11, arg12] = arg1.list;
        if (arg11.type === 6 && arg11.v === "splice-unquote") {
            return new types_1.MalList([
                types_1.MalSymbol.get("concat"),
                arg12,
                quasiquote(new types_1.MalList(ast.list.slice(1))),
            ]);
        }
    }
    return new types_1.MalList([
        types_1.MalSymbol.get("cons"),
        quasiquote(arg1),
        quasiquote(new types_1.MalList(ast.list.slice(1))),
    ]);
    function isPair(ast) {
        if (!types_1.isSeq(ast)) {
            return false;
        }
        return 0 < ast.list.length;
    }
}
function isMacro(ast, env) {
    if (!types_1.isSeq(ast)) {
        return false;
    }
    const s = ast.list[0];
    if (s.type !== 6) {
        return false;
    }
    const foundEnv = env.find(s);
    if (!foundEnv) {
        return false;
    }
    const f = foundEnv.get(s);
    if (f.type !== 10) {
        return false;
    }
    return f.isMacro;
}
function macroexpand(ast, env) {
    while (isMacro(ast, env)) {
        if (!types_1.isSeq(ast)) {
            throw new Error(`unexpected token type: ${ast.type}, expected: list or vector`);
        }
        const s = ast.list[0];
        if (s.type !== 6) {
            throw new Error(`unexpected token type: ${s.type}, expected: symbol`);
        }
        const f = env.get(s);
        if (f.type !== 10) {
            throw new Error(`unexpected token type: ${f.type}, expected: function`);
        }
        ast = f.func(...ast.list.slice(1));
    }
    return ast;
}
function evalAST(ast, env) {
    switch (ast.type) {
        case 6:
            const f = env.get(ast);
            if (!f) {
                throw new Error(`unknown symbol: ${ast.v}`);
            }
            return f;
        case 1:
            return new types_1.MalList(ast.list.map(ast => evalMal(ast, env)));
        case 8:
            return new types_1.MalVector(ast.list.map(ast => evalMal(ast, env)));
        case 9:
            const list = [];
            for (const [key, value] of ast.entries()) {
                list.push(key);
                list.push(evalMal(value, env));
            }
            return new types_1.MalHashMap(list);
        default:
            return ast;
    }
}
function evalMal(ast, env) {
    loop: while (true) {
        if (ast.type !== 1) {
            return evalAST(ast, env);
        }
        ast = macroexpand(ast, env);
        if (!types_1.isSeq(ast)) {
            return evalAST(ast, env);
        }
        if (ast.list.length === 0) {
            return ast;
        }
        const first = ast.list[0];
        switch (first.type) {
            case 6:
                switch (first.v) {
                    case "def!": {
                        const [, key, value] = ast.list;
                        if (key.type !== 6) {
                            throw new Error(`unexpected token type: ${key.type}, expected: symbol`);
                        }
                        if (!value) {
                            throw new Error(`unexpected syntax`);
                        }
                        return env.set(key, evalMal(value, env));
                    }
                    case "let*": {
                        env = new env_1.Env(env);
                        const pairs = ast.list[1];
                        if (!types_1.isSeq(pairs)) {
                            throw new Error(`unexpected token type: ${pairs.type}, expected: list or vector`);
                        }
                        for (let i = 0; i < pairs.list.length; i += 2) {
                            const key = pairs.list[i];
                            const value = pairs.list[i + 1];
                            if (key.type !== 6) {
                                throw new Error(`unexpected token type: ${key.type}, expected: symbol`);
                            }
                            if (!key || !value) {
                                throw new Error(`unexpected syntax`);
                            }
                            env.set(key, evalMal(value, env));
                        }
                        ast = ast.list[2];
                        continue loop;
                    }
                    case "quote": {
                        return ast.list[1];
                    }
                    case "quasiquote": {
                        ast = quasiquote(ast.list[1]);
                        continue loop;
                    }
                    case "defmacro!": {
                        const [, key, value] = ast.list;
                        if (key.type !== 6) {
                            throw new Error(`unexpected token type: ${key.type}, expected: symbol`);
                        }
                        if (!value) {
                            throw new Error(`unexpected syntax`);
                        }
                        const f = evalMal(value, env);
                        if (f.type !== 10) {
                            throw new Error(`unexpected token type: ${f.type}, expected: function`);
                        }
                        f.isMacro = true;
                        return env.set(key, f);
                    }
                    case "macroexpand": {
                        return macroexpand(ast.list[1], env);
                    }
                    case "try*": {
                        try {
                            return evalMal(ast.list[1], env);
                        }
                        catch (e) {
                            const catchBody = ast.list[2];
                            if (!types_1.isSeq(catchBody)) {
                                throw new Error(`unexpected return type: ${catchBody.type}, expected: list or vector`);
                            }
                            const catchSymbol = catchBody.list[0];
                            if (catchSymbol.type === 6 && catchSymbol.v === "catch*") {
                                const errorSymbol = catchBody.list[1];
                                if (errorSymbol.type !== 6) {
                                    throw new Error(`unexpected return type: ${errorSymbol.type}, expected: symbol`);
                                }
                                if (!types_1.isAST(e)) {
                                    e = new types_1.MalString(e.message);
                                }
                                return evalMal(catchBody.list[2], new env_1.Env(env, [errorSymbol], [e]));
                            }
                            throw e;
                        }
                    }
                    case "do": {
                        const list = ast.list.slice(1, -1);
                        evalAST(new types_1.MalList(list), env);
                        ast = ast.list[ast.list.length - 1];
                        continue loop;
                    }
                    case "if": {
                        const [, cond, thenExpr, elseExrp] = ast.list;
                        const ret = evalMal(cond, env);
                        let b = true;
                        if (ret.type === 5 && !ret.v) {
                            b = false;
                        }
                        else if (ret.type === 4) {
                            b = false;
                        }
                        if (b) {
                            ast = thenExpr;
                        }
                        else if (elseExrp) {
                            ast = elseExrp;
                        }
                        else {
                            ast = types_1.MalNil.instance;
                        }
                        continue loop;
                    }
                    case "fn*": {
                        const [, params, bodyAst] = ast.list;
                        if (!types_1.isSeq(params)) {
                            throw new Error(`unexpected return type: ${params.type}, expected: list or vector`);
                        }
                        const symbols = params.list.map(param => {
                            if (param.type !== 6) {
                                throw new Error(`unexpected return type: ${param.type}, expected: symbol`);
                            }
                            return param;
                        });
                        return types_1.MalFunction.fromLisp(evalMal, env, symbols, bodyAst);
                    }
                }
        }
        const result = evalAST(ast, env);
        if (!types_1.isSeq(result)) {
            throw new Error(`unexpected return type: ${result.type}, expected: list or vector`);
        }
        const [f, ...args] = result.list;
        if (f.type !== 10) {
            throw new Error(`unexpected token: ${f.type}, expected: function`);
        }
        if (f.ast) {
            ast = f.ast;
            env = f.newEnv(args);
            continue loop;
        }
        return f.func(...args);
    }
}
function print(exp) {
    return printer_1.prStr(exp);
}
function makeEval(extra) {
    const replEnv = new env_1.Env();
    function rep(str) {
        return print(evalMal(read(str), replEnv));
    }
    const extraFunctions = core.symbolFunctionMapBuilder(extra);
    const allFunctions = new Map([...core.ns, ...extraFunctions]);
    allFunctions.forEach((value, key) => {
        replEnv.set(key, value);
    });
    replEnv.set(types_1.MalSymbol.get("eval"), types_1.MalFunction.fromBootstrap(ast => {
        if (!ast) {
            throw new Error(`undefined argument`);
        }
        return evalMal(ast, replEnv);
    }));
    replEnv.set(types_1.MalSymbol.get("*ARGV*"), new types_1.MalList([]));
    rep("(def! not (fn* (a) (if a false true)))");
    rep(`(defmacro! cond (fn* (& xs) (if (> (count xs) 0) (list 'if (first xs) (if (> (count xs) 1) (nth xs 1) (throw "odd number of forms to cond")) (cons 'cond (rest (rest xs)))))))`);
    rep("(def! *gensym-counter* (atom 0))");
    rep("(def! gensym (fn* [] (symbol (str \"G__\" (swap! *gensym-counter* (fn* [x] (+ 1 x)))))))");
    rep("(defmacro! or (fn* (& xs) (if (empty? xs) nil (if (= 1 (count xs)) (first xs) (let* (condvar (gensym)) `(let* (~condvar ~(first xs)) (if ~condvar ~condvar (or ~@(rest xs)))))))))");
    return rep;
}
exports.makeEval = makeEval;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFsLmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJzcmMvbWFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsbUNBQWlJO0FBQ2pJLCtCQUE0QjtBQUM1QiwrQkFBK0I7QUFDL0IscUNBQW1DO0FBQ25DLHVDQUFrQztBQUdsQyxTQUFTLElBQUksQ0FBQyxHQUFXO0lBQ3JCLE9BQU8sZ0JBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN4QixDQUFDO0FBRUQsU0FBUyxVQUFVLENBQUMsR0FBWTtJQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ2QsT0FBTyxJQUFJLGVBQU8sQ0FBQyxDQUFDLGlCQUFTLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDckQ7SUFDRCxJQUFJLENBQUMsYUFBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsR0FBRyxDQUFDLElBQUksNEJBQTRCLENBQUMsQ0FBQztLQUNuRjtJQUNELE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztJQUM5QixJQUFJLElBQUksQ0FBQyxJQUFJLE1BQWdCLElBQUksSUFBSSxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUU7UUFDbkQsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUNELElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ2QsSUFBSSxDQUFDLGFBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMsMEJBQTBCLElBQUksQ0FBQyxJQUFJLDRCQUE0QixDQUFDLENBQUM7U0FDcEY7UUFDRCxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDakMsSUFBSSxLQUFLLENBQUMsSUFBSSxNQUFnQixJQUFJLEtB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