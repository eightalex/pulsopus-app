import moment, { MomentInput } from "moment";

export type TDateInput = MomentInput;

export class DateTime {
    // @ts-expect-error no initialize ts exception ??
    public readonly range: { start: number; end: number; };
    private constructor(partial: Partial<DateTime>) {
        const range = {
            start: moment().startOf('day').valueOf(),
            end: moment().endOf('day').valueOf(),
        };
        Object.assign(this, { range }, partial);
    }

    static of(start: number, end: number): DateTime {
        return new DateTime({ range: { start, end } });
    }

    public isBetweenOrEquals(d: TDateInput): boolean {
        return DateTime.isBetweenOrEquals(d, this.range.start, this.range.end);
    }

    static getDaysDiff(from: TDateInput, to: TDateInput): number {
        const mFrom = moment(from).startOf('day');
        const mTo = moment(to || moment().valueOf()).endOf('day');
        return mFrom.diff(mTo, 'day');
    }

    static isBetweenOrEquals(d: TDateInput, from: TDateInput): boolean;
    static isBetweenOrEquals(d: TDateInput, from: TDateInput, to: TDateInput): boolean;
    static isBetweenOrEquals(d: TDateInput, from: TDateInput, to?: TDateInput): boolean {
        const mFrom = moment(from).startOf('day').valueOf();
        const mTo = moment(to || moment().valueOf()).endOf('day').valueOf();
        const mD = moment(Number.isNaN(d) ? d : Number(d)).valueOf();
        return moment(mD).isBetween(mFrom, mTo, null, '[]');
    }

    static getPrevPeriod(from: TDateInput, to: TDateInput): [number, number] {
        const mFrom = moment(from).startOf('day');
        const mTo = moment(to || moment().valueOf()).endOf('day');
        const daysDiff = Math.abs(DateTime.getDaysDiff(from, to));
        const prevFrom = mFrom.subtract(daysDiff, 'day').startOf('day').valueOf();
        const preTo = mTo.startOf('day').valueOf();
        return [prevFrom, preTo];
    }
}