require('dotenv').config()
const fs = require('fs')
const path = require('path')
const token = process.env.BOOT_TOKEN
const { Client, Events, GatewayIntentBits, IntentsBitField, Collection, NewsChannel } = require('discord.js')

// const client = new Client({ intents: [GatewayIntentBits.Guilds] })
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
})

client.once(Events.ClientReady, c => {
    const botIdentity = c.user.tag;
    console.log(`=== Bot ${botIdentity} online ===`);
})

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    console.log(message.content, 'isi nya');
    console.log(message.author.tag);
    if (message.content === 'o*pagi') {
        await message.reply('pagi juga')
    }
    await message.reply('hehe')
})

client.on('interactionCreate', async (interact) => {
    if (!interact.isChatInputCommand()) return;
    if (interact.commandName === 'ping') {
        await interact.reply({ content: 'pong', fetchReply: false })
    }
})

// client.commands = new Collection()

// const commandPath = path.join(__dirname, 'commands');
// const commandFile = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'))

// for (let file of commandFile) {
//     const filePath = path.join(commandPath, file)
//     const command = require(filePath)
//     if ('data' in command && 'execute' in command) {
//         client.commands.set(command.data.name, command)
//     } else {
//         console.log(`[WARNING] The command at ${filePath} is missing a require "data"  of "execute" property.`);
//     }
// }



// client.on(Events.InteractionCreate, async interact => {
//     if (!interact.isChatInputCommand()) return;

//     console.log(interact, 'ini interact');
//     const command = interact.client.commands.get(interact.commandName);

//     if (!command) {
//         console.log('No Command Match');
//         return;
//     }

//     try {
//         await command.execute(interact);
//     } catch (error) {
//         console.log(error);
//         if (interact.replied || interact.deferred) {
//             await interact.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
//         } else {
//             await interact.reply({ content: 'There was an error while executing this command!', ephemeral: true });
//         }
//     }
//     console.log(interact);
// })

client.login(token)