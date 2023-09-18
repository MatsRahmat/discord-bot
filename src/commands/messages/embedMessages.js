const { ApplicationCommandOptionType, PermissionFlagsBits, EmbedBuilder } = require('discord.js')
module.exports = {
    name: 'embed',
    description: 'Create Embed Message',
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
            description: 'Toggle for show time stamp',
            type: ApplicationCommandOptionType.Boolean
        },
        {
            name: 'author',
            description: 'Toggle for show author',
            type: ApplicationCommandOptionType.Boolean
        },
        {
            name: 'color',
            description: 'Color for embed message',
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: 'Aqua',
                    value: 'Aqua'
                },
                {
                    name: 'Blue',
                    value: 'Blue'
                },
                {
                    name: 'Blurple',
                    value: 'Blurple'
                },
                {
                    name: 'DarkButNotBlack',
                    value: 'DarkButNotBlack'
                },
                {
                    name: 'DarkGrey',
                    value: 'DarkGrey'
                },
                {
                    name: 'DarkOrange',
                    value: 'DarkOrange'
                },
                {
                    name: 'DarkPurple',
                    value: 'DarkPurple'
                },
                {
                    name: 'DarkVividPink',
                    value: 'DarkVividPink'
                },
                {
                    name: 'DarkerGrey',
                    value: 'DarkerGrey'
                },
                {
                    name: 'Gold',
                    value: 'Gold'
                },
                {
                    name: 'Greyple',
                    value: 'Greyple'
                },
                {
                    name: 'LightGrey',
                    value: 'LightGrey'
                },
                {
                    name: 'LuminousVividPink',
                    value: 'LuminousVividPink'
                },
                {
                    name: 'NotQuiteBlack',
                    value: 'NotQuiteBlack'
                },
            ]
        },
    ],
    permissionsRequired: PermissionFlagsBits.EmbedLinks,
    cb: (client, interact) => {
        const getValueOption = (name) => {
            return interact.options.get(name)?.value || undefined
        }

        const field = {
            title: getValueOption('title'),
            description: getValueOption('description'),
            image: getValueOption('image'),
            thumbnail: getValueOption('thumbnail'),
            showTimeStamp: getValueOption('time-stamp'),
            showAuthor: getValueOption('author'),
            color: getValueOption('color')
        }
        const embed = new EmbedBuilder()
            .setTitle(field.title)
            .setDescription(field.description)

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
        if (field.showAuthor) {
            embed.setAuthor({ name: interact.user.username })
        }
        if (field.color) {
            embed.setColor(field.color)
        } else {
            embed.setColor('Random')
        }

        interact.reply({ content: 'Success Create Embed Message', ephemeral: true })
        const currentChannel = client.channels.cache.find(cha => cha.id === interact.channel.id);
        currentChannel.send({ embeds: [embed] })
        // console.log(interact.channel);
    }
}


// https://worldshards.online/l3/logo-game-c87b6bc0.png