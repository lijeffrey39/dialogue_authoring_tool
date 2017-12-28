# Dialogue Authoring Tool
Mockups: [(1)](https://drive.google.com/open?id=0B3ds3_lwLn5cRko5MXpoTGtyYmZ2M0pGd1V0RkwtUUMtUW1N) [(2)](https://drive.google.com/open?id=0B3ds3_lwLn5cdGhtc04xV0JmTUhXcFBrbTdpallzVDRSWUhZ) [(3)](https://drive.google.com/a/andrew.cmu.edu/file/d/0B5Ld76XPX3BHeEtnQkM1SmZhV1kwcGpvQVE0YWZDNVFWME9r/view?usp=sharing) [(final)](https://drive.google.com/open?id=0B3ds3_lwLn5cRTQ5cEpMQk5QeVVSYl9XWXhUb1VORnI5cXNN)

## Technologies and Frameworks
* HTML/CSS, Javascript
* React.js
* Firebase
* Materialize UI

## Install and Run Instructions
1. Clone project
2. Go on git branch "folders"
3. Go to the dialogue_authoring_tool folder
3. type "npm start" in terminal

## Current Features List
* View phase, task strategy, social strategy folders
* View utterances
* Add, modify, delete folders and utterances
* Edit name, date, author, phase, task strategy, social strategy, text, ssml of utterance

## Files
* folders.js: code for folders list (localhost and locahost/\*)
* utterances.js: code for utterance list (localhost/\*/\*)
* editor.js: code for editor (locahost/\*/\*/\*)
* fileMenu.js: unused search menu template
* App.js: main code for application
* fire.js: configuration for firebase
* intentAll_1Aug2017.csv: data in csv
* csvToJson.py: changes intentAll_1Aug2017.csv to firebase json format
* data.json: output of csvToJson.py. Import it into firebase if you accidentally modify data.

## Wishlist
Priorities in (), 1 is highest.
* Folders
  + Drag around items (3)
  + Sort by headers (3)
  + Edit names inplace instead of in a modal (3)
  + Copy and paste items (3)
* Search
  + Search by anything in sidebar (1)
  + Filter by phase, task strategy, social strategy (2)
* Editor
  + SSML tools with break, rate, pitch, volume, emphasis (2)
  + Text to Speech (1)
  + Drag and drop hints as material ui chips (2)
  + Apply to all group edits (1)
* Structure
  + Group together like utterances by text (1)
  + Ability to have empty folders (3)
  + Untagged folder (1)

[Project Box](https://cmu.box.com/s/bksvdkoy27pxg2k0lm80stzrf0y5pgp6)
[Mendeley Group](https://www.mendeley.com/community/rapt-fall-2017-interns/)
