import renderEvents from "./components.js";
import { errorMessage, events } from "./data.js";
export default Init;

function FetchEvents(invalid) {
    if (invalid) {
        return Response.json(errorMessage);
    }
    else
        return Response.json(events);
}

function Init() {
    const resp = FetchEvents(false);
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