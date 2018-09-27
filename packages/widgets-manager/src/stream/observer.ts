import { Stream } from "./stream";

export class Observer {
  config: Object;
  observer: MutationObserver;
  stream: Stream<{}> = new Stream<{}>(() => null);

  constructor(targets: Node[], callback: (mutations: MutationRecord[]) => void) {
    console.log('Targets:', targets);
    // create an observer instance
    this.observer = new MutationObserver((mutations) => {
      console.log('Got mutations baby!!!');
      this.stream = new Stream<{}>(() => callback(mutations));
    });

    // configuration of the observer:
    this.config = {
      attributes: true,
      childList: true,
      characterData: true,
      attributeFilter: ['style'],
    };

    targets.forEach((target) => {
      // pass in the target node, as well as the observer options
      this.observer.observe(target, this.config);
    });
  }

  addObserver(target: Node) {
    this.observer.observe(target, this.config);
  }

  disconnect() {
    this.observer.disconnect();
  }
}