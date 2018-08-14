import { Stream } from "./stream";
import { LauncherTrigger, JqueryLike } from "./types";
import { domEvent, windowEvent } from "./dom-streams";
import { timer } from "./time-streams";

export const setupTrigger = ($: JqueryLike) =>
    (trigger: LauncherTrigger): Stream<unknown> => {
        switch (trigger.type) {
            case 'timer':
                return timer(trigger.delay, trigger.interval) as Stream<unknown>;

            case 'dom-event':
                return domEvent($)(trigger.selector, trigger.name);

            case 'url-event':
                return windowEvent($)('hashchange');
        }
    }
