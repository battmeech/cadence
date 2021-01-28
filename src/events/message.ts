import { Message } from 'discord.js';
import { logger } from '../logger';
import { Cadence } from '../models/client';
import { parseMessage, checkUserCanRun } from '../utils/utils';
import { prefix } from '../config.json';

export default function (message: Message, client: Cadence) {
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

    if (
        runnableCommand &&
        checkUserCanRun(
            message.member!,
            runnableCommand.permissions,
            runnableCommand.roles
        )
    ) {
        runnableCommand.run(message, args);
    }
}
