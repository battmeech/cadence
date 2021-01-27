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

    ERROR_WHEN_FETCHING_VIDEO_INFO:
        '❌ Something went wrong when fetching your song.',
    ERROR_WHEN_JOINING_VOICE_CHANNEL: '❌ I had trouble joining that channel.',
};

export default english;
