export { DateRange };
import { ISODate } from "./ISODate.js";


class DateRange {

    dateStart = null;
    dateEnd = null;

    constructor(dateStart, dateEnd) {
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        // Date.isValid() // remember static method.
    }

    isWithinRange(eventStart, eventEnd) {
        return (this.dateStart <= eventStart && eventStart <= this.dateEnd) || (this.dateStart <= eventEnd && eventEnd <= this.dateEnd);
    }
}