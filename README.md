# Omamori App

Simple application to demonstrate connecting with PointClickCare.

## Getting Started

### Dependencies

- Node.js for running in development mode
- Docker should be installed before running the application in docker mode (experimental)

### Installing

- git clone https://omamori@bitbucket.org/omamori/omamori.git
- update server/config/credentials.js with your clientId and clientSecret
- update web/src/components/Landing.js with your clientId on line 15
- update web/package.json on line 36 and change 'server' to 'localhost'

### Executing program as a developer
Run the frontend (/web) and the backend (/server) in two different consoles

    cd web
    npm install
    npm run

The frontend will be running on localhost:3000

    cd server
    npm install
    npm run

The backend will be running on localhost:3443

Click on the Login button, you will be redirected to the partner login page. 

Use the credentials related to this app to login, and you will be redirected to the dashboard.

Once there you can select a facility and see the patients in it. Clicking on a patient will let you see patient details, as well as the upcoming calendar events.


### Apis used in this demo ###

This demo app uses a few different apis in order to show all this data, in chronological order of the above scenario

- **POST access token**. This call will return an access token to be used in subsequent calls. E.g. *POST https://connect.pointclickcare.com/auth/token*
- **GET UserInfo**. This api infers the user identity from the access token and returns details about the logged-in user. This is used to display the name in the banner. E.g. *GET https://connect.pointclickcare.com/auth/token*
- **GET Faclilities**, will return a list of available facilities to the logged in user. E.g. *GET  https://connect.pointclickcare.com/api/public/preview1/orgs/1504955269/facs*
- **GET PatientList**. Once a facility is selecter, returns the list of patients for that facility. E.g. *GET https://connect.pointclickcare.com/api/public/preview1/orgs/1504955269/patients?patientStatus=Current*
- **GET Patient**. This returns more details about a single patient. E.g. *GET https://connect.pointclickcare.com/api/public/preview1/orgs/1504955269/patients/279509*
- **GET CalendarOccurences**. This api returns calendar event occurences for a given patient. E.g. *GET https://connect.pointclickcare.com/api/public/preview1/orgs/1504955269/calendar-occurrences*
- **POST revoke access token**. When logging out, invalidate the access token. E.g. *POST https://connect.pointclickcare.com/auth/revoke*
