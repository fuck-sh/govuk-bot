const { Client, Interaction } = require("discord.js");

const Event = require("../structures/Listener");
const interactionSafeReply = require("../utils/interactionSafeReply");

module.exports = class InteractionCreate extends Event {
    constructor() {
        super({ name: "interactionCreate" })
    }

    /**
     * 
     * @param {Client} client 
     * @param {Interaction} interaction 
     */
    async run(client, interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.run(interaction);
        } catch (error) {
            console.error(error);

            await interactionSafeReply(interaction, {
                content: "There was an error while executing this command!",
                ephemeral: true
            })
        }
    }
}