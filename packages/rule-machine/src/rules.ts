import { from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { LauncherRule, LauncherTrigger, CodeEvaluator, CodeResult } from "./types";
import { Observable } from "rxjs/internal/Observable";

const makeRuleStream = (
    setupTrigger: (trigger: LauncherTrigger) => Observable<LauncherTrigger>,
) =>
    (rule: LauncherRule) => {
      const allTriggerStreams = from(rule.triggers);
      const ruleStream = allTriggerStreams.pipe(
        mergeMap(setupTrigger),
        map((e: LauncherTrigger) => ({ rule: rule.rule, event: e })),
      )
      
      return ruleStream;
    }

export const makeRuleMachine = (
    setupTrigger: (trigger: LauncherTrigger) => Observable<any>,
    evalLisp: CodeEvaluator,
) =>
    (rules: LauncherRule[]): Observable<CodeResult> => {
        const ruleStreams = from(rules);
        return ruleStreams.pipe(
          mergeMap(makeRuleStream(setupTrigger)),
          map(evalLisp)
        );
    }
