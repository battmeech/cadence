import { Message, MessageEmbed, TextChannel } from 'discord.js';
import { client } from '..';
import { Command } from '../models/command';

export default class extends Command {
    constructor() {
        super({
            name: 'loop',
            description: 'Toggle the loop settings.',
        });
    }

    async run(message: Message) {
        const settings = client.musicSettings.get(message.guild!.id)!;

        settings.setLoop(!settings.loop);
        message.channel.send(
            new MessageEmbed({
                description: `Looping is now ${settings.loop ? 'on' : 'off'}`,
            })
        );
    }
}
