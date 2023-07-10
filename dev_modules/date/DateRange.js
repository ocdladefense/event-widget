export { DateRange };
import { ISODate } from "./ISODate.js";


class DateRange {

    dateStart = null;
    dateEnd = null;

    constructor(dateStart, dateEnd) {
        ISODate.isValid(dateStart);
        ISODate.isValid(dateEnd);
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
    }

    isWithinRange(eventStart, eventEnd) {
        return (this.dateStart <= eventStart && eventStart <= this.dateEnd) || (this.dateStart <= eventEnd && eventEnd <= this.dateEnd);
    }
}