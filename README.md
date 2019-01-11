node-red-contrib-nexmo
===========================

<a href="http://nodered.org" target="_new">Node-RED</a> nodes for Nexmo APis

## Features

- Voice API - Make and receive calls, use text to speech, recording, and DTMF input, forward calls to other destinations
- SMS - Send and receive SMS globally
- Verify - Verify a phone number with SMS and voice fallback
- Number Insight - Get details and formatting of phone numbers

## Installation

While this version (3.0) is in beta it is reccomended to install directly from the npm command line, once we exit beta and publish to NPM it will appear as Nexmo within the Node Red pallete.

for now you can install by running the following command from your node-red home directorys (eg `~/.node-red`)
`npm install git+https://git@github.com/nexmo/nexmo-nodered.git`

## Account Setup
The first time you use a node you will need to create nexmo authentication parameters.
The SMS, Insight and Verify Nodes simply use your nexmo api key and secret.

The voice API uses a concept of Applications authenticated with JWT's generated by a private key. This is a little more complex to setup but we've tried to make it as easy as possible in node-red.
![Gif of creating a voice app](https://static.nexmodev.com/nodered-voiceapp.gif)
