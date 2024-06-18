import { compareItems, rankItem } from '@tanstack/match-sorter-utils';
import { FilterFn, SortingFn, sortingFns } from "@tanstack/react-table";
import { RowData } from "@tanstack/table-core";
export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);

    addMeta({
        itemRank,
    });

    return itemRank.passed;
};

export const fuzzySort: SortingFn<RowData> = (rowA, rowB, columnId) => {
    let dir = 0;

    if (rowA.columnFiltersMeta[columnId]) {
        dir = compareItems(
            // @ts-expect-error : Argument of type RankingInfo is not assignable to parameter of type
            rowA.columnFiltersMeta[columnId]?.itemRank,
            rowB.columnFiltersMeta[columnId]?.itemRank
        );
    }

    return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};