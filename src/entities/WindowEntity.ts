import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { IWindowEntity } from '@/interfaces';

export class WindowEntity implements IWindowEntity {
    public state: boolean = false;

    constructor() {
        makeObservable(this, {
            state: observable,

            isOpen: computed,
            isClosed: computed,

            onOpen: action.bound,
            onClose: action.bound,
            onToggle: action.bound,
        });
    }

    public get isOpen(): boolean {
        return this.state;
    }

    public get isClosed(): boolean {
        return !this.state;
    }

    public onOpen(): void {
        runInAction(() => {
            this.state = true;
        });
    }

    public onClose(): void {
        runInAction(() => {
            this.state = false;
        });
    }

    public onToggle(): void {
        runInAction(() => {
            this.state = !this.state;
        });
    }
}
