import { IEventBus } from '@/interfaces';

export class EventBus<P = void> implements IEventBus<P> {
    private subscribers: Map<string, (param: P) => void> = new Map();

    // eslint-disable-next-line @typescript-eslint/ban-types
    public subscribe(subscriber: (param: P) => void): Function {
        const key = Math.random().toString(16).slice(2);

        this.subscribers.set(key, subscriber);

        return () => this.unsubscribe(key);
    }

    public unsubscribe(key: string): void {
        this.subscribers.delete(key);
    }

    public publish(param: P): void {
        this.subscribers.forEach(subscriber => subscriber(param));
    }
}
