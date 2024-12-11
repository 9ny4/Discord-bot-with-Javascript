require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!',
    },
    {
        name: "add",
        description: "Adds two numbers together",
        options: [
            {
                name: "first-number",
                description: "The first number to add",
                type: ApplicationCommandOptionType.Number,
                required: true,
                choices: [
                    { name: "one", value: 1 },
                    { name: "two", value: 2 },
                    { name: "three", value: 3 }
                ]
            },
            {
                name: "second-number",
                description: "The second number to add",
                type: ApplicationCommandOptionType.Number,
                required: true,
                choices: [
                    { name: "one", value: 1 },
                    { name: "two", value: 2 },
                    { name: "three", value: 3 }
                ]
            },
        ]
    },
    {
        name: "embed",
        description: "Sends an embed"
    },
    {
        name: "silent",
        description: "Sends a silent embed"
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.token);

(async () => {
    try {
        console.log("registering slash commands...");
        await rest.put(
            Routes.applicationGuildCommands(process.env.clientId, process.env.guildId),
            { body: commands }
        );


        console.log('Successfully registered slash commands.');
    } catch (error) {
        console.error(`Error while registering slash commands: ${error}`);
    }
})();