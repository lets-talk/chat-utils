import { ObjectIndex } from "../types";

type strategyConfig = {
  strategyName: string;
  timesToRetry: number;
  delay: number;
}

type randomStrategyConfig = {
  minDelay: number;
  maxDelay: number;
}

const wait = (duration: number) => new Promise((resolve) => setTimeout(resolve, duration));
const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max + min + 100)) + min;

// Available Retry strategies
const retryExponentialBackoffStrategy = ({ delayFactor = 2, delay = 500 }, _:any, attempts: number) => Math.pow(delayFactor, attempts) * delay;
const retryRandomStrategy = ({ minDelay, maxDelay }: randomStrategyConfig) => randomBetween(minDelay, maxDelay);
const retryIncremental = ({ delayFactor = 1 }, timeToWait: number) => timeToWait * delayFactor;

const availableRetryStrategies: ObjectIndex<any> = {
  incremental: retryIncremental,
  random: retryRandomStrategy,
  exponential: retryExponentialBackoffStrategy,
};
/**
 *  This is a HOF => High Order Function that takes our original function and returns a better function :)
 */
const retryOnFailure = (functionToRetry: any, retryStrategyConfig: strategyConfig) => (...args: any[]) => {
  const {
    strategyName = 'incremental',
    timesToRetry = 10,
    delay = 200,
  } = retryStrategyConfig;
  const retryStrategyFunction = availableRetryStrategies[strategyName];

  let attempts = 1;
  let timeToWait = delay;
  let failureReason: string;

  const functionToIterate = (...args: any[]) => {
    if (attempts > timesToRetry) {
      return Promise.reject(failureReason);
    }
    attempts += 1;
    return functionToRetry(...args)
      .catch(() => {
        timeToWait = retryStrategyFunction(retryStrategyConfig, timeToWait, attempts);
        return wait(timeToWait)
          .then(() => functionToIterate(...args));
      });
  };
  return functionToIterate(...args);
};

export { retryOnFailure };
