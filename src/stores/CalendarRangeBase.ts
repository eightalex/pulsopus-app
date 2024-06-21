import { action, makeObservable, observable, runInAction } from 'mobx';
import moment, { unitOfTime } from 'moment';
import { ICalendarRange } from '@/components/CalendarRangePicker';
import { ICalendarRangeBase, IRootStore } from '@/interfaces';
import { BaseStore } from "@/stores/BaseStore.ts";

export class CalendarRangeBase extends BaseStore implements ICalendarRangeBase {
	public calendarRange: Required<ICalendarRange>;

	constructor(rootStore: IRootStore) {
		super(rootStore);
		makeObservable(this, {
			calendarRange: observable,
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

	public setCalendarRange(range: ICalendarRange) {
		if(!range || !range.from || !range.to) return;
		runInAction(() => {
			this.calendarRange = range as Required<ICalendarRange>;
		});
	}

	public getCalendarRangeDiff(unitTimeDiff: unitOfTime.Diff  = 'day'): number {
		const { from, to } = this.calendarRange;
		if(!from || !to) return 0;
		return Math.abs(moment(from).diff(to, unitTimeDiff));
	}

}
