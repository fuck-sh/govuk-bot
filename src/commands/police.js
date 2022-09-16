const {
    CommandInteraction,
    SlashCommandBuilder
} = require("discord.js");

const BaseCommand = require("../structures/BaseCommand");

module.exports = class PoliceCommand extends BaseCommand {
    constructor() {
        super({
            options: new SlashCommandBuilder()
                .setName("police")
                .setDescription("interact with the police endpoint")

                .addSubcommand(input => input.setName("list")
                    .setDescription("A list of all the police forces available"))
        })
    }

    /**
     * 
     * @param {CommandInteraction} interaction 
     */

    async run(interaction) {
        return await interaction.reply({
            content: "Interact with the Police API",
            ephemeral: true
        });
    }
}