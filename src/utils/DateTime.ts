import moment, { MomentInput } from "moment";

export type TDateInput = MomentInput;

export class DateTime {

    static isBetweenOrEquals(d: TDateInput, from: TDateInput): boolean;
    static isBetweenOrEquals(d: TDateInput, from: TDateInput, to: TDateInput): boolean;
    static isBetweenOrEquals(d: TDateInput, from: TDateInput, to?: TDateInput): boolean {
        const mFrom = moment(from).startOf('day').valueOf();
        const mTo = moment(to || moment().valueOf()).endOf('day').valueOf();
        const mD = moment(Number.isNaN(d) ? d : Number(d)).valueOf();
        return moment(mD).isBetween(mFrom, mTo, null, '[]');
    }
}