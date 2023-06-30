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
let errors = {
    'success': false,
    'error': 'Invalid date range'
};

const events = [event1, event2];



const cache = {
    "https://www.googleapis.com/calendar/v3/calendars/biere-library@thebierelibrary.com/events?timeMin=2023-07-01&timeMax=2023-07-15": events,
    "https://www.googleapis.com/calendar/v3/calendars/biere-library@thebierelibrary.com/events?timeMin=2023-06-31&timeMax=2023-07-15": errors
};



export { cache };