import ytdl from 'ytdl-core';
import { logger } from '../logger';
import { language } from '../messages/language';

/**
 * Given a YouTube URL, fetch the info using the ytdl library.
 */
export async function fetchVideoInfo(songUrl: string) {
    let songInfo: ytdl.videoInfo;
    try {
        songInfo = await ytdl.getInfo(songUrl);
    } catch (error) {
        logger.debug(error);
        throw Error(language('ERROR_WHEN_FETCHING_VIDEO_INFO'));
    }
    return songInfo;
}
