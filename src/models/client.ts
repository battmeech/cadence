import { Client, ClientOptions, Collection, Message } from 'discord.js';
import { Command } from './command';
import fs from 'fs';
import { MusicSettings } from './musicSettings';
import { client } from '..';
import { logger } from '../logger';
import { parseMessage, checkUserCanRun } from '../utils/utils';
import { prefix } from '../config.json';

/**
 * An extension of the discord.js Client class, which also includes commands.
 */
export class Cadence extends Client {
    commands: Collection<string, Command> = new Collection();

    musicSettings: Collection<string, MusicSettings> = new Collection();

    constructor(token?: string, options?: ClientOptions) {
        super(options);

        // Initialises all the commands found in the /commands directory
        const commandFiles = fs.readdirSync(__dirname + '/../commands');
        for (const file of commandFiles) {
            import(`../commands/${file}`).then((commandClass) => {
                const command: Command = new commandClass.default();

                if (command instanceof Command) {
                    this.commands.set(command.name, command);
                }
            });
        }

        this.on('ready', () => {
            // This event will run if the bot starts, and logs in, successfully.
            logger.info(
                `Cadence is playing to ${client.users.cache.size} users in ${client.guilds.cache.size} guilds.`
            );

            // Example of changing the bot's playing game to something useful. `client.user` is what the
            // docs refer to as the "ClientUser".
            client.user?.setActivity(`sweet beats`);

            // On start up create music settings for each guild
            this.guilds.cache.forEach((guild) =>
                this.musicSettings.set(guild.id, new MusicSettings())
            );
        });

        this.on('guildCreate', async (guild) => {
            // This event triggers when the bot joins a guild.
            logger.info(
                `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`
            );

            // Create settings for the new guild
            this.musicSettings.set(guild.id, new MusicSettings());
        });

        this.on('guildDelete', (guild) => {
            // this event triggers when the bot is removed from a guild.
            logger.info(
                `I have been removed from: ${guild.name} (id: ${guild.id})`
            );
        });

        // This event will run on every single message received, from any channel or DM.
        this.on('message', async (message: Message) => {
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

            const runnableCommand = client.commands.get(command);

            if (runnableCommand) {
                if (
                    checkUserCanRun(
                        message.member!,
                        runnableCommand.permissions,
                        runnableCommand.roles
                    )
                ) {
                    runnableCommand.run(message, args);
                }
            }
        });

        this.login(token);
    }
}
