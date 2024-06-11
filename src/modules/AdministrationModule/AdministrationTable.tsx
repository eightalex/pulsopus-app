import Stack from "@mui/material/Stack";
import { ColumnDef } from '@tanstack/react-table';
import { observer } from "mobx-react";
import React, { HTMLProps, useMemo, useState } from 'react';

import Table, { ETableFilterVariant } from "@/components/Table";
import { useStores } from "@/hooks";
import { IUser } from "@/interfaces";
import { allGreen400 } from "@/theme/palette.ts";

import { filterRolesFn, filterStatusFn, ROLES_SEPARATOR, sortStatusFn } from "./col.helper.tsx";

function IndeterminateCheckbox({
                                   indeterminate,
                                   className = '',
                                   ...rest
                               }: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
    const ref = React.useRef<HTMLInputElement>(null!);

    React.useEffect(() => {
        if (typeof indeterminate === 'boolean') {
            ref.current.indeterminate = !rest.checked && indeterminate;
        }
    }, [ref, indeterminate]);

    return (
        <input
            type="checkbox"
            ref={ref}
            className={className + ' cursor-pointer'}
            {...rest}
        />
    );
}

export const AdministrationTable = observer(() => {
    const { rootStore: { usersStore: { users } } } = useStores();
    const [data, setData] = useState(() => users);

    const columns = useMemo<ColumnDef<IUser>[]>(() => [
        {
            accessorKey: 'username',
            header: 'Title',
            cell: info => info.getValue(),
            size: 230,
        },
        {
            accessorKey: 'department',
            header: 'Department',
            accessorFn: (row) => row.department.label,
            cell: info => info.getValue(),
            size: 180,
            meta: {
                filterVariant: ETableFilterVariant.SELECT,
            },
        },
        {
            header: 'Date',
            cell: () => '25.07.2023',
            size: 140,
        },
        {
            accessorKey: 'roles',
            header: 'Role',
            cell: info => {
                return [(info.getValue() as string[]).join(ROLES_SEPARATOR)];
            },
            filterFn: filterRolesFn,
            meta: {
                filterVariant: ETableFilterVariant.SELECT,
            },
            getUniqueValues: (row) => [row.roles.join(ROLES_SEPARATOR)],
        },
        {
            accessorKey: 'status',
            header: 'Status',
            meta: {
                filterVariant: ETableFilterVariant.SELECT,
            },
            filterFn: filterStatusFn,
            sortingFn: sortStatusFn,
        },
    ], []);

    return (
        <Stack direction='row' maxWidth='1000px' width='100%' flexGrow={1}>
            <Table
                // data={data}
                data={[...data, ...data]}
                columns={columns}
                numCol
                showPagination
                rowStyleOverrides={(row) => {
                    return {
                        color: row.original?.isPending ? allGreen400 : 'unset',
                    };
                }}
            />
        </Stack>
    );
});