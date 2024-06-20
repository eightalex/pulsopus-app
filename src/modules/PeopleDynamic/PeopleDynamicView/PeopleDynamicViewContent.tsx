import { Box, Stack } from '@mui/material';
import { FC, ReactNode } from 'react';

import ButtonIcon from '@/components/ButtonIcon';
import { InfoIcon } from '@/icons';

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
