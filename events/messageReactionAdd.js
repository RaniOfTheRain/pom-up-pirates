const rulesActions = require('../eventsActions/rulesActions');

module.exports = async (client, reaction, user) => {
    rulesActions.userAcceptsRules(reaction, user, client);
}