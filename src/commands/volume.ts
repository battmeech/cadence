import { Message, MessageEmbed } from 'discord.js';
import { MusicCommand } from '../models/musicCommand';

export default class extends MusicCommand {
    constructor() {
        super({
            name: 'volume',
            description:
                'Adjust the volume of the music, can be set between 1 & 10.',
        });
    }

    async run(message: Message, args: string[]) {
        const settings = this.musicSettings.get(message.guild!.id)!;

        const [volume] = args;
        const newVolume = parseInt(volume);

        if (volume) {
            if (isNaN(newVolume) || newVolume > 10 || newVolume < 0) {
                return message.channel.send(
                    new MessageEmbed({
                        description:
                            '⚠️ Please give a value for your volume between 1 and 10',
                    })
                );
            } else {
                settings.setVolume(newVolume);
            }
        }
        message.reply(
            new MessageEmbed({
                description: `🎶 Volume is set to ${settings.volume}`,
            })
        );
    }
}
