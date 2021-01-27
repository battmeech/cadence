import { Collection, Message, MessageEmbed } from 'discord.js';
import { Cadence } from '../models/client';
import { Command } from '../models/command';
import { checkUserCanRun } from '../utils/utils';

export default class extends Command {
    commands: Collection<string, Command> = new Collection();

    constructor() {
        super({
            name: 'help',
            description: 'Returns this helpful message!',
        });
    }

    run(message: Message): void {
        const messageEmbed = new MessageEmbed();
        messageEmbed.setTitle('🎵 Available commands 🎵');
        messageEmbed.setDescription(
            'Cadence is here for all your musical needs. Here are the functions I can perform.'
        );
        this.commands.forEach((command) => {
            if (
                checkUserCanRun(
                    message.member!,
                    command.permissions,
                    command.roles
                )
            ) {
                messageEmbed.addField(`!${command.name}`, command.description);
            }
        });

        message.channel.send(messageEmbed);
    }

    init(client: Cadence) {
        this.commands = client.commands;
    }
}
