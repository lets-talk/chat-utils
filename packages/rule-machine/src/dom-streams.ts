import { Stream } from "./stream";
import { JqueryLike } from "./types";

export const domEvent = ($: JqueryLike) =>
    (selector: string, eventName: string) => {
        return new Stream<unknown>((next) => {
            $(selector, eventName, (event: unknown) => {
                next(event);
            });
        });
    };

export const windowEvent = ($: JqueryLike) =>
    (eventName: string) =>
        new Stream<unknown>((next) => {
            $(window, eventName, (event: unknown) => {
                next(event);
            });
        });
