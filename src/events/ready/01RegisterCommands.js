const arCommandsDeferent = require("../../utils/arCommandsDeferent")
const getApplicationCommands = require("../../utils/getApplicationCommands")
const getLocalCommands = require("../../utils/getLocalCommands")

module.exports = async (client) => {
    try {
        const localCommands = getLocalCommands()
        const applicationCommands = await getApplicationCommands(client, '657476002502541323')

        for (const localCommand of localCommands) {
            const { name, description, options } = localCommand;

            const existingCommand = await applicationCommands.cache.find((cmd) => cmd.name === name)
            if (existingCommand) {
                if (localCommand.deleted) {
                    await applicationCommands.delete(existingCommand.id)
                    console.log(`deleted command ${name}`);
                    continue
                }

                if (arCommandsDeferent(existingCommand, localCommand)) {
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options
                    })
                    console.log(`edited command ${name}`);
                }
            } else {
                if(localCommand.deleted) {
                    console.log(`skip registration command`);
                    continue
                }
                
                await applicationCommands.create({
                    name,
                    description,
                    options
                })
                console.log('success register new Command');
            }
        }
    } catch (error) {
        client.channels.cache.find(cha => cha.id === '1011996750829072444').send(error)
        console.log(error);

    }
}