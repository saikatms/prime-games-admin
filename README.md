# admin-alliswell-app

An dashboard for All Is Well Pharmacy delivery application created with React, Redux-Saga and Firebase-Cloud-Firestore

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:3000/`.
The app will automatically reload if you change any of the source files.
<br/> <br/>
Login credentials are:
<br/> <br/>
Username: admin@alliswell.com
<br/>
Password: alliswell123

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `build/` directory.

## Use of security rules for CRUD on Firebase

condition <strong>create</strong>: `request.resource.data.uid == request.auth.uid`; <br/>
for files `request.resource.metadata.uid == request.auth.uid` <br/>
( if the sent uid is equal to the uid of the authenticated user )
<br/><br/>
condition <strong>update,delete,read</strong>: `resource.data.uid == request.auth.uid`; <br/>
for files `resource.metadata.uid == request.auth.uid` <br/>
( if the uid of the stored resource is equal to the uid of the authenticated user )
