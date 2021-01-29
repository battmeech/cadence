import { Message } from 'discord.js';
import { language } from '../messages/language';
import { DJCommand } from '../models/djCommand';

export default class extends DJCommand {
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
