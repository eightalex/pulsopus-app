import {TIcon} from '@/icons';
import MuiIconButton, {IconButtonProps} from '@mui/material/IconButton';
import {SvgIconProps} from '@mui/material/SvgIcon';
import MuiTooltip, {TooltipProps} from '@mui/material/Tooltip';
import {FC, memo, ReactElement, useMemo} from 'react';

export interface IButtonIconProps extends IconButtonProps {
    icon: ReactElement | TIcon;
    tooltipProps?: Partial<TooltipProps>;
    iconProps?: Partial<SvgIconProps>;
    title?: TooltipProps['title'];
    disabledActive?: boolean;
}

const ButtonIcon: FC<IButtonIconProps> = (props) => {
    const {
        icon,
        title = '',
        tooltipProps = {},
        iconProps = {},
        sx = {},
        disabledActive = false,
        onClick,
        ...restProps
    } = props;

    const renderIcon = useMemo(() => {
        if (!icon) return null;
        if ('$$typeof' in icon.type) {
            return icon;
        }
        const {icon: Icon} = props;
        return <Icon {...iconProps} />;
    }, [icon, props, iconProps]);

    const buttonSx = useMemo(() => {
        if (disabledActive || !onClick) {
            return {
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                '&:active': {
                    background: 'transparent',
                },
                '&:hover': {
                    background: 'transparent',
                },
                ...sx,
            };
        }
        return sx;
    }, [sx, onClick, disabledActive]);

    return (
        <MuiTooltip
            title={title}
            placement="top"
            arrow
            {...tooltipProps}
        >
            <MuiIconButton
                sx={buttonSx}
                onClick={onClick}
                {...restProps}
            >
                {renderIcon}
            </MuiIconButton>
        </MuiTooltip>
    );
};

export default memo(ButtonIcon);
