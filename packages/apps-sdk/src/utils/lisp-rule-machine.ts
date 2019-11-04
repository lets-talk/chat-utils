// @ts-nocheck
// TODO: stop ignoring coverage
/* istanbul ignore file */
import {
  makeEval,
  MalString,
  MalBoolean,
  extractString,
  extractNumber,
  MalType,
} from '@lets-talk/embedded-lisp';

import {
  makeRuleMachine,
} from '@lets-talk/rule-machine';

import { Observable, empty } from 'rxjs';

import * as $ from 'jquery';
import { ObjectIndex } from 'types';

const checkNested = (obj: any, ...args: any[]) => {
  let tempObj = Object.assign({}, obj);
  for (let i = 0; i < args.length; i += 1) {
    if (!tempObj || !tempObj.hasOwnProperty(args[i])) {
      return false;
    }
    tempObj = tempObj[args[i]];
  }
  return tempObj;
};

const getDepthProperty = (obj: any, property: string) => {
  const properties = property.split('.');
  const result = checkNested(obj, ...properties);
  return result;
};

export const matchLispPattern = (value: any, lispPattern: any, lispFlags: MalType) => {
  const pattern = extractString(lispPattern);
  const flags = lispFlags ? extractString(lispFlags) : undefined;
  const matches = value.match(new RegExp(pattern, flags));
  return new MalBoolean(Boolean(matches));
};

export const matchesRuleHOC = (source: any) => {
  const matcherFunction = (lispPath: any, lispPattern: any, lispFlags: any) => {
    const contextPath = extractString(lispPath);
    const retrievedValue = getDepthProperty(source, contextPath);
    if (!retrievedValue) return new MalBoolean(Boolean(false));

    return matchLispPattern(retrievedValue, lispPattern, lispFlags);
  };
  return matcherFunction;
};

export const evalLisp = (widgetContext: any, event: { detail: any }) => makeEval({
  open() {
    const json = '{"type": "notification"}';
    return new MalString(json);
  },
  and(a: any, b: any) {
    const result = a.v && b.v;
    return new MalBoolean(Boolean(result));
  },
  widget_name_is_in(widgetNames) {
    const inArray = (widgetNames as any).list.some((elem: any) => elem.v === widgetContext.appSettings.name);
    return new MalBoolean(Boolean(inArray));
  },
  widget_is_available() {
    const isAvailable = (window as any).$LT.isAvailable();
    return new MalBoolean(Boolean(isAvailable));
  },
  open_chat(lispId) {
    const id = extractNumber(lispId);
    const json = `{"type": "chat", "payload": ${id}}`;
    return new MalString(json);
  },
  open_banner(lispId) {
    const id = extractNumber(lispId);
    const json = `{"type": "banner", "id": ${id}}`;
    return new MalString(json);
  },
  open_nothing() {
    const json = '{"type": "nothing"}';
    return new MalString(json);
  },
  url_matches(lispPattern, lispFlags) {
    return matchLispPattern(window.location.href, lispPattern, lispFlags);
  },
  context_matches(lispPath, lispPattern, lispFlags) {
    return matchesRuleHOC(widgetContext)(lispPath, lispPattern, lispFlags);
  },
  client_values_matches(lispPath, lispPattern, lispFlags) {
    const { detail } = event;
    // We create an object with key value
    const detailsAsObject = detail.map((d: any) => {
      const result: ObjectIndex<any> = {};
      result[d.key] = d.value;
      return result;
    });
    // Check if at least on of the object (clientKeyValue) matches
    const oneKeyValueMatches = detailsAsObject.some((clientKeyValue: any) => {
      const malResult = matchesRuleHOC(clientKeyValue)(lispPath, lispPattern, lispFlags);
      return malResult.v;
    });
    return new MalBoolean(Boolean(oneKeyValueMatches));
  },
});

export const domEvent = (jq:any) =>
  (selector:string, eventName: string) => new Observable ((observer: any) => {
    jq(selector).on(eventName, (event:unknown) => {
      observer.next(event);
    });
  });

export const windowEvent = (jq: any) =>
  (eventName : string ) =>
    new Observable ((observer: any) => {
      jq(window).on(eventName, (event : unknown) => {
        debugger;
        observer.next(event);
      });
    });

export const onDemandEvent =
  (eventName: string) => new Observable((observer: any) => {
    document.addEventListener(eventName, (event) => {
      observer.next(event);
    });
  });

export const timer =
  (delay: number, interval : number) => {
    let counter = 0;
    return new Observable <number>((observer: any) => {
      setTimeout(() => {
        observer.next(counter);
        if (interval > 0) {
          setInterval(() => {
            counter += 1;
            observer.next(counter);
          }, interval);
        }
      }, delay);
    });
  };

export const setupTrigger = (jq: any) =>
  (trigger : any) : any  => {
    debugger;
    switch (trigger.type) {
      case 'timer':
        return timer(trigger.delay, trigger.interval);

      case 'dom-event':
        return domEvent(jq)(trigger.selector, trigger.name);

      case 'url-event':
        return windowEvent(jq)('hashchange');

      case 'on-demand-event':
        return onDemandEvent(trigger.name);

      default:
        return empty();
    }
  };


const makeAppManagerHandler = (sendChannel: any, id: string) => (action: any) => {
  switch (action.type) {
    case 'notification':
      sendChannel.send('lt-external-notification', { action, id });
      break;
    case 'banner':
      sendChannel.send('banner', { id: action.id });
      break;

    case 'nothing':
      break;

    default:
      break;
  }
};

export const launchRuleMachine = (launcherRules: any, sendChannel: any, widgetContext: any) => {
  launcherRules.forEach((lr: any) => {
    const lispRules = [lr.lisp_rule];
    const defaultAppId = lr.widget_app.id;

    const ruleMachine = makeRuleMachine(
      setupTrigger($),
      ({ rule, event }: any) => {
        const evalLispFunctionWithContext = evalLisp(widgetContext, event);
        const evaluation = JSON.parse(evalLispFunctionWithContext(rule));
        return JSON.parse(evaluation);
      }
    )(lispRules);

    ruleMachine.subscribe(makeAppManagerHandler(sendChannel, defaultAppId));
  });
};
