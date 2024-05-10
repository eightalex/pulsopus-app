import { getValidationDay, getValidationMonth, getValidationYear } from '@/components/DateInput/helpers';
import Typography from '@/components/Typography';
import Stack from '@mui/material/Stack';
import moment from 'moment';
import { FC, FocusEvent, memo, useCallback, useEffect, useRef, useState } from 'react';
import { DateInputMastStyled, DateInputStyled } from './styled';
import { IDateInputProps, IValueChangeParams } from './types';

const formatChars = {
	// D: '^(?:[0-9]|[12][0-9]|3[01])$',
	D: '[0-9]',
	M: '[0-9]',
	Y: '[0-9]',
};

const divider = '.';
const mask = ['DD', 'MM', 'YYYY'].join(divider);

const DateInput: FC<IDateInputProps> = (props) => {
	const { value, onChange, active } = props;
	const inputRef = useRef<HTMLInputElement>();
	const [currentState, setCurrentState] = useState(moment(value).format(mask));
	const handleChange = useCallback(({ target }) => {
		setCurrentState(target.value);
	}, []);

	const beforeMaskedValueChange = useCallback((newState: IValueChangeParams, prevState: IValueChangeParams, userInput: string): IValueChangeParams => {
		const returnedState = {
			value: newState.value,
			selection: newState.selection,
		};
		if (newState.value === prevState.value || !userInput) return returnedState;
		const vs = newState.value.split('.').map(n => !Number.isNaN(Number(n)) ? n : null);
		const [d, m, y] = vs;
		const day = getValidationDay(d, m, y);
		const month = getValidationMonth(d, m, y);
		const year = getValidationYear(d, m, y);
		const dd = [day, month, year].join(divider);
		const isValid = moment([day, month, year].join(divider), mask, true).isValid();

		const isOver = dd.length === mask.length;

		if (isOver && !isValid) return prevState;
		const ddd = moment(dd, mask);
		if (isOver && isValid) onChange?.(ddd.toDate());
		return {
			...returnedState,
			value: [day, month, year].join(divider),
		};
	}, [onChange]);

	const handleFocus = useCallback(({ target }: FocusEvent<HTMLInputElement>) => {
		const caretPosEnd = target.value?.length || 1;
		target?.setSelectionRange(caretPosEnd, caretPosEnd);
	}, []);

	const handleBlur = useCallback(({ target }: FocusEvent<HTMLInputElement>) => {
		const date = moment(currentState, mask, true);
		if(!date.isValid()) return;
		onChange?.(date.toDate());
		target.blur();
	}, [currentState, onChange]);

	useEffect(() => {
		const v = moment(value).format(mask);
		setCurrentState(v);
	}, [value]);

	useEffect(() => {
		if (active) {
			inputRef?.current?.focus();
		} else {
			inputRef?.current?.blur();
		}
	}, [inputRef, active]);

	return (
		<DateInputMastStyled
			mask={mask}
			value={currentState}
			maskChar={' '}
			onChange={handleChange}
			alwaysShowMask={false}
			formatChars={formatChars}
			beforeMaskedValueChange={beforeMaskedValueChange}
		>
			{(params) => (
				<Stack
					direction="row"
					spacing={0}
				>
					<DateInputStyled
						type="tel"
						inputRef={inputRef} {...params}
						active={active}
						onFocus={handleFocus}
						onBlur={handleBlur}
					>
						<Typography>params</Typography>
					</DateInputStyled>
				</Stack>
			)}
		</DateInputMastStyled>
	);
};

export default memo(DateInput);
