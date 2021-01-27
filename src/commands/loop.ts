import { Message, MessageEmbed } from 'discord.js';
import { MusicCommand } from '../models/musicCommand';

export default class extends MusicCommand {
    constructor() {
        super({
            name: 'loop',
            description: 'Toggle the loop settings.',
        });
    }

    run(message: Message) {
        const settings = this.musicSettings.get(message.guild!.id)!;

        settings.setLoop(!settings.loop);
        message.channel.send(
            new MessageEmbed({
                description: `Looping is now ${settings.loop ? 'on' : 'off'}`,
            })
        );
    }
}
