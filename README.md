#AJP Codes NSS Capstone

This is a student project for Nashville Software School (NSS)
The goal is to write an app that plays the card game 'HaraKiri' using Express, Angular, Socket.io and Node.

By Allen Phelps


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
