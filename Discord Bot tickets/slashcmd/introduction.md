<if it is the case that you want to edit the bot code here I leave you the Slashcommands code if you want to use it obviously :)>
to add the created commands use the following command in the cmd

node slashcommands.js


--------------structure command-----------------

const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("")
    .setDescription(""),

    async run(client, interaction){
        
    }
}