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
        const publicHelp = new MessageEmbed();
        const privateHelp = new MessageEmbed();

        publicHelp.setTitle(language('HELP_COMMAND_EMBED_TITLE'));
        publicHelp.setDescription(language('HELP_COMMAND_EMBED_DESCRIPTION'));

        privateHelp.setTitle(language('HELP_COMMAND_PRIVATE_EMBED_TITLE'));
        privateHelp.setDescription(
            language('HELP_COMMAND_PRIVATE_EMBED_DESCRIPTION')
        );

        // Check the user can run a command before giving them info on it
        this.commands
            .filter(
                (command) =>
                    checkUserCanRun(message.member!, command) && !command.hidden
            )
            .forEach((command) =>
                publicHelp.addField(
                    `!${command.name}`,
                    command.description || command.name
                )
            );

        // Do the same for hidden commands
        this.commands
            .filter(
                (command) =>
                    checkUserCanRun(message.member!, command) &&
                    !!command.hidden
            )
            .forEach((command) =>
                privateHelp.addField(
                    `!${command.name}`,
                    command.description || command.name
                )
            );

        message.channel.send(publicHelp);

        if (privateHelp.fields.length > 0) {
            message.author.send(privateHelp);
        }
    }

    init(client: Cadence) {
        this.commands = client.commands;
    }
}
