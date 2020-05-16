const config = require('../config.js');

module.exports = (client, member) => {
    member.addRole(member.guild.roles.find(role => role.id === config.roles.initiate));
}