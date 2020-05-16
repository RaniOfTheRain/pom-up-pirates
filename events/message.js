const config = require('../config.js');

module.exports = async (client, message) => {

    if (!message.guild || message.author.bot) return;
    const args = message.content.split(/\s+/g);
    const command = message.content.startsWith(config.prefix) &&
                    args.shift().slice(config.prefix.length).toLowerCase();
    
    if (command) {
        const commandFile =
            client.commands.get(command) ||
            client.commands.get(client.aliases.get(command));
        
        if (commandFile) {
            commandFile.execute(client, message, args).then(() => {
                message.delete(1500);
            });
        };
    };
}