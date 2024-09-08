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

    public isBetweenOrEquals(d: TDateInput): boolean {
        return DateTime.isBetweenOrEquals(d, this.range.start, this.range.end);
    }

    public get humanRange(): [string, string] {
        const stringValues = Object.values(this.range).map((d) => {
            return moment(d).format('lll');
        });
        return stringValues as [string, string];
    }

    static of(start: number, end: number): DateTime {
        return new DateTime({ range: { start, end } });
    }

    static getDaysDiff(from: TDateInput, to: TDateInput): number {
        const mFrom = moment(from).startOf('day');
        const mTo = moment(to || moment().valueOf()).endOf('day');
        return mFrom.diff(mTo, 'day');
    }

    static isBetweenOrEquals(d: TDateInput, from: TDateInput): boolean;
    static isBetweenOrEquals(d: TDateInput, from: TDateInput, to: TDateInput): boolean;
    static isBetweenOrEquals(d: TDateInput, from: TDateInput, to?: TDateInput): boolean {
        const numFrom = typeof from === "number" ? from : moment(from).valueOf();
        const numTo = typeof to === "number" ? to : moment(to).valueOf();
        const momentDay = moment(d);
        return momentDay.isBetween(numFrom, numTo, null, '[]');
    }

    static getPrevPeriod(from: TDateInput, to: TDateInput): [number, number] {
        const daysDiff = Math.abs(DateTime.getDaysDiff(from, to));
        const prevFrom = moment(from).subtract(daysDiff, 'day').startOf('day').valueOf();
        const preTo = moment(from).startOf('d').valueOf();
        return [prevFrom, preTo];
    }
}