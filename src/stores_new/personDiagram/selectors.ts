import { IPersonDiagramStore } from "@/interfaces/IPersonDiagramStore.ts";
import { IRootState } from "@/interfaces/IRootStore.ts";

export const selectPersonDiagramState = (state: IRootState): IPersonDiagramStore => state.personDiagram;
export const selectPersonDiagramIsCompare = (state: IRootState): IPersonDiagramStore["isCompare"] => selectPersonDiagramState(state).isCompare;
export const selectPersonDiagramPersonValue = (state: IRootState): IPersonDiagramStore["personValue"] => selectPersonDiagramState(state).personValue;
export const selectPersonDiagramCompareValue = (state: IRootState): IPersonDiagramStore["compareValue"] => selectPersonDiagramState(state).compareValue;