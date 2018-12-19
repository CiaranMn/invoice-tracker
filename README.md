# Invoice Tracker

### A web app to allow businesses to log and update invoices they have raised.

##
The application comes in two parts:
- A **frontend** application which acts as the interface for business customers, comprising a table for displaying, sorting and updating invoices, and a form for entering new invoices.
- A **backend** which saves, retrieves and updates data on invoices from a database in response to requests from the frontend application.


## Installation
### Backend
- The server expects a MongoDB server running on localhost:27017 - this can be changed in `backend/db/mongoose.js` - and will read and write to a db named "invoice_challenge"
- With a MongoDB server running, from the `backend/` directory run `yarn install && yarn start` or `npm install && npm start` to launch the server
- `yarn test` or `npm test` to run tests

### Frontend
- The frontend requires the backend to be running in order to access and write any data
- From the `frontend/` directory run `yarn install && yarn start` or `npm install && npm start` to launch the frontend app in development mode, or `serve -s build` to serve the public build locally
- `yarn test` or `npm test` to run tests

## Technologies and dependencies

- The application uses JavaScript throughout.
- The frontend is built in React. It uses react-datepicker for date entry, and whatwg-fetch and promise-polyfill for IE11 compatability.
- The frontend uses jest as test runner, with enzyme for React component testing, and relies on various babel transpilations for testing.
- The server is built in Node, and uses Mongoose to interact with a MongoDB database.
- The server uses mocha as test runner, with chai for assertions, sinon for stubbing db calls and supertest for testing http requests. 


