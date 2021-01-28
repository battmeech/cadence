import { logger } from '../logger';
import { language } from '../messages/language';
import { Cadence } from '../models/client';
import { MusicSettings } from '../models/musicSettings';

export default function (client: Cadence) {
    logger.info(
        `Cadence is playing to ${client.users.cache.size} users in ${client.guilds.cache.size} guilds.`
    );

    // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".
    client.user?.setActivity(language('BOT_ACTIVITY'));

    // On start up create music settings for each guild
    client.guilds.cache.forEach((guild) =>
        client.musicSettings.set(guild.id, new MusicSettings())
    );
}
