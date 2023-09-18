const { ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder } = require("discord.js")
module.exports = {
    name: 'anounce',
    description: 'Create embed anouncement',
    options: [
        {
            name: 'title',
            description: 'title for emebed messsage',
            require: true,
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'description',
            description: 'Description Embed Message',
            require: true,
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'image',
            description: 'Link for image ',
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'thumbnail',
            description: 'Link for thumbnail',
            type: ApplicationCommandOptionType.String
        },
        {
            name: 'time-stamp',
            description: 'Boolean for show time stamp',
            type: ApplicationCommandOptionType.Boolean
        }
    ],
    permissionsRequired: PermissionFlagsBits.Administrator,
    cb: (client, interact) => {
        const channelAnounce = client.channels.cache.find(cha => cha.id === '947717711285346314')
        const getValueOption = (name) => {
            return interact.options.get(name)?.value || undefined
        }

        const field = {
            title: getValueOption('title'),
            description: getValueOption('description'),
            image: getValueOption('image'),
            thumbnail: getValueOption('thumbnail'),
            showTimeStamp: getValueOption('time-stamp') || true
        }
        const embed = new EmbedBuilder()
            .setTitle(`Author: ${field.title}`)
            .setDescription(field.description)
            .setColor('Random')
            .setAuthor({ name: interact.user.username })

        if (field.image) {
            if (field.image.includes('http')) {
                embed.setImage(field.image)
            }
        }
        if (field.thumbnail) {
            if (field.image.includes('http')) {
                embed.setThumbnail(field.thumbnail)
            }
        }
        if (field.showTimeStamp) {
            embed.setTimestamp(new Date())
        }

        channelAnounce.send({ embeds: [embed] })
        interact.reply({ content: 'Success create anounce message' })
    }
}
