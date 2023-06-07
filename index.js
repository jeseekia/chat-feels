require('dotenv').config()
const tmi = require('tmi.js');
const { MongoClient } = require("mongodb");

const uri = process.env.DB_CONNECTION_STRING;

async function run() {
  try {
    const mongoClient = new MongoClient(uri);
    await mongoClient.connect();
    const db = mongoClient.db("TwitchChat")
    const msgColl = db.collection("Messages")
    const dataColl = db.collection("MessageClassification")

    const tmiClient = new tmi.Client({
        channels: [ 'metadevgirl' ]
    });

    await tmiClient.connect();
    tmiClient.on('message', (channel, tags, message, self) => {
        console.log(`${tags['display-name']}: ${message}`);
        msgColl.insertOne({
            "message": message,
            "user": tags.username,
            "channel": channel,
            "timestamp": new Date(tags['tmi-sent-ts'])
        });
        dataColl.insertOne({
            "prompt": message,
            "completion": ""
        });
    });
  } catch (err) {
        console.error("Error:", err);
        process.exit(1);
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoClient.close();
  }
}
run().catch(console.dir);