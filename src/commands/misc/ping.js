module.exports = {
    name: 'ping',
    description: 'Ping letency',
    // options: [],
    cb: (client, inteaction) => {
        //command body
        inteaction.reply(`Your ping is ${client.ws.ping}ms`)
    }
}