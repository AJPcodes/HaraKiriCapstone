#AJP Codes NSS Capstone

This is a student project for Nashville Software School (NSS)
The goal was to write an app that emulates the card game 'HaraKiri' using Angular, Node.js, Express, Socket.io, and CSS animations.
This project was the capstone to my front-end module at NSS, so you will notice the majority of the game logic is handled on the client-side. 

Thanks for stopping by and feel free to fork it and play around (instructions below) 
Alternatively, check out the deployed app on Heroku

http://harakiri-cards.heroku.com

## Set Up
```
# clone the repo
git clone https://github.com/AJPcodes/HaraKiriCapstone
cd HaraKiriCapstone

# install node dependencies
npm install

# instal bower dependencies
cd src/public
bower install

# view the app
# Note: to develop, see instructions below
from the root directory:
node src/app.js
```

## Developing
```
# make sure you have some popular node tools installed
npm install -g nodemon

# have nodemon run the app in one terminal tab
# nodemon will watch for file changes in the express app
# and restart the server
from the root directory:
nodemon src/app.js

# run the debugger in another terminal
# node-inspector will break the application when a break point
# or `debugger` statement is reached in the JavaScript
node-inspector
```
