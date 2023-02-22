# Discord Bot Ticket
*Discord.js v13*

> *Built for Discord communities large or small. Adding a Ticket system to your server will help you improve technical support and have a better order*

## Installation

Requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and start the server.

```sh
npm i discord.js@13.13.1
npm i @discordjs/rest
```

You must fill the [config.json](https://github.com/MiguelFacte/Discord-Bot-Ticket/blob/main/Discord%20Bot%20tickets/config.json) file with your server information and with the bot token. You can get the token here [Discord Developers](https://discord.com/developers/applications)
```json
{
    "prefixbot": "!",
    "token": "Token BOT",
    "presence": "Tickets! :)",
    "category": "Category where you want tickets to be created",
    "clientId": "bot ID",
    "guild": "server ID",
    "moderator": "Moderator Role ID",
    "admin": "Admin Role ID"
}
```

## Run the bot
To run the bot, you have to open a console and run the following command
```sh
node .
```

##### Do you have any question?
If so, do not hesitate to enter my [Discord server](https://discord.gg/bAEZqtxr82).
