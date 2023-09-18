require('dotenv').config()
// 
const token = process.env.BOOT_TOKEN
const { Client, IntentsBitField } = require('discord.js')
const eventHandlers = require('./handlers/eventHandlers')

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
})

eventHandlers(client)

// client.once(Events.ClientReady, c => {
//     const botIdentity = c.user.tag;
//     console.log(`=== Bot ${botIdentity} online ===`);
// })

// client.on('messageCreate', async (message) => {
//     if (message.author.bot) return;

//     console.log(message.content, 'isi nya');
//     console.log(message.author.tag);
//     if (message.content === 'o*pagi') {
//         await message.reply('pagi juga')
//     }
//     await message.reply('hehe')
// })

// client.on('interactionCreate', async (interact) => {
//     if (!interact.isChatInputCommand()) return;
//     if (interact.commandName === 'ping') {
//         await interact.reply({ content: 'pong', fetchReply: false })
//     }
// })

client.login(token)