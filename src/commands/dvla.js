const {
    CommandInteraction,
    SlashCommandBuilder
} = require("discord.js");

const BaseCommand = require("../structures/BaseCommand");

module.exports = class DvlaCommand extends BaseCommand {
    constructor() {
        super({
            options: new SlashCommandBuilder()
                .setName("dvla")
                .setDescription("interact with the dvla endpoint")

                .addSubcommand(input => input.setName("ves")
                    .setDescription("VES - Vehicle Enquiry Services")
                    .addStringOption(option => option.setName("license-plate")
                        .setDescription("License Plate")
                        .setRequired(true)))
        })
    }

    /**
     * 
     * @param {CommandInteraction} interaction 
     */

    async run(interaction) {
        return await interaction.reply({
            content: "Interact with the DVLA API",
            ephemeral: true
        });
    }
}