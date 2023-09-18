const path = require('path')
const getAllFile = require('./getAllFile')

module.exports = (exceptions = []) => {
    const localCommands = []

    const commandCategories = getAllFile(
        path.join(__dirname, '..', 'commands'),
        true
    )
    // console.log(commandsCategories);
    for(const commandCategory of commandCategories) {
        const commandFiles = getAllFile(commandCategory)
        // console.log(commandFile);
        for(const commandFile of commandFiles) {
            const commandObj = require(commandFile)

            if(exceptions.includes(commandObj.name)) continue
            localCommands.push(commandObj)
        }
    }
    return localCommands
}