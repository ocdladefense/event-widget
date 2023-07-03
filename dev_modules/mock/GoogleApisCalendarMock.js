import { HttpMock } from "../http/HttpMock.js";
export { GoogleApisCalendarMock };

let event1 = {
    'summary': '4th of July',
    'location': 'Park',
    'description': 'Fireworks in the park!',
    'start': {
        'date': '2023-07-04'
    },
    'end': {
        'date': '2023-07-04'
    },
    'status': 'confirmed',
    'attendees': [
        { 'email': 'king1@middleearth.com' },
        { 'email': 'king2@middleearth.com' }
    ],
    'reminders': {
        'useDefault': true
    }
};
let event2 = {
    'summary': 'Intern Meeting',
    'location': 'Zoom',
    'description': 'Join in to talk about your internship',
    'start': {
        'dateTime': '2023-06-30T10:00:00-07:00',
        'timeZone': 'America/Los_Angeles'
    },
    'end': {
        'dateTime': '2023-06-30T12:00:00-07:00',
        'timeZone': 'America/Los_Angeles'
    },
    'attendees': [
        { 'email': 'intern@gmail.com' },
        { 'email': 'intern2@gmail.com' }
    ],
    'reminders': {
        'useDefault': true
    }
};


const events = [event1, event2];

class GoogleApisCalendarMock extends HttpMock {
    //https://www.googleapis.com/calendar/v3/calendars/biere-library@thebierelibrary.com/events?timeMin=2023-07-01&timeMax=2023=07-15&test
    errors = {
        'success': false,
        'error': 'Invalid date range'
    };

    getResponse(req) {
        let url = new Url(req.url);
        //pretend we have parsed the url
        let query = url.parseQueryString();
        //find the events or error that corresponds to timeMin and timeMax
        let start = query.timeMin;
        let end = query.timeMax;
        return Response.json(data);
    }
}
