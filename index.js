const tmi = require('tmi.js');

const client = new tmi.Client({
	channels: [ 'metadevgirl' ]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
	console.log(`${tags['display-name']}: ${message}`);
});