const Discord = require("discord.js");
const intents = new Discord.Intents();
const client = new Discord.Client({ intents: 32767 });
const { admin, moderator, category, presence, prefixbot, token } = require("./config.json");
client.on("ready", () => {
    console.log(`\n\x1b[47m\x1b[30m\x1b[5mBy Nil PM\x1b[0m\n\x1b[0m\n\x1b[36m ${client.user.username} Online \n \x1b[32mSlash Command activated\n\x1b[0m`)
    client.user.setActivity(presence);
});
const fs = require("fs");
let { readdirSync } = require("fs");
const { channel } = require("diagnostics_channel");
const { type } = require("os");
client.commands = new Discord.Collection();
const commandsFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))
for (const file of commandsFiles){
    const commands = require(`./commands/${file}`);
    client.commands.set(commands.name, commands);
}
client.slashcommands = new Discord.Collection();
const slashcommandsFiles = fs.readdirSync("./slashcmd").filter(file => file.endsWith("js"))
for(const file of slashcommandsFiles){
    const slash = require(`./slashcmd/${file}`)
    client.slashcommands.set(slash.data.name, slash)
    console.log(`Loading Slashcommands`)
}
client.on("interactionCreate", async(interaction) => {
    if(interaction.isButton()){
        if(interaction.customId === "tickets"){
            const findChannel = await interaction.guild.channels.cache.find(ch => ch.name === "ticket-" + interaction.user.username.replace("#", "-").replace(/ /g, "-").toLocaleLowerCase())
            if(findChannel) return interaction.reply({ content: `<@${interaction.user.id}> You cannot create another ticket😥.\nClose the other ticket to create a new one`, ephemeral: true})
            let admin1 = interaction.guild.roles.cache.find(rol => rol.id === admin)
            const moderator1 = interaction.guild.roles.cache.find(rol => rol.id === moderator)
            let everyone = interaction.guild.roles.cache.find(rol => rol.name == "@everyone");
            interaction.guild.channels.create(`ticket-${interaction.user.username}`,{
                reason: `Ticket created by: ${interaction.user.username}`,
                type: "GUILD_TEXT",
                parent: category,
                permissionOverwrites: [
                    {
                        id: everyone.id,
                        deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]

                    },
                    {
                        id: moderator1,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
                    },
                    {
                        id: admin,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                      
                    },
                    {
                        id: interaction.user.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
                    }
                ]
            }).then(c => {
                const canal = new Discord.MessageEmbed()
                .setTitle(`Welcome to your ticket`)
                .setDescription("This is a Ticket to solve your problems or questions.\nWait for an Administrator or Moderator to contact you.")
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setColor("BLUE")
                .setTimestamp()
                .setFooter({ text: 'Ticket created', iconURL: 'https://cdn.discordapp.com/attachments/911045186027671582/948248063930146816/845438445446889493_1.png'});
                const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                    .setCustomId("deletetickets")
                    .setStyle("DANGER")
                    .setLabel("Delete Ticket")
                    .setEmoji("🗑️")
                )
                c.send({ embeds: [canal], components: [row] })
            })
            interaction.reply({ content: `<@${interaction.user.id}> The ticket was created!\nRemember to write your problem and a moderator will be able to help you.`, ephemeral: true})
        }
    }
    if(interaction.isButton()){
        const embed12 = new Discord.MessageEmbed()
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true })})
        .setTitle("Delete Ticket")
        .setDescription("The ticket was deleted successfully\nIf you have any other questions or problems do not hesitate to create a Ticket😀")
        .setColor("BLUE")
        .setTimestamp()
        .setFooter({ text: 'Ticket deleted', iconURL: 'https://cdn.discordapp.com/attachments/911045186027671582/948248063930146816/845438445446889493_1.png'});
        if(interaction.customId === "deletetickets"){
            client.users.cache.get(interaction.user.id).send({ embeds: [embed12] })
            interaction.channel.delete()
        }
    }
    if(!interaction.isCommand()) return;
    const slashcmds = client.slashcommands.get(interaction.commandName)
    if(!slashcmds) return;
    try{
        await slashcmds.run(client,interaction)
    } catch(e){
        console.error(e)
    }
})
client.on("messageCreate", (message) => {
    let prefix = prefixbot
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));
    if(cmd){
        cmd.execute(client, message, args)
    }
})
client.login(token);
