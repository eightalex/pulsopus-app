import Stack, { StackProps } from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

export const SidePanelWrapperStyled = styled((props: StackProps) =>
	<Stack
		direction="row"
		spacing={0}
		{...props}
	/>
)({
	background: 'transparent',
	display: 'flex',
	width: '100%',
	height: '100%',
});

export const SidePanelContentStyled = styled(Stack)({
	display: 'flex',
	flexGrow: 1,
});
