import Checkbox from "@mui/material/Checkbox";
import { observer } from "mobx-react";
import { FC, MouseEvent, useCallback, useMemo } from "react";

import { ButtonIcon } from "@/components/ButtonIcon";
import { TrashIcon } from '@/icons';

import { SelectActionRowStyled } from "./styled.tsx";
import {
    IAdministrationTableSelectActionProps
} from "./types.ts";

export const AdministrationTableSelectAction: FC<IAdministrationTableSelectActionProps> = observer((props) => {
    const {
        onSelect,
        onDelete,
        isChecked,
        isIndeterminate,
        disabledSelect = false,
        disabledDelete = false,
    } = props;

    const handleRowSelectClick = useCallback((e: MouseEvent) => {
        e && e.preventDefault();
        e && e.stopPropagation();
        onSelect?.(e);
    }, [onSelect]);

    return (
        <>
            <SelectActionRowStyled>
                <Checkbox
                    disabled={disabledSelect}
                    checked={isChecked}
                    indeterminate={isIndeterminate}
                    onClick={handleRowSelectClick}
                    sx={{ padding: 0 }}
                />
                <ButtonIcon
                    variant='text'
                    size='small'
                    onClick={onDelete}
                    disabled={disabledDelete}
                    icon={TrashIcon}
                    title="Delete selected users"
                />
            </SelectActionRowStyled>
        </>
    );
});