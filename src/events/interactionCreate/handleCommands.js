const getLocalCommands = require("../../utils/getLocalCommands")

module.exports = async (client, interact) => {
    if (!interact.isChatInputCommand()) return;
    // console.log('masuk sini');

    const localCommands = getLocalCommands();
    try {
        const commandObj = localCommands.find(cmd => cmd.name === interact.commandName)
        if (!commandObj) return;

        if (commandObj.permissionsRequired?.length) {
            for(const permission of commandObj.permissionsRequired) {
                if(!interact.member.permissions.has(permission)) {
                    interact.reply({
                        content: 'no permission allow',
                        ephremeral: true
                    });
                    return
                }
            }
        }
        await commandObj.cb(client, interact)
    } catch (error) {
        console.log(error);
        await interact.reply('the are some error')
    }
}