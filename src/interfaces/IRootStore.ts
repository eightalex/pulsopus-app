import store from "@/stores";

export interface IRootState extends ReturnType<typeof store.getState> {}
export type TAppDispatch = typeof store.dispatch;