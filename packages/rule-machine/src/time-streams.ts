import { Stream } from "./stream";

export const timer = (delay: number, interval: number) => {
    let counter = 0;
    return new Stream<number>((next) => {
        setTimeout(() => {
            next(counter);
            if (interval > 0) {
                setInterval(() => {
                    counter += 1;
                    next(counter);
                }, interval);
            }
        }, delay);
    });
};
