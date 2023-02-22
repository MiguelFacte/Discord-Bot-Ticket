const Discord = require('discord.js');
module.exports = {
    name: "ticket-message",
    alias: [],
    descripcion: "place the ticket message in a channel",
    execute(client, message, args) {

        let permiso = message.member.permissions.has("ADMINISTRATOR")
        if (!permiso) return message.channel.send("You do not have the necessary permissions to use the command.");

        message.delete(), 5000

        const embed = new Discord.MessageEmbed()
            .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
            .setTitle("Tickets")
            .setDescription("Need help?\nPress the **button** to create a ticket and a moderator will be able to help you as soon as possible with your problem.")
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setColor("BLUE")
            .setFooter({ 
                text: 'Bug reports', 
                iconURL: 'https://cdn.discordapp.com/attachments/911045186027671582/948248063930146816/845438445446889493_1.png' 
            });
            
        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId("tickets")
                    .setStyle("PRIMARY")
                    .setLabel("Create Ticket")
                    .setEmoji("🎫")
            )
        return message.channel.send({ embeds: [embed], components: [row] })
    }
}
