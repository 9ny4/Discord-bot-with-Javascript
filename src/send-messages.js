require("dotenv").config();
const { Client, IntentsBitField, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

const roles = [
    {      
        id: "1299910158977208370",
        label: "Fishhead",
    },
    {
        id: "1296181935428730920",
        label: "Schwarz Affe",
    },
    {
        id: "1020383825097937002",
        label: "Pings",
    },
]


// Note: This file requires an interactionCreate event in index.js to handle roles. This script is simply to create the message with buttons.


client.on("ready", async () => {
    try {
        const channel = await client.channels.cache.get("1316190089197391992");
        if (!channel) throw new Error("Channel not found");

        const row = new ActionRowBuilder();

        roles.forEach(role => {
            row.components.push(
                new ButtonBuilder().setCustomId(role.id).setLabel(role.label).setStyle(ButtonStyle.Primary)
            );
        });

        await channel.send({ content: "Click a button to get the role", components: [row] });
        process.exit();

    } catch (error) {
        console.error(`An error occurred: ${error}`);  
        
    }
});

client.login(process.env.token).catch(error => {
    if (error.code === 'TokenInvalid') {
        console.error('The token is invalid or has been reset. Please update the token in config.json.');
    } else {
        console.error('An error occurred during login:', error);
    }
});
