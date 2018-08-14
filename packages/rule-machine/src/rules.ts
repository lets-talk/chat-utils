import { Stream } from "./stream";
import { LauncherRule, LauncherTrigger } from "./types";

export type CodeEvaluator = (code: string) => CodeResult;
export type CodeResult = { type: string };

const flatmap = <T, U>(a: T[], f: (t: T) => U[]): U[] =>
    a.map(f).reduce((acc, val) => acc.concat(val), []);

export const setupRuleMachine = (
    setupTrigger: (trigger: LauncherTrigger) => Stream<unknown>,
    evalLisp: CodeEvaluator,
) =>
    (rules: LauncherRule[]) =>
        Stream.mergeMap(
            flatmap(rules, (rule) =>
                rule.triggers.map((trigger) =>
                    setupTrigger(trigger).map(() =>
                        evalLisp(rule.rule)
                    )
                )
            )
        );
