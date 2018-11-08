import { Stream } from "./stream";
import { LauncherRule, LauncherTrigger } from "./types";

export type CodeParam = { rule: string, event: any};
export type CodeEvaluator = (code: CodeParam) => CodeResult;
export type CodeResult = { type: string };

const makeRuleStream = (
    setupTrigger: (trigger: LauncherTrigger) => Stream<unknown>,
) =>
    (rule: LauncherRule) => {
        const allTriggerStreams = rule.triggers.map(setupTrigger)
        const anyTriggerStream = Stream.mergeMap(allTriggerStreams);
        const ruleStream = anyTriggerStream.map((e) => {
          return {
            rule: rule.rule,
            event: e,
          }
        });
        return ruleStream;
    }

export const makeRuleMachine = (
    setupTrigger: (trigger: LauncherTrigger) => Stream<unknown>,
    evalLisp: CodeEvaluator,
) =>
    (rules: LauncherRule[]): Stream<CodeResult> => {
        const ruleStreams = rules.map(makeRuleStream(setupTrigger));
        return Stream.mergeMap(ruleStreams).map(evalLisp);
    }
