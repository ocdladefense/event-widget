export default renderEvents;

function renderEvents(data) {
        return data.map(renderEvent); // This is how we pass an identifier to map().
}

function renderEvent(event, index) {
    const OPTIONS = { year: "numeric", month: "long", day: "2-digit", hour: "numeric", minute: "numeric", hc: "h12" }
    const DATEOPTIONS = { year: "numeric", month: "long", day: "2-digit", timeZone: "UTC" }
    let startDate;
    let endDate;
    if (event.start.date) {
        startDate = event.start.date;
        endDate = event.end.date;
        startDate = new Date(event.start.date).toLocaleDateString("en-US", DATEOPTIONS);
        endDate = new Date(event.end.date).toLocaleDateString("en-US", DATEOPTIONS);
    }
    else {
        startDate = event.start.dateTime;
        endDate = event.end.dateTime;
        startDate = new Date(event.start.dateTime).toLocaleDateString("en-US", OPTIONS);
        endDate = new Date(event.end.dateTime).toLocaleDateString("en-US", OPTIONS);
    }
    return `<div key=${index}>
                    <h2>${event.summary}</h2>
                    <p>Location: ${event.location}</p>
                    <p>Description: ${event.description}</p>
                    <p>Start Date: ${startDate}</p>
                    <p>End Date: ${endDate}</p>
                </div>`;
}