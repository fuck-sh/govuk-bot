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

        const { commandName } = interaction;

        let command = client.commands.get(commandName);
        let interactionSubcommand;

        try {
            interactionSubcommand = interaction.options.getSubcommand();
        } catch (_) { }

        if (interactionSubcommand) command = client.subcommands.get(`${commandName}/${interactionSubcommand}`);
        if (!command) return;

        try {
            await command.run(interaction, interaction.options);
        } catch (error) {
            console.error(error);

            await interactionSafeReply(interaction, {
                content: "There was an error while executing this command!",
                ephemeral: true
            })
        }
    }
}