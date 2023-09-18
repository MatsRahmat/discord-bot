module.exports = (client) => {
    const consoleChannel = client.channels.cache.find(cha => cha.id === '1011996750829072444')
    consoleChannel.send('online')
    console.log(`Bot ${client.user.tag} is Online`);
    setTimeout(() => {
        try {
            client.channels.cache.find(cha => cha.id === '100568444037628735').send({ content: 'hua, Sudah online' })

        } catch (error) {
            client.channels.cache.find(cha => cha.id === '1011996750829072444').send('Channel not set')
        }
    }, 10000);
}