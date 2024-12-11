require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, ActivityType } = require("discord.js");

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.login(process.env.token).catch(error => {
    if (error.code === 'TokenInvalid') {
        console.error('The token is invalid or has been reset. Please update the token in config.json.');
    } else {
        console.error('An error occurred during login:', error);
    }
});

client.once('ready', () => {
    const ping = client.ws.ping >= 0 ? client.ws.ping : 'N/A';
    console.log(`Logged in as ${client.user.username}! Ping: ${ping}ms`);
    client.user.setActivity({name: "Hitting insane clips", type: ActivityType.Streaming, url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"});
});

client.on('messageCreate', message => {
    if (message.author.bot) return;

    if (message.content === '!ping') {
        const ping = client.ws.ping >= 0 ? client.ws.ping : 'N/A';
        message.channel.send(`Pong! Ping: ${ping}ms`);
    }
});

client.on("interactionCreate", (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "ping") {
        const ping = client.ws.ping >= 0 ? client.ws.ping : 'N/A';
        interaction.reply(`Pong! I took ${ping}ms to respond.`);
    }
    if (interaction.commandName === "add") {
        const num1 = interaction.options.get("first-number").value;
        const num2 = interaction.options.get("second-number").value;
        
        interaction.reply(`The sum of ${num1} and ${num2} is ${num1 + num2}`);
    }
    if (interaction.commandName === "embed") {
        const embed = new EmbedBuilder()
            .setTitle("This is an embed")
            .setDescription("This is the description of the embed")
            .addFields([
                { name: "Hey! Im a Field", value: "Field's have value's" },
                { name: "Im also a Field", value: "I also have a value. But im also inline!", inline: true },
                { name: "Guess what? Im a Field too!", value: "And im inline with a value!", inline: true },
            ])
            .setColor("Random")
            .setTimestamp(Date.now());
        
        interaction.reply({ embeds: [embed] });
    }
if (interaction.commandName === "silent") {
    const embed = new EmbedBuilder()
        .setTitle("Shh... This is a silent embed")
        .setDescription("Don't tell anyone, but this is a secret message just for you.")
        .addFields([
            { name: "Silent Whisper", value: "This field is a quiet whisper meant only for you." },
            { name: "Hush", value: "This is a silent value. Keep it to yourself.", inline: true },
            { name: "Secret", value: "And I'm inline with a value, just between us.", inline: true },
        ])
        .setColor("DarkButNotBlack")
        .setTimestamp(Date.now());
    
    interaction.reply({ embeds: [embed], ephemeral: true });
}
});

// Connected to send-messages.js Will not work without it

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton()) return;
    await interaction.deferReply({ ephemeral: true });

    const member = await interaction.guild.members.fetch(interaction.user.id);
    const role = interaction.guild.roles.cache.get(interaction.customId);

    if (!member || !role) return interaction.editReply({ content: "An error occurred while trying to assign the role.", ephemeral: true });

    if (member.roles.cache.has(role.id)) {
        await member.roles.remove(role);
        interaction.editReply({ content: `The role ${role.name} has been removed.`, ephemeral: true });
    } else {
        await member.roles.add(role);
        interaction.editReply({ content: `The role ${role.name} has been added.`, ephemeral: true });
    }
});