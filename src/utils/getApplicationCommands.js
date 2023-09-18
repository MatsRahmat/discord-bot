module.exports = async (client, guildId) => {
    let applicationCommands;
    try {
        if(guildId) {
            const guild = await client.guilds.fetch(guildId)
            applicationCommands = guild.commands;
        } else {
            applicationCommands = await client.application.commands;
        }
        await applicationCommands.fetch()
        return applicationCommands
    } catch (error) {
        console.log(error);
    }
}   