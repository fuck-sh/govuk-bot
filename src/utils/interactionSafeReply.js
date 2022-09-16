const {
    CommandInteraction,
    MessagePayload,
    WebhookMessageOptions
} = require("discord.js");

/**
 * 
 * @param {CommandInteraction} interaction 
 * @param {MessagePayload | WebhookMessageOptions} options 
 */
module.exports = async function interactionSafeReply(interaction, options) {
    if (interaction.replied || interaction.deferred) return await interaction.editReply(options);
    return await interaction.reply(options);
}