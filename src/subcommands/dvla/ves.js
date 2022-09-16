const { CommandInteraction } = require("discord.js");

const BaseSubcommand = require("../../structures/BaseSubcommand");

module.exports = class DVLAVesCommand extends BaseSubcommand {
    constructor() {
        super({
            command: "ves",
            group: "dvla"
        })
    }

    /**
     * 
     * @param {CommandInteraction} interaction 
     */

    async run(interaction) {
        return await interaction.reply({
            content: "test"
        });
    }
}