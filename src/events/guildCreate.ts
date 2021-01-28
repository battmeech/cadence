import { Guild } from 'discord.js';
import { logger } from '../logger';
import { Cadence } from '../models/client';
import { MusicSettings } from '../models/musicSettings';

export default function (guild: Guild, client: Cadence) {
    // This event triggers when the bot joins a guild.
    logger.info(
        `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`
    );

    // Create settings for the new guild
    client.musicSettings.set(guild.id, new MusicSettings());
}
