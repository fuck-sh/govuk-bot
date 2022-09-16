const {
    Client,
    Embed,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    CommandInteraction,
    InteractionCollector,
    ComponentType
} = require("discord.js");

const interactionSafeReply = require("../utils/interactionSafeReply");

module.exports = class PageBuilder {
    /**
     * 
     * @param {Client} client 
     * @param {Embed[]} pages
     */
    constructor(client, pages) {
        this.client = client;

        this.data = pages;
        this.currentPage = null;

        this.row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("previous")
                    .setEmoji("⬅️")
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId("next")
                    .setEmoji("➡️")
                    .setStyle(ButtonStyle.Secondary),
            )
    }

    getCurrentPage(number) {
        this.currentPage = number;
        let currentPage = this.data[number];

        this.row.components.find(component => component.data.custom_id === "previous").setDisabled(number === 0);
        this.row.components.find(component => component.data.custom_id === "next").setDisabled(number === this.data.length - 1);

        return {
            embeds: [currentPage],
            components: [this.row]
        }
    }

    async start({ interaction, timeout = 60000 }) {
        if (!this.data || this.data.length === 0) {
            const embed = new EmbedBuilder()
                .setDescription(`Sorry, there was a problem whilst trying to display the page.`)

            return await interactionSafeReply(interaction, {
                embeds: [embed]
            });
        }

        let message = await interactionSafeReply(interaction, {
            ...this.getCurrentPage(0),
            fetchReply: true
        });

        const filter = (i) => {
            return i.user.id === interaction.user.id;
        }

        const collector = message.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: timeout,
            filter: filter
        })

        collector.on("collect", i => this.onClicked(i, collector));
        collector.on("end", () => this.onEnded(interaction));
    }

    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {InteractionCollector} collector 
     */

    async onClicked(interaction, collector) {
        if (interaction.customId === "previous") {
            if (this.currentPage === 0) {
                await interaction.deferUpdate();
                return;
            }
            await interaction.update(this.getCurrentPage(this.currentPage - 1));
        } else if (interaction.customId === "next") {
            if (this.currentPage === this.data.length - 1) {
                await interaction.deferUpdate();
                return;
            }
            await interaction.update(this.getCurrentPage(this.currentPage + 1));
        }
    }
}