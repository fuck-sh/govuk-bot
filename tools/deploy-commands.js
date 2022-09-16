#!usr/bin/env node

require("dotenv").config();

const registerCommands = require("../src/utils/registerCommands");

const { Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");

(async () => {
    let commands = await registerCommands("../commands");
    commands = commands.map(cmd => cmd.toJSON());

    const token = process.env.TOKEN;
    const clientId = process.env.CLIENT_ID;
    const guildId = process.env.GUILD_ID;
    const shouldRefresh = process.env.SHOULD_REFRESH || false;

    const rest = new REST({ version: "10" }).setToken(token);

    if (shouldRefresh) {
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
            .then(() => console.log(`Successfully refreshed application commands.`))
            .catch(console.error);
    }

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
        .then((data) => console.log(`Successfully registered ${data.length} application commands.`))
        .catch(console.error);
})();