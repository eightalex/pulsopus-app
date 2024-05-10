import moment from 'moment';

const BORDER_RADIUS = '4px';

const DAY_CLASSNAME = 'react-calendar__month-view__days__day';
const MONTH_CLASSNAME = 'react-calendar__year-view__months__month';
const YEAR_CLASSNAME = 'react-calendar__decade-view__years__year';

const roundedMatrixElements = <T extends HTMLElement>(map: Map<number, T[]>) => {
	const mx = Array.from(map).map(([_, els]) => els) as T[][];
	for (let y = 0; y < mx.length; y++) {
		for (let x = 0; x < mx[y].length; x++) {
			const row = mx[y].filter(el => !!el);
			const element = mx[y][x];
			if (!element) continue;
			const idx = row.findIndex((el) => el.isEqualNode(element));
			const isFirstOfRow = !idx || !mx[y][x - 1];
			const isLastOfRow = row.length - 1 === idx || !mx[y][x + 1] || x >= mx[y].length;
			const isFirstOfCol = !mx[y - 1]?.[x];
			const isLastOfCol = !mx[y + 1]?.[x];
			const isHasTopRight = !mx[y - 1]?.[x + 1];
			const isHasBottomLeft = !mx[y + 1]?.[x - 1];

			if (isFirstOfCol && isFirstOfRow) {
				element.style.borderTopLeftRadius = BORDER_RADIUS;
			}
			if (isFirstOfCol && isLastOfRow && isHasTopRight) {
				element.style.borderTopRightRadius = BORDER_RADIUS;
			}
			if (isLastOfCol && isFirstOfRow && isHasBottomLeft) {
				element.style.borderBottomLeftRadius = BORDER_RADIUS;
			}
			if (isLastOfCol && isLastOfRow) {
				element.style.borderBottomRightRadius = BORDER_RADIUS;
			}
		}
	}
};

const generateMatrixMap = <Wrapper extends HTMLElement, Element extends HTMLElement>(wrapper: Wrapper, classname: string): Map<number, Element[]> => {
	const list: Element[] = Array.from(wrapper.querySelectorAll(`.${classname}`));
	if (!list.length) return new Map();
	// const rs = Math.floor(Math.sqrt(list.length));
	// const cs = Math.ceil(list.length / rs);

	const cs = classname === DAY_CLASSNAME ? 7 : 3;

	const activeClasses = [
		'react-calendar__tile--active',
		'react-calendar__tile--hover',
		'react-calendar__tile--hoverEnd',
		'react-calendar__tile--hasActive',
	];

	return list.reduce((acc, el, idx) => {
		const findIndex = el.className.split(' ').findIndex(c => activeClasses.includes(c));
		const isHover = el.matches(':hover');
		const value = findIndex >= 0 || isHover ? el : null;
		const r = Math.floor(idx / cs);
		const c = idx % cs;
		const arr = acc.get(r) || Array(cs).fill(null);
		arr[c] = value;
		acc.set(r, arr);
		return acc;
	}, new Map<number, Element[]>);
};

const roundedDaysElements = (wrapper: HTMLDivElement) => {
	const map = generateMatrixMap(wrapper, DAY_CLASSNAME);
	if (!map.size) return;
	roundedMatrixElements(map);
};

const roundedMonthElements = (wrapper: HTMLDivElement) => {
	const map = generateMatrixMap<HTMLDivElement, HTMLButtonElement>(wrapper, MONTH_CLASSNAME);
	if (!map.size) return;
	roundedMatrixElements(map);
};

const roundedYearElements = (wrapper: HTMLDivElement) => {
	const map = generateMatrixMap<HTMLDivElement, HTMLButtonElement>(wrapper, YEAR_CLASSNAME);
	if (!map.size) return;
	roundedMatrixElements(map);
};

export const findAndRoundedActiveElements = (wrapper: HTMLDivElement | undefined) => {
	if (!wrapper) return;
	const clearClasses = [
		'react-calendar__month-view__days',
		'react-calendar__year-view__months',
		'react-calendar__decade-view__years',
	];
	const elmForClear = clearClasses.reduce((acc, c) => {
		const node = wrapper.querySelector(`.${c}`);
		const arr = node?.childNodes ? [...node.childNodes] : [];
		acc = [...acc, ...arr];
		return acc;
	}, []);

	elmForClear.forEach((element: HTMLButtonElement) => {
		element.style.borderTopRightRadius = '0';
		element.style.borderTopLeftRadius = '0';
		element.style.borderBottomRightRadius = '0';
		element.style.borderBottomLeftRadius = '0';
		element.style.borderRadius = '0px 0px 0px 0px';
	});

	roundedDaysElements(wrapper);
	roundedMonthElements(wrapper);
	roundedYearElements(wrapper);
};

const getHoveredElement = (wrapper: HTMLDivElement | undefined, classname: string): HTMLElement | undefined => {
	if (!wrapper) return;
	return [...wrapper.querySelectorAll(`.${classname}`)].find((el) => el.matches(':hover'));
};

export const getHoveredElementsValue = (wrapper: HTMLDivElement | undefined): Date | null => {
	if (!wrapper) return;

	const dayLabel = getHoveredElement(wrapper, DAY_CLASSNAME)?.children[0].getAttribute('aria-label');
	const day = dayLabel && moment(dayLabel).isValid() ? moment(dayLabel) : null;
	if (!day) return null;

	const monthLabel = getHoveredElement(wrapper, MONTH_CLASSNAME)?.children[0].getAttribute('aria-label');
	const monthValue = monthLabel ? moment(monthLabel).get('month') : day?.get('month');

	const yearLabel = getHoveredElement(wrapper, YEAR_CLASSNAME)?.innerText || moment().get('year');
	const yearValue = Number(yearLabel) || (day || moment())?.get('year') || 0

	return day
		.set({
			month: monthValue,
			year: yearValue,
		})
		.toDate();
};
