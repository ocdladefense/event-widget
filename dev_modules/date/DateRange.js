export { DateRange };
import { ISODate } from "./ISODate.js";


class DateRange {

    dateStart = null;
    dateEnd = null;

    constructor(dateStart = null, dateEnd = null) {
        if (dateStart != null) {
            ISODate.isValid(dateStart);
            this.dateStart = new Date(dateStart);
        }
        if (dateEnd != null) {
            ISODate.isValid(dateEnd);
            this.dateEnd = new Date(dateEnd);
        }
    }

    isWithinRange(eventStart, eventEnd) {
        if (this.dateStart == null) {
            return (eventStart <= this.dateEnd) || (eventEnd <= this.dateEnd);
        }
        if (this.dateEnd == null) {
            return (this.dateStart <= eventStart) || (this.dateStart <= eventEnd);
        }
        return (this.dateStart <= eventStart && eventStart <= this.dateEnd) || (this.dateStart <= eventEnd && eventEnd <= this.dateEnd);
    }


}