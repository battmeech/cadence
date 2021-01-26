import { Message, MessageEmbed, TextChannel } from 'discord.js';
import { client } from '..';
import { Command } from '../models/command';

export default class extends Command {
    constructor() {
        super({
            name: 'play',
            description: 'Play the music in the playlist.',
        });
    }

    async run(message: Message) {
        const settings = client.musicSettings.get(message.guild!.id)!;

        // If there's no voice channel, attempt to join any channel the user is in
        if (!settings.voiceChannel) {
            try {
                await settings.joinVoiceChannel(
                    message.member?.voice.channel!,
                    message.channel as TextChannel
                );
                message.react('👍');
            } catch (error) {
                return message.reply(
                    new MessageEmbed({ description: error.message })
                );
            }
        }

        try {
            settings.playMusic();
            message.react('▶️');
        } catch (error) {
            message.reply(new MessageEmbed({ description: error.message }));
        }
    }
}
