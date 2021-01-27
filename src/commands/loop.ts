import { Message, MessageEmbed } from 'discord.js';
import { language } from '../messages/language';
import { MusicCommand } from '../models/musicCommand';

export default class extends MusicCommand {
    constructor() {
        super({
            name: language('LOOP_COMMAND_NAME'),
            description: language('LOOP_COMMAND_HELPFUL_DESCRIPTION'),
        });
    }

    run(message: Message) {
        const settings = this.musicSettings.get(message.guild!.id)!;

        settings.setLoop(!settings.loop);
        message.react(settings.loop ? '👌' : '✋');
    }
}
