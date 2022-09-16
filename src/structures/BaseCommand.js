const { SlashCommandBuilder } = require("discord.js");

class BaseCommand {
    /**
     * 
     * @param {object} opt
     * @param {SlashCommandBuilder} opt.options 
     */
    constructor({ options }) {
        this.options = options;
    }

    toJSON() {
        return this.options.toJSON();
    }

    async run() {
        throw new Error("command.run was not implemented")
    }
}

module.exports = BaseCommand;