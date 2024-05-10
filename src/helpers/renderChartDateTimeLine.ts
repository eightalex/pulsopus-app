import {
	AXIS_BOTTOM_RENDER_LIMIT,
	AXIS_BOTTOM_RENDER_LIMIT_MAX,
	AXIS_BOTTOM_RENDER_LIMIT_MIN
} from '@/constants/chart';
import * as d3 from 'd3';
import moment from 'moment';

const getDiffByType = (from, to, type): number => Math.abs(moment(to).endOf('day').diff(moment(from).startOf('day'), type, true));

const distributeValues = (array: number[], length = AXIS_BOTTOM_RENDER_LIMIT_MAX): number[] => {
	if (array.length % 2 !== 0) {
		return array.reduce((acc, value, i) => {
			if (i % Math.ceil(array.length / length) !== 0) return acc;
			return [...acc, value];
		}, []);
	}

	const middleIndex = Math.floor(array.length / 2) + 1;
	const slicer = (arr, end) => {
		const newArr = arr.slice(0, end);
		return newArr.length % 2 === 0 ? slicer(arr, end - 1) : newArr;
	};
	const leftArray = slicer(array, middleIndex);
	const v1 = distributeValues(leftArray, Math.floor(length / 2));

	const rightArray = slicer([...array].reverse(), middleIndex - 1);
	const v2 = distributeValues(rightArray, v1.length).reverse();

	if(array.length > AXIS_BOTTOM_RENDER_LIMIT_MAX) {
		return [...v1, ...v2].reduce((acc, el, i, arr) => {
			const currIndex = array.findIndex((v) => v === el);
			const nextIndex = array.findIndex((v) => v === arr[i + 1]);
			if (!nextIndex || nextIndex < 0) return [...acc, el];
			if (nextIndex - currIndex <= 1) return acc;
			return [...acc, el];
		}, []);
	}
	return [...v1, ...v2];
};

const renderDayLabels = (value, count: number) => {
	let format: string;
	switch (true) {
		case count <= AXIS_BOTTOM_RENDER_LIMIT_MIN:
			format = 'ddd DD MMM';
			break;
		case count <= AXIS_BOTTOM_RENDER_LIMIT:
			format = 'DD MMM';
			break;
		default:
			format = 'DD.MM';
	}
	return { value, title: moment(value).format(format) };
};

const renderMonthLabels = (value, diff: number) => {
	let format: string;
	switch (true) {
		case diff <= AXIS_BOTTOM_RENDER_LIMIT_MIN:
			format = 'MMM YY';
			break;
		case diff <= AXIS_BOTTOM_RENDER_LIMIT:
			format = 'MMM YY';
			break;
		default:
			format = 'MMM YY';
	}
	return { value, title: moment(value).format(format) };
};

const renderQuarterLabels = (value, count: number) => {
	const yearForm = count <= 9 ? 'YYYY' : 'YY';
	return { value, title: `Q${moment(value).quarter()}-${moment(value).format(yearForm)}` };
};

const renderYearLabels = (value, count: number) => {
	const yearForm = count <= 15 ? 'YYYY' : 'YY';
	return { value, title: moment(value).format(yearForm) };
};

const DIFF_MONTH_RENDER_LIMIT = 6;
const DIFF_QUATER_YEAR_RENDER_LIMIT = 2;
const DIFF_YEAR_RENDER_LIMIT = 4;

export const renderDateTimeLine = (values: number[]): { value: number, title: string }[] => {
	const [from, to] = d3.extent(values, (d) => d);
	const diffDay = getDiffByType(from, to, 'day');
	const diffMonth = getDiffByType(from, to, 'month');
	const diffQuarter = getDiffByType(from, to, 'quarter');
	const diffYear = getDiffByType(from, to, 'year');

	const isDaysMinRender = diffDay <= AXIS_BOTTOM_RENDER_LIMIT_MAX;
	const isDaysMaxRender = diffMonth < DIFF_MONTH_RENDER_LIMIT;
	const isMonthRender = diffMonth >= DIFF_MONTH_RENDER_LIMIT && diffYear < DIFF_QUATER_YEAR_RENDER_LIMIT
	const isQuarterRender = diffYear >= DIFF_QUATER_YEAR_RENDER_LIMIT && diffYear <= DIFF_YEAR_RENDER_LIMIT;
	const isYearRender =diffYear > DIFF_YEAR_RENDER_LIMIT;

	if (isDaysMinRender) {
		return values.map((value) => renderDayLabels(value, diffDay));
	}

	if (isDaysMaxRender) {
		return distributeValues(values).map((value) => renderDayLabels(value, diffDay));
	}

	if (isMonthRender) {
		// TODO: create maper func with comparator
		const monthMap = values.reduce((acc, v) => {
			const t = moment(v).startOf('month').format('MMM YY');
			const vs = acc.get(t) || [];
			vs.push(v);
			if (!vs.length) return acc;
			acc.set(t, vs);
			return acc;
		}, new Map<string, number[]>());
		const vs = Array
			.from(monthMap, ([_, v], i) => {
				// if (!i) return v[0];
				if(monthMap.size > 12 && i === monthMap.size - 1) return v[v.length - 1];
				return v[Math.floor(v.length / 2)];
			})
			.filter(item => Boolean(item));
		if(vs.length <= 12) return vs.map((value) => renderMonthLabels(value, diffMonth));
		return distributeValues(vs).map((value) => renderMonthLabels(value, diffMonth));
	}

	if(isQuarterRender) {
		// TODO: create maper func with comparator
		const quoterMap = values.reduce((acc, v) => {
			const t = `Q${moment(v).quarter()}-${moment(v).format('YYYY')}`
			const vs = acc.get(t) || [];
			vs.push(v);
			if (!vs.length) return acc;
			acc.set(t, vs);
			return acc;
		}, new Map<string, number[]>());
		const vs = Array
			.from(quoterMap, ([_, v], i) => {
				if (!i) return v[0];
				if (i === quoterMap.size - 1) return v[v.length - 1];
				return v[Math.floor(v.length / 2)];
			})
			.filter(item => Boolean(item));
		return distributeValues(vs).map((value, _, arr) => renderQuarterLabels(value, arr.length));
	}

	if(isYearRender) {
		// TODO: create maper func with comparator
		const yearMap = values.reduce((acc, v) => {
			const t = moment(v).startOf('year').format('YYYY');
			const vs = acc.get(t) || [];
			vs.push(v);
			if (!vs.length) return acc;
			acc.set(t, vs);
			return acc;
		}, new Map<string, number[]>());
		const vs = Array
			.from(yearMap, ([_, v], i) => {
				if (!i) return v[0];
				if (i === yearMap.size - 1) return v[v.length - 1];
				return v[Math.floor(v.length / 2)];
			})
			.filter(item => Boolean(item));
		return distributeValues(vs).map((value, _, arr) => renderYearLabels(value, arr.length));
	}
};
