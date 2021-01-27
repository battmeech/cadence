import { Message, MessageEmbed } from 'discord.js';
import { language } from '../messages/language';
import { MusicCommand } from '../models/musicCommand';

export default class extends MusicCommand {
    constructor() {
        super({
            name: language('PAUSE_COMMAND_NAME'),
            description: language('PAUSE_COMMAND_HELPFUL_DESCRIPTION'),
        });
    }

    run(message: Message) {
        const settings = this.musicSettings.get(message.guild!.id)!;

        if (settings.playing && settings.dispatcher) {
            settings.pauseMusic();
            message.react('⏸️');
        } else {
            message.channel.send(
                new MessageEmbed({
                    description: language('PAUSE_COMMAND_NOT_PLAYING'),
                })
            );
        }
    }
}
