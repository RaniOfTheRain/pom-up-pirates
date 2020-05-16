const fs = require('fs');
const Discord = require('discord.js');
let prefix;
if (fs.existsSync('../config.js')) {
    prefix = require('../config.js');
} else {
    prefix = '!';
}

module.exports.execute = async (client, message, args) => {
    
    let commands = client.commands;
    let commandNames = [];

    if (!args || args.length === 0) {
        let helpMessage = new Discord.RichEmbed()
            .setColor('#b8d3d2')
            .setTitle('List of Available Commands')
            .setDescription('Commands available in ' + message.guild.name);
        commands.forEach(command => {
            helpMessage.addField(`**${prefix}${command.config.name}**`, `${command.config.description}`);
        });
        try {
            message.author.send(helpMessage);
        }
        catch(err) {
            console.log(err);
        }
        return await message.channel.send('I have sent ye a parrot to help ye get started!').catch(err => {
            console.error(err);
        });
    } else if (args.length === 1) {
        let command = commands.find(command => command.config.name === args[0].toLowerCase() ||
            command.config.aliases.find(alias => alias === arg[0].toLowerCase()));
              
        if (command) {
            let helpMessage = new Discord.RichEmbed()
                .setColor('#b8d3d2')
                .setTitle(`${prefix}${command.config.name}`)
                .setDescription(`Ye asked for a map on ${prefix}${command.config.name}`);
            helpMessage.addField('Description:', command.config.decription);
            helpMessage.addField('Aliases:', command.config.aliases);
            helpMessage.addField('Usage:', command.config.usage);

            try {
                message.channel.send(helpMessage);
            }
            catch(err) {
                console.log(err);
            }
        } else {
            message.channel.send('I cannae find that map in me chest, did ye have too much rum?')
        }
    }
}

module.exports.config = {
    name: 'help',
    aliases: ['help'],
    description: 'I will send ye a parrot with this map, or the map of a specific action.',
    usage: ['help', 'help command']
};