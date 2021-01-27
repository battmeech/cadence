import { Message } from 'discord.js';
import { language } from '../messages/language';
import { Command } from '../models/command';

export default class extends Command {
    constructor() {
        super({
            name: language('PING_COMMAND_NAME'),
            description: language('PING_COMMAND_HELPFUL_DESCRIPTION'),
            permissions: ['ADMINISTRATOR'],
        });
    }

    async run(message: Message) {
        // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
        const m = await message.channel.send(
            language('PING_COMMAND_INITIAL_MESSAGE')
        );
        m.edit(
            language(
                'PING_COMMAND_EDITED_MESSAGE',
                m.createdTimestamp - message.createdTimestamp
            )
        );
    }
}
