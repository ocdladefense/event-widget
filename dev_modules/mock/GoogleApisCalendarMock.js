import { HttpMock } from "../http/HttpMock.js";
import { Url } from "../http/Url.js";
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

let event3 = {
    'summary': 'Fun Saturdays',
    'location': 'Grass',
    'description': 'Touching grass with friends',
    'start': {
        'date': '2023-07-01',
        'timeZone': 'America/Los_Angeles'
    },
    'end': {
        'date': '2023-07-01',
        'timeZone': 'America/Los_Angeles'
    },
    'attendees': [
        { 'email': 'intern@gmail.com' },
        { 'email': 'king1@middleearth.com' },
        { 'email': 'intern2@gmail.com' }
    ],
    'reminders': {
        'useDefault': true
    }
};


const events = [event1, event2, event3];

class GoogleApisCalendarMock extends HttpMock {
    //https://www.googleapis.com/calendar/v3/calendars/biere-library@thebierelibrary.com/events?timeMin=2023-07-01&timeMax=2023=07-15&test
    errors = {
        'success': false,
        'error': 'Invalid date range'
    };

    //gotta go through the data with the given timemin and timemax, if event start/end falls within either time then include 
    //event in a new object
    getResponse(req) {
        let url = new Url(req.url);
        let data = [];
        //pretend we have parsed the url
        let query = url.parseQueryString();
        //find the events or error that corresponds to timeMin and timeMax
        let start = new Date(query.timeMin);
        let end = new Date(query.timeMax);

        data = this.filterEvents(start, end);

        return Response.json(data);
    }

    filterEvents(timeMin, timeMax) {
        let data = []

        for (var i = 0; i < events.length; i++) {
            // these variables should eventually be a separate function to process localization
            // ternary to check if dateTime exists; if exists, get the year-month-day part of the string. if not, get normal date.
            let start = new Date( (events[i].start.dateTime) ? events[i].start.dateTime.substring(0, 10) : events[i].start.date );
            let end = new Date( (events[i].end.dateTime) ? events[i].end.dateTime.substring(0, 10) : events[i].end.date );
            
            if ((timeMax >= start && start >= timeMin) || (timeMax >= end && end >= timeMin)) {
                data.push(events[i]);
            }
        }
        
        return data;
    }

    
}
