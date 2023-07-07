export { DateRange };

class DateRange {

    dateStart = null;
    dateEnd = null;

    constructor(dateStart, dateEnd) {
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
    }

    isWithinRange(eventStart, eventEnd) {
        return (this.dateStart <= eventStart && eventStart <= this.dateEnd) || (this.dateStart <= eventEnd && eventEnd <= this.dateEnd);
    }
}