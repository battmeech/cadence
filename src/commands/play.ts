import { Message, MessageEmbed, TextChannel } from 'discord.js';
import { language } from '../messages/language';
import { DJCommand } from '../models/djCommand';

export default class extends DJCommand {
    constructor() {
        super({
            name: language('PLAY_COMMAND_NAME'),
            description: language('PLAY_COMMAND_HELPFUL_DESCRIPTION'),
        });
    }

    async run(message: Message) {
        const settings = this.musicSettings.get(message.guild!.id)!;

        // If there's no voice channel, attempt to join any channel the user is in
        if (!settings.voiceChannel) {
            if (message.member?.voice.channel) {
                try {
                    await settings.joinVoiceChannel(
                        message.member.voice.channel,
                        message.channel as TextChannel
                    );
                    message.react('👍');
                } catch (error) {
                    return message.reply(
                        new MessageEmbed({ description: error.message })
                    );
                }
            } else {
                return message.channel.send(
                    new MessageEmbed({
                        description: language('JOIN_COMMAND_NO_VOICE_CHANNEL'),
                    })
                );
            }
        }

        if (settings.songs.length === 0) {
            message.channel.send(
                new MessageEmbed({
                    description: language('NO_MUSIC_MESSAGE'),
                })
            );
        } else {
            settings.playMusic();
            message.react('▶️');
        }
    }
}
