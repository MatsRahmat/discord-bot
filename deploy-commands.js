require('dotenv').config()
const { REST, Routes } = require('discord.js')
const path = require('path');
const fs = require('fs')
const token = process.env.BOOT_TOKEN
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const commands = [];

const commandsPath = path.join(__dirname, 'commands');
const commandFile = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (let file of commandFile) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    }
}

const rest = new REST({ version: 10 }).setToken(token);
(async () => {
    try {
        console.log(`try refresh ${commands.length} aplication (/) commands`);
        const data = await rest.put(
            // Routes.applicationCommand(clientId), { body: commands }
            Routes.applicationGuildCommands(clientId, guildId), {body: commands}
        )
        console.log(`success reloaded ${data.length} aplication (/) commands`);
    } catch (error) {
        console.error(error);
    }
})();