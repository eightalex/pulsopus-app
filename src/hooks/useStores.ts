import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux";
import { IRootState, TAppDispatch } from "@/interfaces/IRootStore.ts";

export const useSelector = useReduxSelector.withTypes<IRootState>();

export const useDispatch = useReduxDispatch.withTypes<TAppDispatch>();