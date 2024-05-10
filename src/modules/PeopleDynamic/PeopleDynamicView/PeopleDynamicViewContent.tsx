import ButtonIcon from '@/components/ButtonIcon';
import { InfoIcon } from '@/icons';
import {Box, Stack} from '@mui/material';
import MuiIconButton from '@mui/material/IconButton';
import MuiTooltip from '@mui/material/Tooltip';
import { FC, ReactNode } from 'react';
import { PeopleDynamicViewContentStyled, PeopleDynamicViewSideStyled, PeopleDynamicViewWrapperStyled } from '../styled';

interface IPeopleDynamicViewContentProps {
	children?: ReactNode;
	content?: ReactNode;
	side?: ReactNode;
	tooltipTitle?: string;
}

export const PeopleDynamicViewContent: FC<IPeopleDynamicViewContentProps> = ({ children, content, side, tooltipTitle }) => {
	return (
		<PeopleDynamicViewWrapperStyled>
			<PeopleDynamicViewContentStyled>
				{children || content}
			</PeopleDynamicViewContentStyled>
			<PeopleDynamicViewSideStyled>
				<Stack
					sx={{
						width: 'fit-content',
						position: 'relative',
					}}
				>
					{tooltipTitle && (
						<Box
							sx={{
								position: 'absolute',
								top: 0,
								right: 0,
								transform: 'translate(calc(100% - 6px), -50%)',
							}}
						>
							<ButtonIcon
								disabledActive
								title={tooltipTitle}
								tooltipProps={{
									title: tooltipTitle,
									placement: 'left-start',
								}}
								icon={<InfoIcon color="hide"/>}
							/>
						</Box>
					)}
					{side}
				</Stack>
			</PeopleDynamicViewSideStyled>
		</PeopleDynamicViewWrapperStyled>
	);
};
