export const PERIOD_RANGE_SEPARATOR = ';';
export const PERIOD_VALUES_SEPARATOR = ':';

const RS = PERIOD_RANGE_SEPARATOR;
const VS = PERIOD_VALUES_SEPARATOR;

export const enum EPeriodTypes {
	CUSTOM = '',
	WEEK_1 = `week${VS}1${RS}week${VS}1`,
	DAY_10 = `day${VS}9${RS}day${VS}0`,
	MONTH_1 = `month${VS}1${RS}day${VS}0`,
	MONTH_3 = `month${VS}3${RS}day${VS}0`,
	MONTH_6 = `month${VS}6${RS}day${VS}0`,
	YEAR_1 = `year${VS}1${RS}day${VS}0`,
}

export const periodList = [
	{ label: 'last week', value: EPeriodTypes.WEEK_1 },
	{ label: '10 days', value: EPeriodTypes.DAY_10 },
	{ label: '1 month', value: EPeriodTypes.MONTH_1 },
	{ label: '3 month', value: EPeriodTypes.MONTH_3 },
	{ label: '6 month', value: EPeriodTypes.MONTH_6 },
	{ label: '1 year', value: EPeriodTypes.YEAR_1 },
	{ label: 'custom', value: EPeriodTypes.CUSTOM },
];

export const CALENDAR_DROPDOWN_TOP_OFFSET = 6;
