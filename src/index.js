require("dotenv").config();

const { GatewayIntentBits } = require("discord.js");
const Client = require("./structures/Client");

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.start();