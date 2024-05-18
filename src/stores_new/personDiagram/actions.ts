import { IRootState, TAppDispatch } from "@/interfaces/IRootStore.ts";
import { actions } from '@/stores_new/personDiagram';


export const setPersonDiagramPersonValue = (userId?: string) => {
    return (dispatch: TAppDispatch, getState: () => IRootState) => {
        const state: IRootState = getState();
        if(!userId) {
            dispatch(actions.setPersonValue(undefined));
        }
        const user = state.users.users.find(({ id }) => userId === id);
        dispatch(actions.setPersonValue(user));
    };
};

export const setPersonDiagramMount = (userId?: string) => {
    return (dispatch: TAppDispatch) => {
        dispatch(setPersonDiagramPersonValue(userId));
    };
};
