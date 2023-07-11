export { ISODate };

class ISODate {
    OPTIONS = { year: "numeric", month: "long", day: "2-digit", hour: "numeric", minute: "numeric", hc: "h12" }
    DATEOPTIONS = { year: "numeric", month: "long", day: "2-digit", timeZone: "UTC" }
    FULLDATEOPTIONS = { year: "numeric", month: "2-digit", day: "2-digit", timeZone: "UTC" }

    date = null;

    constructor(datetime) {
        ISODate.isValid(datetime);
        this.date = new Date(datetime);

    }

    static isValid(date) {
        // is date a string?
        if (!(typeof date == "string")) {
            date = ISODate.dateToString(date);
        }
        let daysInMonth = {
            1: 31,
            2: 28,
            3: 31,
            4: 30,
            5: 31,
            6: 30,
            7: 31,
            8: 31,
            9: 30,
            10: 31,
            11: 30,
            12: 31
        };
        //example date 2023-07-01
        let parts = date.split("-");
        let month = parts[1];
        month = parseInt(month);
        let day = parts[2];
        day = parseInt(day);
        return day <= daysInMonth[month];
    }

    getFullDate() {
        return this.date;
    }

    getFullPrettyDate() {
        return new Date(this.date).toLocaleDateString("en-US", this.OPTIONS);
    }

    getPrettyDate() {
        return new Date(this.date).toLocaleDateString("en-US", this.DATEOPTIONS);
    }

    getDate() {
        let isoString = this.date.toISOString().split("T");
        return isoString[0];
    }

    static dateToString(date) {
        let isoString = date.toISOString().split("T");
        return isoString[0];
    }

    isAfter(datetime) {
        return (max >= start && start >= min);
    }

    isBefore(datetime) {
        return (max >= end && end >= min)
    }

    eventDate(event) {
        return (event.start.date ? this.getPrettyDate() : this.getFullPrettyDate());
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