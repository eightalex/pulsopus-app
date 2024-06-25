import { action, computed,makeObservable, observable, runInAction } from 'mobx';
import moment, { unitOfTime } from 'moment';
import { ICalendarRange } from '@/components/CalendarRangePicker';
import { CHART_SELECT_MIN_LENGTH } from "@/constants/chart.ts";
import { ICalendarRangeBase, IRootStore } from '@/interfaces';
import { BaseStore } from "@/stores/BaseStore.ts";
import { DateTime } from "@/utils";

export class CalendarRangeBase extends BaseStore implements ICalendarRangeBase {
	public calendarRange: Required<ICalendarRange>;

	constructor(rootStore: IRootStore) {
		super(rootStore);
		makeObservable(this, {
			calendarRange: observable,
			//
			rangeFrom: computed,
			rangeTo: computed,
			//
			getCalendarRangeDiff: action.bound,
			setCalendarRange: action.bound,
		});
		this.calendarRange = this.createDefaultValue();
	}

	// create default 1 month calendar period
	protected createDefaultValue(): Required<ICalendarRange> {
		const from = moment()
			.subtract(1, 'month')
			.startOf('day')
			.valueOf();
		const to = moment()
			.endOf('day')
			.valueOf();

		// return { from, to };

		const [testFrom, testTo] = ['01.09.2023', '01.12.2023']
			.map((d, i) => {
				const m =  moment(d, 'DD.MM.YYYY');
				const v = !i ? m.startOf('day') : m.endOf('day');
				return v.valueOf();
			});
		return { from: testFrom, to: testTo };
	}

	public get rangeFrom(): number {
		return this.calendarRange.from || moment('01.01.2000', 'DD.MM.YYYY').startOf('day').valueOf();
	}
	public get rangeTo(): number {
		return this.calendarRange.to || moment().endOf('day').valueOf();
	}

	public setCalendarRange(range: ICalendarRange, minDiffInDays: number = CHART_SELECT_MIN_LENGTH) {
		const { from, to } = range || {};
		if(!range || !from || !to) return;
		const diff = Math.abs(DateTime.getDaysDiff(range.from, range.to));
		const nextRange = range as Required<ICalendarRange>;
		if(diff < minDiffInDays) {
			const delta = Math.floor((minDiffInDays - diff) / 2);
			const deltaUnit = 'day';
			const mF = moment(from);
			const mT = moment(to);
			nextRange.from = mF.subtract(delta, deltaUnit).startOf(deltaUnit).valueOf();
			nextRange.to = mT.add(delta, deltaUnit).endOf(deltaUnit).valueOf();
		}
		runInAction(() => {
			this.calendarRange = nextRange;
		});
	}

	public getCalendarRangeDiff(unitTimeDiff: unitOfTime.Diff  = 'day'): number {
		const { from, to } = this.calendarRange;
		if(!from || !to) return 0;
		return Math.abs(moment(from).diff(to, unitTimeDiff));
	}

}
