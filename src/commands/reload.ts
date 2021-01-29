import { Collection, Message } from 'discord.js';
import { Cadence } from '../models/client';
import { Command } from '../models/command';
import { DeveloperCommand } from '../models/developerCommand';
import { initCommands } from '../utils/utils';

/**
 * This command is intended for development purposes only, to be able to reload
 * without restarting the bot
 */
export default class extends DeveloperCommand {
    constructor() {
        super({
            name: 'reload',
            description: '🤫 Secret command for developers only',
        });
    }

    async run(message: Message) {
        this.cadence.commands = new Collection();

        const { cache } = require;

        // Reset the cache, so that files have to be re-read
        for (let key in cache) {
            if (
                !key.includes('node_modules') &&
                // The bot falls apart without being aware of what a command is..
                // even when its temporary
                !key.includes('dist/models/command')
            ) {
                delete cache[key];
            }
        }

        await initCommands(this.cadence);
        message.react('👍');
    }
}
