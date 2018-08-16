export type LauncherTrigger = {
    type: string;
}

export type LispRule = string;

export type LauncherRule = {
    triggers: LauncherTrigger[];
    rule: LispRule;
};
