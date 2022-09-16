const {
    CommandInteraction,
    SlashCommandBuilder
} = require("discord.js");

const BaseCommand = require("../structures/BaseCommand");

module.exports = class PingCommand extends BaseCommand {
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