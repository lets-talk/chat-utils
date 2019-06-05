export type LauncherTrigger = {
    type: string;
}

export type LispRule = string;

export type LauncherRule = {
    triggers: LauncherTrigger[];
    rule: LispRule;
};

export type CodeParam = { rule: string, event: any};
export type CodeEvaluator = (code: CodeParam) => CodeResult;
export type CodeResult = { type: string };
