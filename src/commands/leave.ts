import { Message, MessageEmbed } from 'discord.js';
import { language } from '../messages/language';
import { MusicCommand } from '../models/musicCommand';

export default class extends MusicCommand {
    constructor() {
        super({
            name: language('LEAVE_COMMAND_NAME'),
            description: language('LEAVE_COMMAND_HELPFUL_DESCRIPTION'),
        });
    }

    run(message: Message) {
        const settings = this.musicSettings.get(message.guild!.id)!;

        if (settings.voiceChannel) {
            settings.leaveVoiceChannel();
            message.react('👋');
        } else {
            message.reply(
                new MessageEmbed({
                    description: language('LEAVE_COMMAND_NO_VOICE_CHANNEL'),
                })
            );
        }
    }
}
