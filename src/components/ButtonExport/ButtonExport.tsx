import { FC, useCallback } from "react";

import { ButtonIcon } from "@/components/ButtonIcon";
import { DownloadIcon } from "@/icons";

export interface IButtonExportProps {

}

export const ButtonExport: FC<IButtonExportProps> = () => {
    const handleExport = useCallback(() => {
        alert('Export as click');
    }, []);

    return (
        <ButtonIcon
            icon={DownloadIcon}
            onClick={handleExport}
            title="Export"
        />
    );
};