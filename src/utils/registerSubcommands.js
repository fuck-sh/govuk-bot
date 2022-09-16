const { Client } = require("discord.js");

const { join } = require("path");
const { readdir, lstat } = require("fs/promises");

/**
 * 
 * @param {Client} client 
 * @param {string} directory 
 */
module.exports = async function registerSubcommands(directory = "", array) {
    const filePath = join(__dirname, directory);
    const files = await readdir(filePath);

    if (!array) array = [];

    for (const file of files) {
        const stat = await lstat(join(filePath, file));

        if (stat.isDirectory()) {
            await registerSubcommands(join(directory, file), array);
        }

        if (file.endsWith(".js")) {
            const Command = require(join(filePath, file));
            const command = new Command();
            array.push(command);
        }
    }

    return array;
}