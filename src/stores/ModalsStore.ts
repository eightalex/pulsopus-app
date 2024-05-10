import { IWindowEntity } from '@/interfaces';
import { WindowEntity } from '@/entities';
import { BaseStore } from '@/stores/BaseStore';

export class ModalsStore extends BaseStore {
    // user
    public userAuth: IWindowEntity = new WindowEntity();
}
