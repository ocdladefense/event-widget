import renderEvents from "../../components.js";
import { HttpClient } from "../http/HttpClient.js";
import { GoogleApisCalendarMock } from "../mock/GoogleApisCalendarMock.js";
import { Url } from "../http/Url.js";
import { ISODate } from "../date/ISODate.js";
export { Events };

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

        const config = {};
        const client = new HttpClient(config);

        let url = this.queryByDateRange(this.startDate, this.endDate);
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

    queryByDateRange(start = null, end = null) {
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


}