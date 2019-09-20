# AuthAPI
A proof-of-concept authenticated API server powered by Express and PassportJS.

---
AuthAPI is a CRUD API which provides endpoints for reading, adding, modifying and removing some generic kind of data, called records.

There exist two types of users, writers and readers. An important aspect of this API is that only authorised users can make requests, with readers only being able to read records and writers having full access to them.

The backend that powers this API has been built using Express and a serious of library which are explain below.

**Authorisation**

To handle authorisation I used PassportJS, a library that add the ability to handle users and logins to an Express application.
It links with the user database in order to verify the users credentials. if it fails to do so, it returns a `401 Invalid credentials` error.


**Datastore**

For the data I used Nedb, a simple database package that I used in the past. It was good for this example, given the small size of the data, however it can be easily replaced with more sophisticated solutions. The data is stored inside the `data` folder.

**Routes**

Aside from the auth routes, there are five main API routes set up for this application. Each route has a number of middlewares. All API routes require the user to be authenticated. Routes which offer non-read-only endpoints also go through a authorisation middleware to check the authenticated user has the right permission to access them (i.e. is a writer). Finally, before a request can proceed to the controller, the input goes through a validation middleware to check that is valid and well-formed.

**Validation**

I employed `express-validator` to access methods that can validate a request input. The validation I implemented is pretty basic. Input records are checked against the type of their fields and IDs must be valid UUIDs. Further validation can be added depending on what constitutes a correct input.


**Controller**

The controller defines the actions that are performed at each endpoint. Controller methods access and make changes to the database and return the related results. The inputs that reach the controller come from validated and authorised requests.


**Testing**

The test suite that comes with this exercise comprises a series of system tests for authentication, authorisation, validation and correct handling of the API actions. There is a separate database for testing purposes under `tests/data`.


**Front end**

Being an API proof of concept, the focus did not revolve around the frontend. Nonetheless, the application offers an overview of the API endpoints as its homepage and provides a login screen to authenticate users.

---
### Running the application

First of all install the dependencies by running

```
npm install
```

At this point you can run the application with
```
npm start
```
The application will start on port `3000` by default, however this can be changed in the `.env` file provided.

### Running tests

Tests can be run on the application with the command
```
npm test
```

_
> Developer by James Reaver in September 2019.
