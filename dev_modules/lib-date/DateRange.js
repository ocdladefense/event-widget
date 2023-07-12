export { DateRange };
import { ISODate } from "./ISODate.js";


class DateRange {

    floor = null;
    ceiling = null;

    constructor(dateStart = null, dateEnd = null) {
        if (dateStart && dateEnd) {
            if (!ISODate.isValid(dateStart) || !ISODate.isValid(dateEnd)) {
                throw new RangeError("invalid date range", { cause: "INVALID_RANGE" });
            }
            this.floor = dateStart;
            this.ceiling = dateEnd;
        }
    }

    setFloor(floor) {
        this.floor = floor;
    }

    setCeiling(ceiling) {
        this.ceiling = ceiling;
    }

    static newFromFloor(floor) {
        let range = new DateRange();
        range.setFloor(floor);
        return range;
    }

    static newFromCeiling(ceiling) {
        let range = new DateRange();
        range.setCeiling(ceiling);
        return range;
    }

    isWithinRange(eventStart, eventEnd) {
        return (this.floor <= eventStart && eventStart <= this.ceiling) || (this.floor <= eventEnd && eventEnd <= this.ceiling);
    }


}