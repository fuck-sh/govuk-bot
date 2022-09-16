const { CommandInteraction, EmbedBuilder, CommandInteractionOptionResolver, Colors } = require("discord.js");
const { fetch } = require("undici");

const BaseSubcommand = require("../../structures/BaseSubcommand");
const PageBuilder = require("../../structures/PageBuilder");

const interactionSafeReply = require("../../utils/interactionSafeReply");
const seperateArray = require("../../utils/seperateArray");

module.exports = class PoliceListCommand extends BaseSubcommand {
    constructor() {
        super({
            command: "list",
            group: "police"
        })
    }

    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {CommandInteractionOptionResolver} options
     */

    async run(interaction, options) {
        await interaction.deferReply();

        const res = await fetch("https://data.police.uk/api/forces", {
            method: "GET"
        });

        const body = await res.json();

        if (!res.ok) {
            const embed = new EmbedBuilder()
                .setColor(Colors.Blue)
                .setDescription("There was a problem whilst interacting with the endpoint");

            return await interactionSafeReply(interaction, { embeds: [embed] });
        }

        let policeForces = seperateArray(body, 8);
        let embeds = [];

        for (const section of policeForces) {
            let str = "";

            for (const policeForce of section) {
                str += `**${policeForce.name}** ─ \`${policeForce.id}\`\n`
            }

            const embed = new EmbedBuilder()
                .setTitle("List of Police Forces")
                .setDescription(str.trim())

            embeds.push(embed);
        }

        const page = new PageBuilder(interaction.client, embeds);
        return await page.start({ interaction: interaction });
    }
}