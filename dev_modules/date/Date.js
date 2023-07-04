export { ISODate };

class ISODate {
    OPTIONS = { year: "numeric", month: "long", day: "2-digit", hour: "numeric", minute: "numeric", hc: "h12" }
    DATEOPTIONS = { year: "numeric", month: "long", day: "2-digit", timeZone: "UTC" }
    FULLDATEOPTIONS = { year: "numeric", month: "2-digit", day: "2-digit", timeZone: "UTC" }

    date = null;

    constructor(datetime) {
        this.date = new Date(datetime);
    }

    getFullDate() {
        return this.date;
    }

    getFullPrettyDate() {
        return this.date.toLocaleDateString("en-US", OPTIONS);
    }

    getPrettyDate() {
        return this.date.toLocaleDateString("en-US", DATEOPTIONS);
    }

    getDate() {
        let isoString = this.date.toISOString().split("T");
        return isoString[0];
    }

    isAfter(datetime) {
        return (max >= start && start >= min);
    }

    isBefore(datetime) {
        return (max >= end && end >= min)
    }

    addDays(days) {
        let newDate = new Date(this.date);
        newDate.setDate(newDate.getDate() + days);
        return new ISODate(newDate);
    }

    __eq__(other) {
        return this.date == other.date;
    }
}