import renderEvents from "./components.js";
import { HttpClient } from "./dev_modules/http/HttpClient.js";
import { HttpCache } from "./dev_modules/http/HttpCache.js";
import { GoogleApisCalendarMock } from "./dev_modules/mock/GoogleApisCalendarMock.js";
import { Url } from "./dev_modules/http/Url.js";
import { ISODate } from "./dev_modules/date/ISODate.js";
export { init, Events };




function queryByDateRange(start = null, end = null) {
    // built-ins
    let calendarId = "events@thebierelibrary.com";
    let url = "https://www.googleapis.com/calendar/v3/calendars/" + calendarId + "/event?fu=bar";
    url = new Url(url);
    //url = url + "?" + "timeMin=" + start + "&timeMax=" + end;
    url.buildQuery("timeMin", start);
    url.buildQuery("timeMax", end);
    url.buildQuery("TEST");

    return url.toString();

}
window.query = queryByDateRange;

//const cache = new HttpCache(testData);
const config = {};
const client = new HttpClient(config);

// Pretending what the current environment looks like for this machine/application.
const env = {
    today: "2023-06-30",
    season: "spring",
    weather: "mostly sunny",
    city: "Corvallis, OR",
    displayErrors: true, // We can imagine sceniors where we might *want to dipslay a message to the user.
};

class Events extends HTMLElement {

    startDate = null;
    endDate = null;

    constructor() {
        super();

        this.calendarId = this.getAttribute("calendar-id");

        if (this.calendarId == null) {
            console.error("No calendar ID specified.");
        }

        this.startDate = this.getAttribute("start-date") || env.today;
        this.endDate = this.getAttribute("end-date") || env.today;
    }
    
    // Called each time the element is appended to the window/another element
    async connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });

        const list = document.createElement("div");

        this.list = list;
        
        this.shadowRoot.append(list);

        let url = queryByDateRange(this.startDate, this.endDate);
        HttpClient.register("www.googleapis.com", new GoogleApisCalendarMock());

        const req = new Request(url);

        const resp = await client.send(req);
        //wasn't working like this so went back to old way temporarily 
        //await client.send(req)
        resp.json()
            .then(events => {

                if (events.error) {
                    throw new Error(events.message, { cause: events });
                }
                console.log(events);

                this.list.innerHTML = renderEvents(events).join("\n");
            })
            .catch(error => {
                // alert('Error: ' + error.message);
                console.error(error);
                if (env.displayErrors && error.cause.code == "RANGE_EMPTY") { // Might help the customer.
                    this.list.innerHTML = "Free to Register";
                }
            });
    }
    /*
    onEventClick() {
        let url = queryByDateRange(this.startDate, this.endDate);

        const eventsContainer = document.getElementById('events');
        const req = new Request(url);

        const resp = await client.send(req);
        //wasn't working like this so went back to old way temporarily 
        //await client.send(req)
        resp.json()
            .then(events => {

                if (events.error) {
                    throw new Error(events.message, { cause: events });
                }
                console.log(events);

                eventsContainer.innerHTML = renderEvents(events).join("\n");
            })
            .catch(error => {
                // alert('Error: ' + error.message);
                console.error(error);
                if (env.displayErrors && error.cause.code == "RANGE_EMPTY") { // Might help the customer.
                    eventsContainer.innerHTML = "Free to Register";
                }
            });
    }
    */


}

async function init() {
    let url = queryByDateRange("2023-07-01", "2023-07-15");
    const invalidUrl = queryByDateRange("2023-06-31", "2023-07-15");
    HttpClient.register("www.googleapis.com", new GoogleApisCalendarMock());

    let today = new ISODate(env.today);
    let tomorrow = today.addDays(1);

    /*
    let nextDate = new Date(env.today);
    nextDate.setDate(nextDate.getDate() + 1);
    nextDate = new ISODate(nextDate);
    */
    //let dateString = nextDate.getISODate();


    if (this.id == "button") {
        url = queryByDateRange(env.today, env.today);
    }

    if (this.id == "tomorrow") {
        url = queryByDateRange(env.today, tomorrow.getDate());
    }

    if (this.id == "min") {
        url = queryByDateRange("2023-07-01");
    }

    if (this.id == "max") {
        url = queryByDateRange(null, "2023-07-15");
    }

    if (this.id == "invalid") {
        url = invalidUrl;
    }
    const eventsContainer = document.getElementById('events');
    const req = new Request(url);

    const resp = await client.send(req);
    //wasn't working like this so went back to old way temporarily 
    //await client.send(req)
    resp.json()
        .then(events => {

            if (events.error) {
                throw new Error(events.message, { cause: events });
            }
            console.log(events);

            eventsContainer.innerHTML = renderEvents(events).join("\n");
        })
        .catch(error => {
            // alert('Error: ' + error.message);
            console.error(error);
            if (env.displayErrors && error.cause.code == "RANGE_EMPTY") { // Might help the customer.
                eventsContainer.innerHTML = "Free to Register";
            }
        });
}