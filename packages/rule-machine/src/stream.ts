export type Suscriber<T> = (value: T) => void;
export class Stream<T> {
    suscribers: Array<Suscriber<T>>
    constructor(setup: (next: Suscriber<T>) => void) {
        this.suscribers = [];
        setup(this.broadcaster);
    }

    broadcaster = (event: T) =>
        this.suscribers.forEach((obs) => obs(event));

    suscribe(suscriber: Suscriber<T>) {
        this.suscribers.push(suscriber);
    }

    map<U>(f: (t: T) => U): Stream<U> {
        return new Stream<U>((next) => {
            this.suscribe((event) => {
                next(f(event));
            });
        });
    }

    static mergeMap<T>(streams: Stream<T>[]): Stream<T> {
        return new Stream<T>((next) => {
            streams.forEach((s) => s.suscribe(next));
        });
    }

    static empty<T>(): Stream<T> {
        return new Stream<T>(() => {})
    }
}
