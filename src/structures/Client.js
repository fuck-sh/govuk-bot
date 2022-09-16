const { Client, ClientOptions } = require("discord.js");

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
    }

    /**
     * 
     * @returns Promise<string>
     */
    async start() {
        return await super.login(process.env.TOKEN);
    }
}