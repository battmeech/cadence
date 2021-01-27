import { Client, ClientOptions, Collection, Message } from 'discord.js';
import fs from 'fs';
import { prefix } from '../config.json';
import { logger } from '../logger';
import { chooseLanguage, language } from '../messages/language';
import { checkUserCanRun, parseMessage } from '../utils/utils';
import { Command } from './command';
import { SupportedLanguage } from './messages';
import { MusicSettings } from './musicSettings';

/**
 * An extension of the discord.js Client class, which also includes commands.
 */
export class Cadence extends Client {
    commands: Collection<string, Command> = new Collection();

    musicSettings: Collection<string, MusicSettings> = new Collection();

    constructor(
        cadenceOptions?: { token?: string; language?: SupportedLanguage },
        options?: ClientOptions
    ) {
        super(options);

        // Prefer to use language in environment variables if available
        chooseLanguage(
            process.env.LANGUAGE || cadenceOptions?.language || 'english'
        );

        // Initialises all the commands found in the /commands directory
        const commandFiles = fs.readdirSync(__dirname + '/../commands');
        for (const file of commandFiles) {
            import(`../commands/${file}`).then((commandClass) => {
                const command = new commandClass.default();

                if (command instanceof Command) {
                    command.init(this);
                    this.commands.set(command.name, command);
                }
            });
        }

        this.on('ready', () => {
            // This event will run if the bot starts, and logs in, successfully.
            logger.info(
                `Cadence is playing to ${this.users.cache.size} users in ${this.guilds.cache.size} guilds.`
            );

            // Example of changing the bot's playing game to something useful. `client.user` is what the
            // docs refer to as the "ClientUser".
            this.user?.setActivity(language('BOT_ACTIVITY'));

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

            const runnableCommand = this.commands.get(command);

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

        this.login(cadenceOptions?.token);
    }
}
