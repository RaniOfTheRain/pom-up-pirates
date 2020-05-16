//
// Discord Pomodoro War bot made during Chip'n'Jam 2020
//
// Author: Chloe Campbell <chloecampbell911@gmail.com>
//

const config = require('./config.js');
const Discord = require('discord.js');
const database = require('./database');
const client = new Discord.Client();
const fs = require('fs');


fs.readdir('./commands/', (err, files) => {
    if (err) console.error(err);
    const jsfile = files.filter((f) => f.split('.').pop() === 'js');
    if (jsfile.length <= 0) {
        return console.log('No commands have been loaded!');
    }
    jsfile.forEach((f) => {
        const pull = require(`./commands/${f}`);
        client.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach((alias) => {
            client.aliases.set(alias, pull.config.name);
        });
    });
});

const start = async () => {

const { db, models } = await database(config);
global.MODELS = () => models;

};

start().catch((e) => {
    console.log(e)
})

client.login(config.discordBotToken);

