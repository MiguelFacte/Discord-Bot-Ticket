const fs = require("fs")
const Discord = require("discord.js")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { clientId, guild } = require("./config.json")
const commands = []
const slashcommandsFiles = fs.readdirSync("./slashcmd").filter(file => file.endsWith("js"))
for(const file of slashcommandsFiles){
    const slash = require(`./slashcmd/${file}`)
    commands.push(slash.data.toJSON())
}
const rest = new REST({ version: "9" }).setToken("OTQzODQ1MjI5NDc4NDQwOTgw.Yg4-Xg.gberYJGpWDMGc1TBzUfeMAaCFTI")
createSlash()
async function createSlash(){
    try{
        await rest.put(
            Routes.applicationCommands(clientId), {
                body: commands
            }
        )
        console.log("\n\x1b[33m Updated Slashcommands\n \x1b[0m")
    } catch(e) {
        console.error(e)
    }
}