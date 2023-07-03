import renderEvents from "./components.js";
import { testData } from "./data.js";
import { HttpClient } from "./dev_modules/http/httpClient.js";
import { HttpCache } from "./dev_modules/http/httpCache.js";
import { GoogleApisCalendarMock } from "./dev_modules/http/httpMock.js";
export default init;
export { init };




function queryByDateRange(start, end) {

    // built-ins
    let calendarId = "biere-library@thebierelibrary.com";
    let url = "https://www.googleapis.com/calendar/v3/calendars/" + calendarId + "/events";

    url = url + "?" + "timeMin=" + start + "&timeMax=" + end;
    return url;

}


const cache = new HttpCache(testData);
const config = { cache: cache };
const client = new HttpClient(config);
client.register("www.googleapis.com", new GoogleApisCalendarMock(null));
const url = queryByDateRange("2023-07-01", "2023=07-15");
const invalidUrl = queryByDateRange("2023-06-31", "2023=07-15");
const req = new Request(url);

// Pretending what the current environment looks like for this machine/application.
const env = {
    today: "2023-06-30",
    season: "spring",
    weather: "mostly sunny",
    city: "Corvallis, OR"
};


async function init() {
    const resp = await client.send(req);
    // fetch(url);
    resp.json()
        .then(events => {
            if (events.error) {
                throw new Error(events.error);
            }
            console.log(events);
            const eventsContainer = document.getElementById('events');
            eventsContainer.innerHTML = renderEvents(events);
        })
        .catch(error => {
            alert('Error: ' + error.message);
            console.error('Error: ', error);
        });
}