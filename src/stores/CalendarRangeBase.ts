import { action, makeObservable, observable, runInAction } from 'mobx';
import moment from 'moment';
import { ICalendarRange } from '@/components/CalendarRangePicker';
import { ICalendarRangeBase, IRootStore } from '@/interfaces';
import { BaseStore } from "@/stores/BaseStore.ts";

export class CalendarRangeBase extends BaseStore implements ICalendarRangeBase {
	public calendarRange: Required<ICalendarRange>;

	constructor(rootStore: IRootStore) {
		super(rootStore);
		makeObservable(this, {
			calendarRange: observable,
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

		return { from, to };
	}

	public setCalendarRange(range: ICalendarRange) {
		if(!range || !range.from || !range.to) return;
		runInAction(() => {
			this.calendarRange = range as Required<ICalendarRange>;
		});
	}

}
