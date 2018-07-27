export declare type Time = [number, number, number];
export declare type UtcTimescope = {
    day: number;
    open: Time;
    close: Time;
};
export declare const includesDate: (date: Date) => (timescope: UtcTimescope) => boolean;
export declare const timeUntilTimescope: (date: Date) => (timescope: UtcTimescope) => number;
export declare const utcTimescopes: (oldTimescopes: TimeScope[]) => UtcTimescope[];
