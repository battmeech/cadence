import { Messages } from '../models/messages';
import { prefix } from '../config.json';

const english: Messages = {
    ADD_COMMAND_HELPFUL_DESCRIPTION: 'Add a track to the playlist',
    ADD_COMMAND_NAME: 'add',
    ADD_COMMAND_NO_YOUTUBE_LINK:
        "🎶 Give me a YouTube link and I'll add it to the queue",

    HELP_COMMAND_NAME: 'help',
    HELP_COMMAND_HELPFUL_DESCRIPTION: 'Returns this helpful message!',
    HELP_COMMAND_EMBED_TITLE: '🎵 Available commands 🎵',
    HELP_COMMAND_EMBED_DESCRIPTION:
        'Cadence is here for all your musical needs. Here are the functions I can perform.',

    JOIN_COMMAND_NAME: 'join',
    JOIN_COMMAND_HELPFUL_DESCRIPTION:
        'Join the voice channel the requester is currently in.',
    JOIN_COMMAND_NO_VOICE_CHANNEL: '⚠️ Join a voice channel so I can join you',

    LEAVE_COMMAND_NAME: 'leave',
    LEAVE_COMMAND_HELPFUL_DESCRIPTION:
        'Leave the voice channel the bot is currently in.',
    LEAVE_COMMAND_NO_VOICE_CHANNEL: `⚠️ I'm not in a voice channel, use \`${prefix}join\` while in a voice channel and I'll join you`,

    LOOP_COMMAND_NAME: 'loop',
    LOOP_COMMAND_HELPFUL_DESCRIPTION: 'Toggle the loop settings.',

    PAUSE_COMMAND_NAME: 'pause',
    PAUSE_COMMAND_HELPFUL_DESCRIPTION: 'Pause any currently playing music.',
    PAUSE_COMMAND_NOT_PLAYING: `⚠️ I'm not playing anything, try \`${prefix}play\``,

    PING_COMMAND_NAME: 'ping',
    PING_COMMAND_HELPFUL_DESCRIPTION:
        'Calculates latency between discord and bot.',
    PING_COMMAND_INITIAL_MESSAGE: 'Ping?',
    PING_COMMAND_EDITED_MESSAGE: (latency: string) =>
        `Pong! Latency is ${latency}ms.`,

    PLAY_COMMAND_NAME: 'play',
    PLAY_COMMAND_HELPFUL_DESCRIPTION: 'Play the music in the playlist.',

    PLAYING_COMMAND_NAME: 'playing',
    PLAYING_COMMAND_HELPFUL_DESCRIPTION: 'Show what song is currently playing.',
    PLAYING_COMMAND_UNRECOGNISED_SONG:
        "I'm playing a song that's no longer in the queue!",
    PLAYING_COMMAND_NOT_PLAYING: `▶️ I'm not playing anything right now, use \`${prefix}play\` to hear me play`,

    PLAYLIST_COMMAND_NAME: 'playlist',
    PLAYLIST_COMMAND_HELPFUL_DESCRIPTION: 'View the current playlist.',

    REMOVE_COMMAND_NAME: 'remove',
    REMOVE_COMMAND_HELPFUL_DESCRIPTION: 'Remove a song from the playlist.',
    REMOVE_COMMAND_NON_NUMERICAL_VALUE: `⚠️ You must give a numerical value to remove to, see \`${prefix}playlist\` to find out where the song is.`,
    REMOVE_COMMAND_UNRECOGNISED_SONG: "⚠️ I don't have a song at that number",

    RESET_COMMAND_NAME: 'reset',
    RESET_COMMAND_HELPFUL_DESCRIPTION: 'Reset all the music settings.',

    SKIP_COMMAND_NAME: 'skip',
    SKIP_COMMAND_HELPFUL_DESCRIPTION:
        'Skip to a specific song or skip just the one!',
    SKIP_COMMAND_NON_NUMERICAL_VALUE:
        '`⚠️ You must give a numerical value to skip to, see `${prefix}playlist` to find out where the song is.`',
    SKIP_COMMAND_UNRECOGNISED_SONG: "⚠️ I don't have a song at that number",

    VOLUME_COMMAND_NAME: 'volume',
    VOLUME_COMMAND_HELPFUL_DESCRIPTION:
        'Adjust the volume of the music, can be set between 1 & 10.',
    VOLUME_COMMAND_INVALID_INPUT:
        '⚠️ Please give a value for your volume between 1 and 10',
    VOLUME_COMMAND_RESPONSE_MESSAGE: (volume: string) =>
        `🎶 Volume is set to ${volume}`,

    ERROR_WHEN_FETCHING_VIDEO_INFO:
        '❌ Something went wrong when fetching your song.',
    ERROR_WHEN_JOINING_VOICE_CHANNEL: '❌ I had trouble joining that channel.',
    NO_MUSIC_MESSAGE: `🎶 No songs in queue yet, try the \`${prefix}add\` command`,

    PLAYLIST_EMBED_HEADER: 'Music Queue',
    PLAYLIST_EMBED_DESCRIPTION:
        'Welcome to the best music event on Discord, here is the set list:',
    PLAYLIST_EMBED_FOOTER: `Use ${prefix}help to find out more`,
    PLAYLIST_EMBED_LOOPING: 'Looping',
    PLAYLIST_EMBED_LOOPING_OFF: 'Off',
    PLAYLIST_EMBED_LOOPING_ON: 'On',
    PLAYLIST_EMBED_NOT_CONNECTED: 'Not connected',
    PLAYLIST_EMBED_NOW_PLAYING: 'Now playing',
    PLAYLIST_EMBED_ON_DECK: 'On the deck',
    PLAYLIST_EMBED_REQUESTED_BY: 'Requested by',
    PLAYLIST_EMBED_SETTINGS: 'Settings',
    PLAYLIST_EMBED_VOICE_CHANNEL: 'Voice channel',
    PLAYLIST_EMBED_VOLUME: 'Volume',
};

export default english;
