const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Shows the bot latency."),
    async run(client, interaction){
        const embed = new MessageEmbed()
			.setColor("0x3EFE00")
			.setTitle('Pong 🏓')
			.setDescription("🟢 "+ Math.floor(client.ws.ping)+"ms");
		await interaction.reply({ ephemeral: true, embeds: [embed] })
    }
}