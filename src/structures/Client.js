const {
    Client,
    ClientOptions,
    Collection
} = require("discord.js");

const registerListeners = require("../utils/registerListeners");
const registerCommands = require("../utils/registerCommands");
const registerSubcommands = require("../utils/registerSubcommands");

module.exports = class ExtendedClient extends Client {
    /**
     * 
     * @param  {...ClientOptions} options 
     */
    constructor(...options) {
        super(...options);

        this.once("ready", () => {
            console.log(`Ready! ${this.user.tag}`);
        });

        this.commands = new Collection();
        this.subcommands = new Collection();
    }

    async runListeners() {
        let listeners = await registerListeners("../listeners");

        for (const listener of listeners) {
            this[(listener.once ? "once" : "on")](listener.name, (...args) => listener.run(this, ...args));
        }
    }

    async registerCommands() {
        let commands = await registerCommands("../commands");

        for (const command of commands) {
            this.commands.set(command.options.name, command);
        }
    }

    async registerSubcommands() {
        let subcommands = await registerSubcommands("../subcommands");

        for (const subcommand of subcommands) {
            this.subcommands.set(subcommand.toString(), subcommand);
        }
    }

    /**
     * 
     * @returns Promise<string>
     */
    async start() {
        await this.registerSubcommands();
        await this.registerCommands();
        await this.runListeners();
        return await super.login(process.env.TOKEN);
    }
}