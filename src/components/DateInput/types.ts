export interface IValueChangeParams {
	value: string;
	selection?: {
		start: number;
		end: number;
	}
}

export interface IDateInputProps {
	value: number | string | Date;
	onChange?: (date: Date) => void;
	active?: boolean;
}
