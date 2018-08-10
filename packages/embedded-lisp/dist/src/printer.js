"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function prStr(v, printReadably = true) {
    switch (v.type) {
        case 1:
            return `(${v.list.map(v => prStr(v, printReadably)).join(" ")})`;
        case 8:
            return `[${v.list.map(v => prStr(v, printReadably)).join(" ")}]`;
        case 9:
            let result = "{";
            for (const [key, value] of v.entries()) {
                if (result !== "{") {
                    result += " ";
                }
                result += `${prStr(key, printReadably)} ${prStr(value, printReadably)}`;
            }
            result += "}";
            return result;
        case 2:
        case 6:
        case 5:
            return `${v.v}`;
        case 3:
            if (printReadably) {
                const str = v.v
                    .replace(/\\/g, "\\\\")
                    .replace(/"/g, '\\"')
                    .replace(/\n/g, "\\n");
                return `"${str}"`;
            }
            else {
                return v.v;
            }
        case 4:
            return "nil";
        case 7:
            return `:${v.v}`;
        case 10:
            return "#<function>";
        case 11:
            return `(atom ${prStr(v.v, printReadably)})`;
    }
}
exports.prStr = prStr;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbnRlci5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsic3JjL3ByaW50ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFFQSxTQUFnQixLQUFLLENBQUMsQ0FBVSxFQUFFLGFBQWEsR0FBRyxJQUFJO0lBQ2xELFFBQVEsQ0FBQyxDQUFDLElBQUksRUFBRTtRQUNaO1lBQ0ksT0FBTyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3JFO1lBQ0ksT0FBTyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3JFO1lBQ0ksSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDO1lBQ2pCLEtBQUssTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ3BDLElBQUksTUFBTSxLQUFLLEdBQUcsRUFBRTtvQkFDaEIsTUFBTSxJQUFJLEdBQUcsQ0FBQztpQkFDakI7Z0JBQ0QsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxFQUFFLENBQUM7YUFDM0U7WUFDRCxNQUFNLElBQUksR0FBRyxDQUFDO1lBQ2QsT0FBTyxNQUFNLENBQUM7UUFDbEIsT0FBaUI7UUFDakIsT0FBaUI7UUFDakI7WUFDSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3BCO1lBQ0ksSUFBSSxhQUFhLEVBQUU7Z0JBQ2YsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7cUJBQ1YsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7cUJBQ3RCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO3FCQUNwQixPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUMzQixPQUFPLElBQUksR0FBRyxHQUFHLENBQUM7YUFDckI7aUJBQU07Z0JBQ0gsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2Q7UUFDTDtZQUNJLE9BQU8sS0FBSyxDQUFDO1FBQ2pCO1lBQ0ksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNyQjtZQUNJLE9BQU8sYUFBYSxDQUFDO1FBQ3pCO1lBQ0ksT0FBTyxTQUFTLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUM7S0FDcEQ7QUFDTCxDQUFDO0FBdkNELHNCQXVDQyJ9