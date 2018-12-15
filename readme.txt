Welcome to Matt Pell's interview test app!
This is a single page app for viewing broadcasts. Broadcast data is made up.

Download the app files to a local directory on your computer.

Make sure you have latest node and mongodb versions.

Go to the root directory, and in a command prompt type: npm install

In a new terminal or command prompt window, navigate to wherever you keep MongoDB (for example: C:\mongo\bin) and type:

Command C:\mongo\bin\mongod --dbpath c:\testapp\fotfBroadcastApp\data

Mongo db will fire up. Leave it running in the background while testing the app.






console method for converting mongo db dates from strings to dates to make sorting easier
db.broadcastCollection.find({BroadcastAirDate: {$exists: true}}).forEach(function(obj) { obj.BroadcastAirDate = new Date(obj.BroadcastAirDate); db.broadcastCollection.save(obj);});