"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
class Env {
    constructor(outer, binds = [], exprts = []) {
        this.outer = outer;
        this.data = new Map();
        for (let i = 0; i < binds.length; i++) {
            const bind = binds[i];
            if (bind.v === "&") {
                this.set(binds[i + 1], new types_1.MalList(exprts.slice(i)));
                break;
            }
            this.set(bind, exprts[i]);
        }
    }
    set(key, value) {
        this.data.set(key, value);
        return value;
    }
    find(key) {
        if (this.data.has(key)) {
            return this;
        }
        if (this.outer) {
            return this.outer.find(key);
        }
        return void 0;
    }
    get(key) {
        const env = this.find(key);
        if (!env) {
            throw new Error(`'${key.v}' not found`);
        }
        const v = env.data.get(key);
        if (!v) {
            throw new Error(`'${key.v}' not found`);
        }
        return v;
    }
}
exports.Env = Env;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52LmpzIiwic291cmNlUm9vdCI6Ii4vIiwic291cmNlcyI6WyJzcmMvZW52LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUNBQXNEO0FBRXRELE1BQWEsR0FBRztJQUdaLFlBQW1CLEtBQVcsRUFBRSxRQUFxQixFQUFFLEVBQUUsU0FBb0IsRUFBRTtRQUE1RCxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQzFCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUV0QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNuQyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtnQkFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksZUFBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyRCxNQUFNO2FBQ1Q7WUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3QjtJQUNMLENBQUM7SUFFRCxHQUFHLENBQUMsR0FBYyxFQUFFLEtBQWM7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzFCLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxJQUFJLENBQUMsR0FBYztRQUNmLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDcEIsT0FBTyxJQUFJLENBQUM7U0FDZjtRQUNELElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNaLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDL0I7UUFFRCxPQUFPLEtBQUssQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFRCxHQUFHLENBQUMsR0FBYztRQUNkLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNOLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUMzQztRQUVELE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDSixNQUFNLElBQUksS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDM0M7UUFFRCxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7Q0FDSjtBQTdDRCxrQkE2Q0MifQ==