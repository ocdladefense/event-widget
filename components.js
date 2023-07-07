import { ISODate } from "./dev_modules/date/ISODate.js";

export default renderEvents;

function renderEvents(data) {
    return data.map(renderEvent); // This is how we pass an identifier to map().
}

function renderEvent(event, index) {
    let startDate = new ISODate(event.start.date ? event.start.date : event.start.dateTime)
    let endDate = new ISODate(event.end.date ? event.end.date : event.end.dateTime);
    startDate = startDate.eventDate(event);
    endDate = endDate.eventDate(event);

    return `<div key=${index}>
                    <h2>${event.summary}</h2>
                    <p>Location: ${event.location}</p>
                    <p>Description: ${event.description}</p>
                    <p>Start Date: ${startDate}</p>
                    <p>End Date: ${endDate}</p>
                </div>`;
}