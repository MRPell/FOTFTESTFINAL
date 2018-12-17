Welcome to Matt Pell's interview test app!
This displays a featured broadcast and allows you to play it. The image and audio files are randomly assigned to broadcast
and stored in a mongo database. The page pulls 7 days of history of broadcasts and allows you to play any of them. Today's broadcast 
automatically loads, but can be switch by either clicking on the episode 'card' in the recent episodes section or by clicking the
back and forward arrows in the main area.

Instructions to run:

    Download the app files to a local directory on your computer.

    Make sure you have latest node and mongodb versions. Install them if not. I'm using Node v10.13.0 and Mongo 4.0.3

    Go to the root directory of the app, and in a command prompt type: npm install

    In a new terminal or command prompt window, navigate to wherever you keep MongoDB (for example: C:\mongo\bin) 
    and set the dbpath to data folder of the app: c:\appLocation\...\fotfBroadcastApp\data

    Command C:\mongo\bin\mongod --dbpath c:\testapp\fotfBroadcastApp\data

    Mongo db will fire up. Leave it running in the background while testing the app.

    Go back to the first terminal and run with: npm start



Notes: Only the main page fully functions. The archive and add broadcast page were only started but not finished due to time.
This app uses Node, Express, Mongodb, and pug templating engine. I also used HTML 5, CSS3 and ES6, so I can't say that it will be compatible
older browsers such as IE.






