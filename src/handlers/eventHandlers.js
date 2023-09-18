const path = require('path')
const getAllFile = require('../utils/getAllFile')
module.exports = (client) => {
    const eventFolders = getAllFile(path.join(__dirname, '..', 'events'), true)
    
    // console.log(eventFolders);
    for(const eventFolder of eventFolders) {
        const eventFiles = getAllFile(eventFolder)
        eventFiles.sort((a, b) => a > b)

        const eventName = eventFolder.replace(/\\/g, '/').split('/').pop()

        client.on(eventName, async (arg) => {
            for(const eventFile of eventFiles) {
                const eventFunction = require(eventFile);
                await eventFunction(client, arg)
            }
        })
    }
}