const config = require('../config.js');

class rulesActions {
    static userAcceptsRules(reaction, user, client) {
        if (reaction.message.channel.id === config.channels.rules
           && reaction._emoji.name === config.emojis.acceptRules) {
           reaction.message.guild.fetchMember(user.id).then(guildMember => {
               if (guildMember.roles.has(config.roles.initiate)) {
                   const initiateRole = reaction.message.guild.roles.find(r => r.id === config.roles.initiate);
                   guildMember.removeRole(initiateRole);

                   client.channels.get(config.channels.tavern).send(`🦜 Arr! A new pirate be joining us! Welcome landlubber <@${user.id}>! 🦜`);
               }
           });
           }
    }
}

module.exports = rulesActions;