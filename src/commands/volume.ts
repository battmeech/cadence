import { Message, MessageEmbed } from 'discord.js';
import { language } from '../messages/language';
import { DJCommand } from '../models/djCommand';

export default class extends DJCommand {
    constructor() {
        super({
            name: language('VOLUME_COMMAND_NAME'),
            description: language('VOLUME_COMMAND_HELPFUL_DESCRIPTION'),
        });
    }

    run(message: Message, args: string[]) {
        const settings = this.musicSettings.get(message.guild!.id)!;

        const [volume] = args;
        const newVolume = parseInt(volume);

        if (volume) {
            if (isNaN(newVolume) || newVolume > 10 || newVolume < 0) {
                return message.channel.send(
                    new MessageEmbed({
                        description: language('VOLUME_COMMAND_INVALID_INPUT'),
                    })
                );
            } else {
                settings.setVolume(newVolume);
            }
        }
        message.reply(
            new MessageEmbed({
                description: language(
                    'VOLUME_COMMAND_RESPONSE_MESSAGE',
                    settings.volume
                ),
            })
        );
    }
}
