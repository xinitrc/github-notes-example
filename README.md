# github-notes-example
This is a implementation of the App in https://egghead.io/series/build-your-first-react-js-application in Angular 2. In addition it is an example for an Offline First App.

Please Note: This is mearly a example/demo for some techniques, it is not a productive app. 

## Install

After cloning: 

Install the necessary dependencies with:
 
npm install and bower install

After that

npm run tsc

should compile the Typescript files to Javascript and

npm start 

should start a local webserver on port 8081 showing the demo app


## Offline First

The offline first functionality can be seen in the NotesService

It instantiates a PouchDB instance in Browser and assumes a CouchDB running on the standard port on localhost to sync with

