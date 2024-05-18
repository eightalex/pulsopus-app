import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPersonDiagramStore } from "@/interfaces/IPersonDiagramStore.ts";

const initialState: IPersonDiagramStore = {
    isCompare: false,
};

export const personDiagramSlice = createSlice({
    name: 'personDiagram',
    initialState,
    reducers: {
        setCompare: (state, { payload }: PayloadAction<IPersonDiagramStore["isCompare"]>) => {
            state.isCompare = payload;
        },
        toggleCompare: (state) => {
            state.compareValue = undefined;
            if(!state.isCompare && !state.personValue) return;
            state.isCompare = !state.isCompare;
        },
        resetState: (state) => {
            state.isCompare = false;
            state.personValue = undefined;
            state.compareValue = undefined;
        },
        setPersonValue: (state, { payload }: PayloadAction<IPersonDiagramStore["personValue"]>) => {
            state.personValue = payload;
        },
        setCompareValue: (state, { payload }: PayloadAction<IPersonDiagramStore["compareValue"]>) => {
            state.compareValue = payload;
        },
    },
});

const { reducer, actions } = personDiagramSlice;

export { actions,reducer };
export default reducer;