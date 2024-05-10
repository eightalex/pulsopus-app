export interface IEventBus<P = void> {
    // eslint-disable-next-line @typescript-eslint/ban-types
    subscribe(subscriber: (param: P) => void): Function;
    unsubscribe(key: string): void;
    publish(param: P): void;
}
