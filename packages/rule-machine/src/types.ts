export type TimerTrigger = {
    type: 'timer';
    delay: number;
    interval: number;
}
export type DomEventTrigger = {
    type: 'dom-event';
    selector: string;
    name: string;
}
export type UrlEventTrigger = {
    type: 'url-event';
}
export type LauncherTrigger =
    TimerTrigger |
    DomEventTrigger |
    UrlEventTrigger;

export type LispRule = string;

export type LauncherRule = {
    triggers: LauncherTrigger[];
    rule: LispRule;
};

export type JqueryLike =
    (
        selector: any,
        eventName: string,
        callback: (value: any) => void
    ) => void;
