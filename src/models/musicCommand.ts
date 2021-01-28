import { Collection } from 'discord.js';
import { Cadence } from './client';
import { Command } from './command';
import { MusicSettingsCollection } from './musicSettings';

export abstract class MusicCommand extends Command {
    musicSettings: MusicSettingsCollection = new Collection();

    init(client: Cadence) {
        // Create a reference to the client music settings
        this.musicSettings = client.musicSettings;
    }
}
