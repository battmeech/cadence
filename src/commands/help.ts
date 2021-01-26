import { Message, MessageEmbed } from 'discord.js';
import { client } from '..';
import { Command } from '../models/command';

export default class extends Command {
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
        client.commands.forEach((command) => {
            messageEmbed.addField(`!${command.name}`, command.description);
        });

        message.channel.send(messageEmbed);
    }
}
