import { ISODate } from "./dev_modules/date/Date.js";

export default renderEvents;

function renderEvents(data) {
    return data.map(renderEvent); // This is how we pass an identifier to map().
}

function renderEvent(event, index) {
    let startDate = (event.start.date ? new ISODate(event.start.date) : new ISODate(event.start.dateTime))
    let endDate = (event.start.date ? new ISODate(event.start.date) : new ISODate(event.start.dateTime));
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