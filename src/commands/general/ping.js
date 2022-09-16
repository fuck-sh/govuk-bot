const {
    CommandInteraction,
    SlashCommandBuilder
} = require("discord.js");

const Command = require("../../structures/Command");

module.exports = class PingCommand extends Command {
    constructor() {
        super({
            options: new SlashCommandBuilder()
                .setName("ping")
                .setDescription("pong")
        })
    }

    /**
     * 
     * @param {CommandInteraction} interaction 
     */

    async run(interaction) {
        return await interaction.reply({
            content: "Pong 🏓",
            ephemeral: true
        });
    }
}