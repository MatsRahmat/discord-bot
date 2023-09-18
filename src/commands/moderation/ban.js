const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')
module.exports = {
    name: 'ban',
    description: 'ban a user',
    options: [
        {
            name: 'user-target',
            description: 'user wan to ban',
            require: true,
            type: ApplicationCommandOptionType.Mentionable
        },
        {
            name: 'reason',
            description: 'reason why get ban',
            type: ApplicationCommandOptionType.String,
        }

    ],
    permissionsRequired: [PermissionFlagsBits.Administrator],
    cb: (client, inteaction) => {
        //command body
        inteaction.reply(`User has been **Ban**`)
    }
}