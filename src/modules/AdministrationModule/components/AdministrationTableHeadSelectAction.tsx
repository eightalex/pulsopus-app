import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import { Table } from "@tanstack/table-core";
import { observer } from "mobx-react";
import { FC, MouseEvent, useCallback, useState } from "react";

import { ButtonIcon } from "@/components/ButtonIcon";
import { Dialog } from "@/components/Dialog";
import Typography from "@/components/Typography";
import { useStores } from "@/hooks";
import { TrashIcon } from '@/icons';
import { IUser } from "@/interfaces";

import { SelectActionRowStyled } from "./styled.tsx";

interface IProps {
    table: Table<IUser>
}

interface IDialogProps extends IProps, IDialogProps {
    onConfirm?: () => void;
}

const RenderDialog: FC<IDialogProps> = ({ table, open, onClose, onConfirm }) => {
    const rows = table.getSelectedRowModel().rows;
    const list = rows.map((r) => r.original.username);
    return (
        <Dialog
            hideClose
            open={open}
            onClose={onClose}
            title={`Are u sure u want to delete ${rows.length} users?`}
            fullWidth
            maxWidth='md'
            actions={[
                <Stack
                    direction='row'
                    spacing={4}
                    sx={({ spacing }) => ({
                        padding: spacing(4, 6)
                    })}
                >
                    <Button color={'error'} onClick={onClose}>Cancel</Button>
                    <Button variant='contained' onClick={onConfirm}>Confirm</Button>
                </Stack>
            ]}
        >
            <Stack spacing={0}>
                {list.map((v) => (
                    <Typography
                        key={v}
                        variant='text'
                    >
                        {v}
                    </Typography>
                ))}
            </Stack>
        </Dialog>
    );
};

export const AdministrationTableHeadSelectAction: FC<IProps> = observer(({ table }) => {
    const {
        rootStore: {
            usersStore: { users }
        }
    } = useStores();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleRowSelectClick = useCallback((e: MouseEvent) => {
        e && e.preventDefault();
        e && e.stopPropagation();
        const isChecked = table.getIsAllPageRowsSelected();
        const isIndeterminate = table.getIsSomePageRowsSelected();
        const state = isChecked || isIndeterminate;
        table.toggleAllPageRowsSelected(!state);
    }, [table]);

    const onDelete = useCallback(() => {
        const rowsIds = table.getSelectedRowModel()
            .rows
            .map(({ original }) => original.id);
        alert(JSON.stringify(rowsIds, null, 2));
        setIsDialogOpen(false);
    }, [table]);

    return (
        <>
            <SelectActionRowStyled>
                <Checkbox
                    disabled={false}
                    checked={table.getIsAllPageRowsSelected()}
                    indeterminate={table.getIsAllPageRowsSelected()
                        ? table.getIsSomePageRowsSelected()
                        : table.getIsSomeRowsSelected()}
                    onClick={handleRowSelectClick}
                    sx={{
                        padding: 0,
                    }}
                    inputProps={{
                        'aria-label': 'select all rows',
                    }}
                />
                <ButtonIcon
                    variant='text'
                    size='small'
                    onClick={() => setIsDialogOpen(true)}
                    // disabled={!table.getIsSomeRowsSelected()}
                    icon={TrashIcon}
                    title="Delete selected users"
                />
            </SelectActionRowStyled>
            <RenderDialog
                table={table}
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={onDelete}
            />
        </>
    );
});