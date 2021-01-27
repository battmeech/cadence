import {
    MessageEmbed,
    StreamDispatcher,
    TextChannel,
    VoiceChannel,
    VoiceConnection,
} from 'discord.js';
import ytdl from 'ytdl-core';
import { logger } from '../logger';
import { language } from '../messages/language';
import { Song } from './song';

export class MusicSettings {
    /** The queued up songs */
    songs: Song[];
    /** Which song in the queue is currently being played (1 based index) */
    musicIndex: number;
    /** The volume which Cadence will play the music */
    volume: number;
    /** Whether or not a song should loop */
    loop: boolean;
    /** Whether or not music is currenty playing */
    playing: boolean;
    /** The voice channel which Purrito is playing in */
    voiceChannel?: VoiceChannel;
    /** Information about the connection to the voice channel */
    connection?: VoiceConnection;
    /** The music controller */
    dispatcher?: StreamDispatcher;
    /** The text channel the +join request came from */
    textChannel?: TextChannel;

    constructor() {
        this.songs = [];
        this.volume = 5;
        this.loop = false;
        this.playing = false;
        this.musicIndex = 1;
    }

    /** Attempt to join the voice channel, and log store a text channel */
    async joinVoiceChannel(
        voiceChannel: VoiceChannel,
        textChannel: TextChannel
    ) {
        try {
            this.voiceChannel = voiceChannel;
            this.connection = await voiceChannel.join();
            this.textChannel = textChannel;
        } catch (error) {
            logger.debug(error);
            throw Error(language('ERROR_WHEN_JOINING_VOICE_CHANNEL'));
        }
    }

    /** Leave the voice channel that the bot is currently in */
    leaveVoiceChannel() {
        this.voiceChannel!.leave();
        this.voiceChannel = undefined;
        this.connection = undefined;
        this.dispatcher = undefined;
        this.playing = false;
        this.textChannel = undefined;
        this.musicIndex = 1;
    }

    /** Pause the currently playing music */
    pauseMusic() {
        this.dispatcher!.pause();
        this.playing = false;
    }

    /** Add a new song to the playlist */
    addSong(song: Song) {
        this.songs.push(song);
    }

    /** Remove a song from the playlist and ensure the list is up to date */
    removeSong(songIndex: number): Song | undefined {
        const toRemove = Number(songIndex - 1);
        const [song] = this.songs.splice(toRemove, 1);
        this.musicIndex = this.musicIndex - 1;
        if (!this.playing && this.musicIndex < 1) {
            this.musicIndex = 1;
        }

        this.songs.forEach((song) => {
            if (song.positionInQueue > toRemove) {
                song.positionInQueue = song.positionInQueue - 1;
            }
        });

        return song;
    }

    /** Play the music from the playlist */
    playMusic() {
        let nowPlaying = this.songs.find(
            (song) => song.positionInQueue === this.musicIndex
        );
        if (!nowPlaying && this.songs.length > 0) {
            // If we've reached the end of the play list, and there are still songs in there, go back to the start
            this.musicIndex = 1;
            nowPlaying = this.songs[0];
        } else if (!nowPlaying && this.songs.length === 0) {
            // If we reach the end of the playlist and the playlist is empty, leave the voice channel
            this.leaveVoiceChannel();
            return;
        }

        if (this.dispatcher && !this.playing) {
            this.dispatcher.resume();
            this.playing = true;
        } else if (this.playing) {
            logger.debug('play called when already playing');
        } else {
            const song = ytdl(nowPlaying!.url, {
                quality: 'highestaudio',
                highWaterMark: 1 << 25,
            });

            this.dispatcher = this.connection
                ?.play(song)
                .on('finish', () => {
                    if (!this.loop) this.musicIndex = this.musicIndex + 1;
                    this.playing = false;
                    this.dispatcher = undefined;
                    this.playMusic();
                })
                .on('error', (error) => console.log(error));
            this.playing = true;
            this.setVolume(this.volume);
            this.textChannel?.send(
                nowPlaying!.createEmbed().setDescription('Now playing')
            );
        }
    }

    /** Set everyting back to blank, essentially resetting all the music settings */
    reset() {
        this.songs = [];
        this.voiceChannel?.leave();
        this.voiceChannel = undefined;
        this.connection = undefined;
        this.dispatcher = undefined;
        this.playing = false;
        this.textChannel = undefined;
        this.musicIndex = 1;
    }

    /** Skip to the next song, or skip to a specific song in the playlist */
    skip(songNumber?: number) {
        this.musicIndex = songNumber || this.musicIndex + 1;

        if (this.dispatcher) {
            this.playing = false;
            this.dispatcher.pause();
            this.dispatcher = undefined;
            this.playMusic();
        }
    }

    /** Set the volume of the music Cadence is playing */
    setVolume(volume: number) {
        this.volume = volume;
        if (this.dispatcher) {
            this.dispatcher.setVolumeLogarithmic(volume / 5);
        }
    }

    /** Change the loop setting */
    setLoop(loop: boolean) {
        this.loop = loop;
    }

    /** Create an embed to show the settings to the user */
    createEmbed(): MessageEmbed {
        const embed = new MessageEmbed();

        embed.setTitle(language('PLAYLIST_EMBED_HEADER'));
        embed.setDescription(language('PLAYLIST_EMBED_DESCRIPTION'));
        this.songs.forEach((song) => {
            if (this.musicIndex === song.positionInQueue) {
                embed.addField(
                    `${song.positionInQueue}. ${song.title} 🎵 ${
                        this.playing
                            ? language('PLAYLIST_EMBED_NOW_PLAYING')
                            : language('PLAYLIST_EMBED_ON_DECK')
                    } 🎵`,
                    `${language('PLAYLIST_EMBED_REQUESTED_BY')} ${
                        song.requestingUser.username
                    }`
                );
            } else {
                embed.addField(
                    `${song.positionInQueue}. ${song.title}`,
                    `${language('PLAYLIST_EMBED_REQUESTED_BY')} ${
                        song.requestingUser.username
                    }`
                );
            }
        });
        embed.addField(language('PLAYLIST_EMBED_SETTINGS'), [
            `${language('PLAYLIST_EMBED_LOOPING')}: ${
                this.loop
                    ? language('PLAYLIST_EMBED_LOOPING_ON')
                    : language('PLAYLIST_EMBED_LOOPING_OFF')
            }`,
            `${language('PLAYLIST_EMBED_VOLUME')}: ${this.volume}`,
            `${language('PLAYLIST_EMBED_VOICE_CHANNEL')}: ${
                this.voiceChannel
                    ? this.voiceChannel.name
                    : language('PLAYLIST_EMBED_NOT_CONNECTED')
            }`,
        ]);
        embed.setFooter(language('PLAYLIST_EMBED_FOOTER'));

        return embed;
    }
}
