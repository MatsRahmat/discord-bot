const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('tes command'),
    async execute(interact) {
        await interact.reply('pong!')
    }
}