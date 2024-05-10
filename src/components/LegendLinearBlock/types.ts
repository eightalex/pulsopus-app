export const enum EILegendLinearBlockVariant {
	HORIZONTAL,
	VERTICAL,
}

export const enum EILegendLinearBlockSize {
	SMALL,
	MEDIUM,
}

export interface ILegendLinearBlockProps {
	variant?: EILegendLinearBlockVariant;
	size?: EILegendLinearBlockSize;
	options: string[];
}
