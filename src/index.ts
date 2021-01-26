import { Message } from 'discord.js';
import dotenv from 'dotenv';
import { prefix } from './config.json';
import { logger } from './logger';
import { Cadence } from './models/client';
import { MusicSettings } from './models/musicSettings';
import { parseMessage } from './utils/utils';

// Initialise dotenv config - if you're doing config that way
dotenv.config();

export const client = new Cadence();

client.on('ready', () => {
    // This event will run if the bot starts, and logs in, successfully.
    logger.info(
        `Cadence is playing to ${client.users.cache.size} users in ${client.guilds.cache.size} guilds.`
    );

    // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".
    client.user?.setActivity(`sweet beats`);

    // On start up create music settings for each guild
    client.guilds.cache.forEach((guild) =>
        client.musicSettings.set(guild.id, new MusicSettings())
    );
});

client.on('guildCreate', async (guild) => {
    // This event triggers when the bot joins a guild.
    logger.info(
        `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`
    );

    // Create settings for the new guild
    client.musicSettings.set(guild.id, new MusicSettings());
});

client.on('guildDelete', (guild) => {
    // this event triggers when the bot is removed from a guild.
    logger.info(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

// This event will run on every single message received, from any channel or DM.
client.on('message', async (message: Message) => {
    // Ignore bots, messages from outside guilds and messages without the prefix
    if (
        !message.content.startsWith(prefix) ||
        message.author.bot ||
        !message.guild
    ) {
        return;
    }

    logger.debug('Entered on message.');

    const { command, args } = parseMessage(message);

    client.commands.get(command)?.run(message, args);
});

client.login(process.env.TOKEN);
