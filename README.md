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






