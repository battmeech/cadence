import { Client, ClientOptions, Collection, Message } from 'discord.js';
import guildCreate from '../events/guildCreate';
import guildDelete from '../events/guildDelete';
import message from '../events/message';
import ready from '../events/ready';
import { chooseLanguage } from '../messages/language';
import { initCommands } from '../utils/utils';
import { CommandsCollection } from './command';
import { SupportedLanguage } from './messages';
import { MusicSettingsCollection } from './musicSettings';

/**
 * An extension of the discord.js Client class, which also includes commands.
 */
export class Cadence extends Client {
    commands: CommandsCollection = new Collection();

    musicSettings: MusicSettingsCollection = new Collection();

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
        initCommands(this);

        this.on('ready', () => ready(this));

        this.on('guildCreate', (guild) => guildCreate(guild, this));

        this.on('guildDelete', (guild) => guildDelete(guild, this));

        // This event will run on every single message received, from any channel or DM.
        this.on('message', async (userMessage: Message) =>
            message(userMessage, this)
        );

        this.login(cadenceOptions?.token);
    }
}
