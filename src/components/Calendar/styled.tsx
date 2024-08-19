import Stack, { StackProps } from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

interface IContainerStyledProps {
	fullLine: boolean;
}

export const ContainerStyled = styled(({ ...props }: StackProps) =>
	<Stack
		{...props}
		direction="row"
		// spacing={3}
	/>, {
	shouldForwardProp: (prop) => prop !== 'fullLine',
	}
)<IContainerStyledProps>(({ theme: { spacing }, fullLine }) => ({
	position: 'relative',
	width: 'auto',
	minWidth: 36,
	height: 36,
	display: 'flex',
	flexGrow: 1,
	padding: fullLine ? spacing(1, 4) : spacing(1),
	overflow: 'auto',
	alignItems: 'center',
	border: '1px solid #CBCBCB',
	borderRadius: 4,
	cursor: 'pointer',
}));