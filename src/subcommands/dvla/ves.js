const { CommandInteraction, EmbedBuilder, CommandInteractionOptionResolver } = require("discord.js");
const { fetch } = require("undici");

const BaseSubcommand = require("../../structures/BaseSubcommand");
const interactionSafeReply = require("../../utils/interactionSafeReply");

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
     * @param {CommandInteractionOptionResolver} options
     */

    async run(interaction, options) {
        const licensePlate = options.getString("license-plate");

        await interaction.deferReply();

        const res = await fetch("https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.DVLA_API_KEY
            },
            body: JSON.stringify({
                registrationNumber: licensePlate.trim()
            })
        });

        const body = await res.json();

        if (!res.ok) {
            const embed = new EmbedBuilder()
                .setTitle(body.errors[0].title)
                .setDescription(body.errors[0].detail);

            return await interactionSafeReply(interaction, { embeds: [embed] });
        }

        console.log(body);

        return await interactionSafeReply(interaction, { content: "success" });
    }
}