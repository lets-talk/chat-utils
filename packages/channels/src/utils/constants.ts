// Retry strategy configuration by default
export const RETRY_STRATEGY_NAME = 'incremental'; // The retry algorithm (availabe methods are: 'incremental', 'random', 'exponential')
export const RETRY_TIMES_TO_RETRY = 10; // How many times to retry at max
export const RETRY_DELAY = 500; // miliseconds to wait between each retry
export const RETRY_DELAY_FACTOR = 2; // Factor to increment