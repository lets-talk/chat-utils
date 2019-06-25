import { MalType, MalSymbol, MalList } from "./types";

export class Env {
    data:{ [index:string] : MalType };

    constructor(public outer?: Env, binds: MalSymbol[] = [], exprts: MalType[] = []) {
        this.data = {};

        for (let i = 0; i < binds.length; i++) {
            if (binds[i].v === "&") {
                this.data[binds[i + 1].v] = new MalList(exprts.slice(i));
                break;
            } else {
              this.data[binds[i].v] = exprts[i];
            }
        }
    }

    set(key: MalSymbol, value: MalType): MalType {
        this.data[key.v] = value;
        return value;
    }

    find(key: MalSymbol): Env | undefined {
        if (key.v in this.data) {
            return this;
        }
        if (this.outer) {
            return this.outer.find(key);
        }

        return void 0;
    }

    get(key: MalSymbol): MalType {
        const env = this.find(key);
        if (!env) {
            throw new Error(`'${key.v}' not found`);
        }

        const v = env.data[key.v];
        
        if (!v) {
            throw new Error(`'${key.v}' not found`);
        }

        return v;
    }
}
