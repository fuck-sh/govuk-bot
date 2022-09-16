const { SlashCommandBuilder } = require("discord.js");

class BaseSubcommand {
    /**
     * 
     * @param {object} opt
     * @param {string} opt.command
     * @param {string} opt.group 
     */
    constructor({ command, group }) {
        this.cmd = command;
        this.group = group;
    }

    toString() {
        return `${this.group}/${this.cmd}`
    }

    async run() {
        throw new Error("command.run was not implemented")
    }
}

module.exports = BaseSubcommand;