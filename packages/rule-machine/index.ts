import { setupRuleMachine, CodeEvaluator } from "./src/rules";
import { setupTrigger } from "./src/triggers";
import { JqueryLike } from "./src/types";

export const makeRuleMachine = ($: JqueryLike, evalLisp: CodeEvaluator) =>
    setupRuleMachine(setupTrigger($), evalLisp);
