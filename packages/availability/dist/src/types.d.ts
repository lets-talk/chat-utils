declare type Settings = {
    time_scopes: TimeScope[] | null;
    disabled: boolean;
};
declare type Availability = {
    isWidgetAvailable: boolean;
    timeToWait: number;
};
declare type TimeScope = {
    day: number;
    open: string;
    close: string;
    offset: number;
};
