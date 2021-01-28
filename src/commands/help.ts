import { Collection, Message, MessageEmbed } from 'discord.js';
import { language } from '../messages/language';
import { Cadence } from '../models/client';
import { Command, CommandsCollection } from '../models/command';
import { checkUserCanRun } from '../utils/utils';

export default class extends Command {
    commands: CommandsCollection = new Collection();

    constructor() {
        super({
            name: language('HELP_COMMAND_NAME'),
            description: language('HELP_COMMAND_HELPFUL_DESCRIPTION'),
        });
    }

    run(message: Message): void {
        const messageEmbed = new MessageEmbed();
        messageEmbed.setTitle(language('HELP_COMMAND_EMBED_TITLE'));
        messageEmbed.setDescription(language('HELP_COMMAND_EMBED_DESCRIPTION'));
        this.commands.forEach((command) => {
            if (
                checkUserCanRun(
                    message.member!,
                    command.permissions,
                    command.roles
                )
            ) {
                messageEmbed.addField(
                    `!${command.name}`,
                    command.description || command.name
                );
            }
        });

        message.channel.send(messageEmbed);
    }

    init(client: Cadence) {
        this.commands = client.commands;
    }
}
