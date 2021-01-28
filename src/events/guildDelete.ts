import { Guild } from 'discord.js';
import { logger } from '../logger';
import { Cadence } from '../models/client';

export default function (guild: Guild, client: Cadence) {
    // this event triggers when the bot is removed from a guild.
    logger.info(`I have been removed from: ${guild.name} (id: ${guild.id})`);

    client.musicSettings.delete(guild.id);
}
